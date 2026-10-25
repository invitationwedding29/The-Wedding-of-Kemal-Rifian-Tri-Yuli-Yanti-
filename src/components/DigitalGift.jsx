import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { CornerOrnaments, SideOrnaments, TwinRingsDivider } from './Decorations';

/**
 * TANDA KASIH / WEDDING GIFT (LATAR KREM #F7F1EA):
 * - Rekening Bank Mandiri & Bank BRI a.n Kemal Rifian
 * - Tombol salin nomor rekening satu kali klik dengan feedback
 * - Desain kartu debit kerajaan eksklusif dengan aksen emas
 * - Ornamen sudut marun (opacity 0.30)
 * - Ornamen sisi kiri & kanan (≥1000px)
 * - Pembatas cincin kembar emas
 */
export function DigitalGift({ showToast }) {
  const { gifts, features } = weddingConfig;
  const [copiedBank, setCopiedBank] = useState(null);

  if (!features.showGift || !gifts || gifts.length === 0) {
    return null;
  }

  const handleCopy = (rawNumber, bankName) => {
    // Pastikan angka bersih dari spasi saat disalin ke clipboard
    const cleanNumber = String(rawNumber).replace(/\s+/g, '');

    const onCopySuccess = () => {
      setCopiedBank(bankName);
      showToast?.(`Nomor rekening ${bankName} berhasil disalin!`);
      setTimeout(() => setCopiedBank(null), 2500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanNumber)
        .then(onCopySuccess)
        .catch(() => fallbackCopy(cleanNumber, bankName, onCopySuccess));
    } else {
      fallbackCopy(cleanNumber, bankName, onCopySuccess);
    }
  };

  const fallbackCopy = (text, bankName, onSuccess) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        onSuccess();
      } else {
        showToast?.('Gagal menyalin nomor rekening');
      }
    } catch {
      showToast?.('Gagal menyalin nomor rekening');
    }
  };

  return (
    <section id="gift" className="wedding-section gift-darkcream-section">
      {/* Ornamen Sudut Marun di Latar Krem */}
      <CornerOrnaments theme="maroon-on-cream" />

      {/* Ornamen Sisi Kiri & Kanan (≥1000px) */}
      <SideOrnaments theme="maroon-on-cream" />

      <div className="section-content-container">
        {/* 1. Label Uppercase Letter-Spacing .3em */}
        <p className="reveal-item section-label-maroon">
          TANDA KASIH
        </p>

        {/* 2. Judul Script Pinyon */}
        <h2 className="reveal-item section-script-title">
          Wedding Gift
        </h2>

        {/* 3. Pembatas Cincin Kembar Emas */}
        <div className="reveal-item section-rings-wrap">
          <TwinRingsDivider color="#C9A27A" />
        </div>

        {/* 4. Kalimat Pengantar */}
        <p className="reveal-item gift-intro-text">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberikan kado secara <em>cashless</em> melalui rekening di bawah ini:
        </p>

        {/* 5. Kartu Rekening */}
        <div className="reveal-item gift-cards-grid">
          {gifts.map((item, idx) => (
            <div key={idx} className="gift-card-royal">
              {/* Header Kartu: Badge Bank & Simbol Chip Emas */}
              <div className="gift-card-header">
                <span className="gift-bank-badge">{item.bank}</span>
                <div className="gift-card-chip" aria-hidden="true" title="Smart Chip">
                  <svg viewBox="0 0 36 28" width="36" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="28" rx="4" fill="#C9A27A" fillOpacity="0.22" stroke="#C9A27A" strokeWidth="1.2" />
                    <line x1="12" y1="0" x2="12" y2="28" stroke="#C9A27A" strokeWidth="0.8" />
                    <line x1="24" y1="0" x2="24" y2="28" stroke="#C9A27A" strokeWidth="0.8" />
                    <line x1="0" y1="14" x2="36" y2="14" stroke="#C9A27A" strokeWidth="0.8" />
                    <circle cx="18" cy="14" r="5" fill="#C9A27A" fillOpacity="0.35" stroke="#C9A27A" strokeWidth="0.8" />
                  </svg>
                </div>
              </div>

              {/* Nomor Rekening */}
              <div className="gift-number-group">
                <span className="gift-number-label">NOMOR REKENING</span>
                <div className="gift-number-val" aria-label={`Nomor rekening: ${item.accountNumber}`}>
                  {item.displayNumber || item.accountNumber}
                </div>
              </div>

              {/* Atas Nama Pemilik Rekening */}
              <div className="gift-holder-group">
                <span className="gift-holder-label">ATAS NAMA</span>
                <div className="gift-holder-name">{item.holder}</div>
              </div>

              {/* Tombol Salin */}
              <button
                type="button"
                onClick={() => handleCopy(item.accountNumber, item.bank)}
                className={`btn-copy-account ${copiedBank === item.bank ? 'is-copied' : ''}`}
                aria-label={`Salin nomor rekening ${item.bank}`}
              >
                {copiedBank === item.bank ? (
                  <>
                    <Check size={16} className="btn-copy-icon" />
                    <span>NOMOR TERSALIN</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} className="btn-copy-icon" />
                    <span>SALIN NO. REKENING</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* 6. Hiasan Pembatas Garis Bunga Halus */}
        <div className="reveal-item gift-bottom-flower" aria-hidden="true">
          <svg viewBox="0 0 100 24" width="70" height="18" fill="none" stroke="#C9A27A">
            <path d="M0 12 H36 M64 12 H100" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
            <circle cx="50" cy="12" r="3.5" fill="#C9A27A" />
            <circle cx="43" cy="12" r="2" fill="#C9A27A" opacity="0.7" />
            <circle cx="57" cy="12" r="2" fill="#C9A27A" opacity="0.7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
