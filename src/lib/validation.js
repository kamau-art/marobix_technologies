export const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const PHONE_LOCAL_RE = /^(?:254|\+254|0)[17]\d{8}$/;
export const PHONE_E164_RE = /^\+[1-9]\d{6,14}$/;

export function isValidEmail(value) {
  return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value.trim());
}

export function isValidPhone(value) {
  if (typeof value !== 'string') return false;
  const phone = value.replace(/[\s()-]/g, '');
  return PHONE_LOCAL_RE.test(phone) || PHONE_E164_RE.test(phone);
}

export function isValidName(value) {
  return typeof value === 'string' && value.trim().length >= 2 && value.trim().length <= 100;
}

export function isNonEmpty(value, max = 500) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max;
}

export function isHoneypotFilled(value) {
  return typeof value === 'string' && value.length > 0;
}
