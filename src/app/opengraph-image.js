import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const alt = 'Marobix Technologies — Web Development, IT Solutions & POS Systems';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0b3d91',
          padding: '64px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-120px',
            top: '-120px',
            width: '480px',
            height: '480px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255,255,255,0.06)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-140px',
            bottom: '-140px',
            width: '480px',
            height: '480px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255,255,255,0.06)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#f5a623',
              fontSize: '32px',
              fontWeight: 800,
              color: '#1e2530',
            }}
          >
            M
          </div>
          <div style={{ display: 'flex', fontSize: '34px', fontWeight: 800, color: '#ffffff' }}>
            {siteConfig.name}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '60px',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#ffffff',
              maxWidth: '880px',
            }}
          >
            Web Development, IT Solutions &amp; POS Systems
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '24px',
              fontSize: '26px',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Custom websites, ecommerce, M-Pesa integrations, and AI tools — built in Kenya for the world.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              width: '12px',
              height: '12px',
              borderRadius: '9999px',
              backgroundColor: '#f5a623',
            }}
          />
          <div style={{ display: 'flex', fontSize: '20px', color: '#ffffff' }}>
            {siteConfig.url} · {siteConfig.contact.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
