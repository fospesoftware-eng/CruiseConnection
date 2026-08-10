// AI Assistant Helpers & Mock Streaming Service for CruiseConnection

export const aiAssistant = {
  // Feature 1: Memory Spark Icebreaker Generator
  generateSparks: async (locationTag, targetUser) => {
    // Simulated fast API call (<300ms)
    await new Promise(r => setTimeout(r, 280));
    
    const location = locationTag || 'the deck lounge';
    const firstName = targetUser?.name?.split(' ')[0] || 'there';

    return [
      `Hey ${firstName}! Great meeting you at ${location} earlier 🥂`,
      `Enjoyed chatting about ${targetUser?.title || 'startups'}! Let's catch up again.`,
      `Are you attending the sunset lounge event later today?`
    ];
  },

  // Feature 2: Business Card / Badge OCR Simulator
  parseCardImage: async (imageFileOrUrl) => {
    await new Promise(r => setTimeout(r, 650));

    return {
      name: "Victoria Sterling",
      title: "VP of Product",
      company: "Horizon Marine",
      email: "v.sterling@horizonmarine.io",
      phone: "+1 (555) 345-6789",
      instagram: "vsterling_product",
      linkedin: "victoriasterling-product",
      bio: "Scanned via CruiseConnection AI Badge Reader • Met at Deck 7 VIP"
    };
  },

  // Feature 3: Connection Recap Generator
  generateRecap: (locationTag, dateStr) => {
    return `Met at ${locationTag || 'Deck 7 Lounge'} on ${dateStr || 'today'}. Exchanged profile info & social links.`;
  },

  // Feature 4: Privacy Shield Classifier
  checkPrivacyRisk: (text) => {
    const cardPattern = /\b(?:\d[ -]*?){13,16}\b/;
    const ssnPattern = /\b\d{3}-\d{2}-\d{4}\b/;

    if (cardPattern.test(text) || ssnPattern.test(text)) {
      return {
        flagged: true,
        reason: "Possible credit card or SSN pattern detected. Use secure contact exchange instead."
      };
    }
    return { flagged: false };
  },

  // Feature 5: Audio Voice Note Transcription Simulator
  transcribeVoiceNote: async (audioBlob) => {
    await new Promise(r => setTimeout(r, 450));
    return "Hey Alex! Great meeting you near the pool deck earlier. Let's catch up later at the lounge!";
  }
};
