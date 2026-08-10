// ============================================================
// Skin & Beyond by Dr. Nour — Clinic Configuration
// PLACEHOLDER fields are marked clearly — Dr. Nour's team
// should replace these before the site goes live.
// ============================================================

export const clinicInfo = {
  brandName: 'Skin & Beyond by Dr. Nour',
  doctorName: 'Dr. Nour',
  credentials: 'German Board-Certified Dermatologist',

  // -- PLACEHOLDER: replace with real clinic contact details --
  phone: '+971 4 000 0000', // PLACEHOLDER
  phoneTel: '+97140000000', // PLACEHOLDER (tel: link, digits only + country code)
  whatsapp: '+971 50 000 0000', // PLACEHOLDER
  whatsappLink: 'https://wa.me/97150000000', // PLACEHOLDER
  email: 'hello@skinandbeyond.ae', // PLACEHOLDER
  address: {
    en: 'PLACEHOLDER ADDRESS — e.g. Jumeirah, Dubai, UAE',
    ar: 'عنوان مؤقت — مثال: جميرا، دبي، الإمارات العربية المتحدة',
  },
  mapEmbedUrl: '', // PLACEHOLDER — paste Google Maps embed URL when available
  // -------------------------------------------------------------

  hours: {
    en: 'Sun – Thu, 9:00 AM – 6:00 PM',
    ar: 'الأحد – الخميس، 9:00 صباحاً – 6:00 مساءً',
  },

  social: {
    instagram: 'https://www.instagram.com/dr.nour_skinandbeyond/',
    instagramHandle: '@dr.nour_skinandbeyond',
    // PLACEHOLDER — add if/when available:
    facebook: '',
    tiktok: '',
    linkedin: '',
  },

  // n8n chat webhook — unique to this client, do not reuse elsewhere
  chatWebhookUrl: 'https://n8n.thefaisalakbar.xyz/webhook/e25fe53b-83fd-4256-a9f0-84cc9664d99a/chat',

  images: {
    headshot: '/dr-nour-headshot.jpg', // real photo, supplied by client
  },
}

export default clinicInfo
