import { createOrder, updateOrderStatus as updateOrderInDb } from './db';
import { getPricing } from './data';
import { isValidPhone } from './validation';

const CURRENCY = 'KES';

export function generateOrderId() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MBX-${stamp}-${rand}`;
}

export async function resolvePlan(planId) {
  if (!planId) return null;
  const { plans } = await getPricing();
  return plans.find((p) => p.id === planId) || null;
}

export function assertPayablePlan(plan) {
  if (!plan) return { ok: false, error: 'Plan not found.' };
  if (plan.price === null || plan.price === undefined) {
    return { ok: false, error: 'This plan requires a custom quote. Please contact us instead.' };
  }
  return { ok: true };
}

export function normalizeMpesaPhone(phone) {
  let digits = String(phone || '').replace(/[^\d]/g, '');
  if (digits.startsWith('0')) digits = `254${digits.slice(1)}`;
  else if (digits.startsWith('254')) digits = digits;
  else if (digits.startsWith('1') || digits.startsWith('7')) digits = `254${digits}`;
  if (/^254[17]\d{8}$/.test(digits)) return digits;
  return null;
}

export function getMpesaConfig() {
  const env = process.env.MPESA_ENV === 'production' ? 'production' : 'sandbox';
  const baseUrl =
    env === 'production'
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke';
  return {
    env,
    baseUrl,
    configured:
      Boolean(process.env.MPESA_CONSUMER_KEY) &&
      Boolean(process.env.MPESA_CONSUMER_SECRET) &&
      Boolean(process.env.MPESA_SHORTCODE) &&
      Boolean(process.env.MPESA_PASSKEY) &&
      Boolean(process.env.MPESA_CALLBACK_URL),
    consumerKey: process.env.MPESA_CONSUMER_KEY || '',
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
    shortcode: process.env.MPESA_SHORTCODE || '',
    passkey: process.env.MPESA_PASSKEY || '',
    callbackUrl: process.env.MPESA_CALLBACK_URL || '',
  };
}

export async function getMpesaToken() {
  const cfg = getMpesaConfig();
  if (!cfg.consumerKey || !cfg.consumerSecret) {
    throw new Error('M-Pesa is not configured.');
  }
  const res = await fetch(
    `${cfg.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${cfg.consumerKey}:${cfg.consumerSecret}`
        ).toString('base64')}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error(`M-Pesa auth failed (${res.status}).`);
  }
  const data = await res.json();
  if (!data.access_token) {
    throw new Error('M-Pesa auth failed: no access token.');
  }
  return data.access_token;
}

function mpesaTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
}

export async function initiateMpesaStkPush({ amount, phone, orderId, planName }) {
  const cfg = getMpesaConfig();
  if (!cfg.configured) {
    throw new Error('M-Pesa is not configured. Please contact us to complete your order.');
  }
  const partyA = normalizeMpesaPhone(phone);
  if (!partyA) {
    throw new Error('Please enter a valid M-Pesa phone number (07XXXXXXXX or 2547XXXXXXXX).');
  }
  const token = await getMpesaToken();
  const timestamp = mpesaTimestamp();
  const password = Buffer.from(
    `${cfg.shortcode}${cfg.passkey}${timestamp}`
  ).toString('base64');
  const accountRef = orderId.replace(/[^A-Z0-9]/gi, '').slice(0, 12).toUpperCase();

  const res = await fetch(`${cfg.baseUrl}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      BusinessShortCode: cfg.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: String(Math.round(amount)),
      PartyA: partyA,
      PartyB: cfg.shortcode,
      PhoneNumber: partyA,
      CallBackURL: cfg.callbackUrl,
      AccountReference: accountRef,
      TransactionDesc: `Marobix ${planName}`,
    }),
    cache: 'no-store',
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ResponseCode !== '0') {
    throw new Error(data.errorMessage || 'M-Pesa request failed. Please try again.');
  }
  return {
    checkoutRequestId: data.CheckoutRequestID,
    merchantRequestId: data.MerchantRequestID,
  };
}

export async function queryMpesaStatus(checkoutRequestId) {
  const cfg = getMpesaConfig();
  if (!cfg.configured || !checkoutRequestId) return null;
  const token = await getMpesaToken();
  const timestamp = mpesaTimestamp();
  const password = Buffer.from(
    `${cfg.shortcode}${cfg.passkey}${timestamp}`
  ).toString('base64');
  const res = await fetch(`${cfg.baseUrl}/mpesa/stkpushquery/v1/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      BusinessShortCode: cfg.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }),
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  const stk = data?.Body?.stkCallback;
  if (!stk) return null;
  const success = Number(stk.ResultCode) === 0;
  let receipt = '';
  for (const item of stk.CallbackMetadata?.Item || []) {
    if (item.Name === 'MpesaReceiptNumber') receipt = item.Value || '';
  }
  return {
    success,
    resultCode: stk.ResultCode,
    resultDesc: stk.ResultDesc,
    receipt,
  };
}

export async function getPaypalConfig() {
  const env = process.env.PAYPAL_ENV === 'production' ? 'production' : 'sandbox';
  return {
    env,
    configured:
      Boolean(process.env.PAYPAL_CLIENT_ID) && Boolean(process.env.PAYPAL_CLIENT_SECRET),
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    baseUrl: env === 'production' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com',
  };
}

export async function getPaypalToken() {
  const cfg = getPaypalConfig();
  if (!cfg.configured) {
    throw new Error('PayPal is not configured.');
  }
  const res = await fetch(`${cfg.baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${cfg.clientId}:${cfg.clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error('PayPal auth failed.');
  }
  return { token: data.access_token, config: cfg };
}

export async function createPaypalOrder({ amount, planName, orderId, returnUrl, cancelUrl }) {
  const { token } = await getPaypalToken();
  const res = await fetch(`${getPaypalConfig().baseUrl}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderId,
          description: `Marobix ${planName} plan`,
          amount: { currency_code: CURRENCY, value: String(amount) },
        },
      ],
      application_context: {
        brand_name: 'Marobix Technologies',
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    }),
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'PayPal order creation failed.');
  }
  const approve = (data.links || []).find((l) => l.rel === 'approve');
  if (!approve) {
    throw new Error('PayPal did not return an approval link.');
  }
  return { paypalOrderId: data.id, approvalUrl: approve.href };
}

export async function capturePaypalOrder(paypalOrderId) {
  const { token } = await getPaypalToken();
  const res = await fetch(
    `${getPaypalConfig().baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.status !== 'COMPLETED') {
    return { ok: false, error: data.message || 'Could not capture PayPal payment.' };
  }
  const unit = (data.purchase_units || [])[0] || {};
  return {
    ok: true,
    orderId: unit.reference_id,
    paypalOrderId: data.id,
    amount: unit.payments?.captures?.[0]?.amount?.value || null,
  };
}

export async function createOrderDoc({
  orderId,
  planId,
  planName,
  amount,
  method,
  status,
  paymentRef,
  customer,
}) {
  return createOrder({ orderId, planId, planName, amount, method, status, paymentRef, customer });
}

export async function updateOrderStatus(orderId, { status, paymentRef }) {
  return updateOrderInDb(orderId, { status, paymentRef });
}

export function validateCustomer(payload) {
  const fullName = typeof payload?.fullName === 'string' ? payload.fullName.trim() : '';
  const email = typeof payload?.email === 'string' ? payload.email.trim() : '';
  const phone = typeof payload?.phone === 'string' ? payload.phone.trim() : '';
  const company = typeof payload?.company === 'string' ? payload.company.trim() : '';
  const billingAddress =
    typeof payload?.billingAddress === 'string' ? payload.billingAddress.trim() : '';
  const notes = typeof payload?.notes === 'string' ? payload.notes.trim() : '';

  if (fullName.length < 2) return { ok: false, error: 'Please enter your full name.' };
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (phone && !isValidPhone(phone)) {
    return { ok: false, error: 'Please enter a valid phone number.' };
  }
  if (notes.length > 500) {
    return { ok: false, error: 'Order notes must be 500 characters or fewer.' };
  }
  return {
    ok: true,
    customer: { fullName, email, phone, company, billingAddress, notes },
  };
}

export function orderBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}
