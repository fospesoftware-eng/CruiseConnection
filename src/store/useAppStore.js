import { useState, useEffect } from 'react';
import { sounds } from '../utils/sound';
import { hapticFeedback } from '../utils/haptics';

const INITIAL_PROFILE = {
  id: 'user_me_001',
  name: 'Alex Rivera',
  title: 'Product Architect & Designer',
  company: 'Aether Labs',
  bio: 'Building hyper-fluid consumer apps. Currently sailing Deck 7 Lounge 🍸 Let\'s talk AI, design, & startups.',
  phone: '+1 (555) 234-8901',
  email: 'alex.rivera@aetherlabs.io',
  instagram: 'alex.rivera.vibe',
  linkedin: 'alexrivera-tech',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  qrCodeVal: 'https://scanme.app/u/alex-rivera-001',
  locationTag: 'Deck 7 Lounge • Ocean Suite',
  tags: ['Tech Founder', 'Vibe Coder', 'Deck 7 VIP'],
  badge: 'PRO VIP'
};

const INITIAL_CONNECTIONS = [
  {
    id: 'conn_elena',
    name: 'Elena Rostova',
    title: 'Senior Product Designer',
    company: 'Monolith Studio',
    bio: 'Designing next-gen mobile interfaces. Passionate about glassmorphism, micro-animations, and espresso.',
    phone: '+1 (555) 891-2345',
    email: 'elena@monolith.design',
    instagram: 'elena.rostova',
    linkedin: 'elenarostova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    qrCodeVal: 'https://scanme.app/u/elena-rostova',
    locationTag: 'Deck 4 Promenade',
    tags: ['Product Designer', 'Coffee Lover', 'Deck 4'],
    badge: 'Connected',
    metDate: 'Just now',
    lastMessage: 'Let\'s catch up at the sunset lounge later!',
    unreadCount: 1,
    messages: [
      { id: 'm1', sender: 'conn_elena', text: 'Hey Alex! Fantastic meeting you near the deck 4 bar.', timestamp: '10:42 AM' },
      { id: 'm2', sender: 'user_me_001', text: 'Awesome connecting! Loved your perspective on design systems.', timestamp: '10:44 AM' },
      { id: 'm3', sender: 'conn_elena', text: 'Let\'s catch up at the sunset lounge later!', timestamp: '10:45 AM' }
    ]
  },
  {
    id: 'conn_marcus',
    name: 'Marcus Vance',
    title: 'AI Engineering Lead',
    company: 'HyperScale AI',
    bio: 'LLM infrastructure, vector databases, and real-time audio models. Building in public.',
    phone: '+1 (555) 432-9876',
    email: 'marcus@hyperscale.ai',
    instagram: 'marcus.vance.ai',
    linkedin: 'marcusvance-ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    qrCodeVal: 'https://scanme.app/u/marcus-vance',
    locationTag: 'Sky Lounge Deck 12',
    tags: ['AI Engineer', 'Founder', 'Sky Lounge'],
    badge: 'Connected',
    metDate: '2 hours ago',
    lastMessage: 'Sent you the Github repo link.',
    unreadCount: 0,
    messages: [
      { id: 'm1', sender: 'user_me_001', text: 'Hey Marcus, drop your AI framework repo when free!', timestamp: '08:30 AM' },
      { id: 'm2', sender: 'conn_marcus', text: 'Sent you the Github repo link.', timestamp: '08:32 AM' }
    ]
  },
  {
    id: 'conn_sophia',
    name: 'Sophia Chen',
    title: 'Creative Director',
    company: 'Aura Brand Lab',
    bio: 'Brand identity & high-end editorial visuals. Always carrying a Leica M6.',
    phone: '+1 (555) 765-4321',
    email: 'sophia@aurabrand.co',
    instagram: 'sophiachen_art',
    linkedin: 'sophiachen-design',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    qrCodeVal: 'https://scanme.app/u/sophia-chen',
    locationTag: 'Poolside Cabana 3',
    tags: ['Creative Director', 'Photography', 'Poolside'],
    badge: 'Connected',
    metDate: 'Yesterday',
    lastMessage: 'Check out these photo samples from the upper deck!',
    unreadCount: 0,
    messages: [
      { id: 'm1', sender: 'conn_sophia', text: 'Check out these photo samples from the upper deck!', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 'conn_mateo',
    name: 'Mateo Silva',
    title: 'Venture Partner',
    company: 'Apex Horizon Ventures',
    bio: 'Early-stage tech investments in AI, Web3, & Consumer Hardware. Bay Area & Nomad.',
    phone: '+1 (555) 987-1234',
    email: 'mateo@apexhorizon.vc',
    instagram: 'mateosilva_vc',
    linkedin: 'mateosilva-vc',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    qrCodeVal: 'https://scanme.app/u/mateo-silva',
    locationTag: 'VIP Executive Lounge',
    tags: ['Venture Capital', 'Investor', 'VIP Deck'],
    badge: 'Connected',
    metDate: 'Yesterday',
    lastMessage: 'Great pitch overview. Let\'s schedule a call next week.',
    unreadCount: 0,
    messages: [
      { id: 'm1', sender: 'conn_mateo', text: 'Great pitch overview. Let\'s schedule a call next week.', timestamp: 'Yesterday' }
    ]
  }
];

export function useAppStore() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('scanme_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [privacyMode, setPrivacyMode] = useState(() => {
    return localStorage.getItem('scanme_privacy_mode') || 'private';
  });

  const [isKidsMode, setIsKidsMode] = useState(() => {
    return localStorage.getItem('scanme_kids_mode') === 'true';
  });

  const [parentalPin, setParentalPin] = useState(() => {
    return localStorage.getItem('scanme_parental_pin') || '1234';
  });

  const [connections, setConnections] = useState(() => {
    const saved = localStorage.getItem('scanme_user_connections');
    return saved ? JSON.parse(saved) : INITIAL_CONNECTIONS;
  });

  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'scan' | 'connections' | 'chat' | 'settings'
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHandshakeOpen, setIsHandshakeOpen] = useState(false);
  const [scannedUser, setScannedUser] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem('scanme_user_profile', JSON.stringify(profile));
  }, [profile]);

  // Sync privacy mode
  useEffect(() => {
    localStorage.setItem('scanme_privacy_mode', privacyMode);
  }, [privacyMode]);

  // Sync kids mode
  useEffect(() => {
    localStorage.setItem('scanme_kids_mode', isKidsMode ? 'true' : 'false');
  }, [isKidsMode]);

  // Sync parental pin
  useEffect(() => {
    localStorage.setItem('scanme_parental_pin', parentalPin);
  }, [parentalPin]);

  const handleToggleKidsMode = (enable, inputPin, newPin = null) => {
    if (enable) {
      const pinToSet = newPin || '1234';
      setParentalPin(pinToSet);
      setIsKidsMode(true);
      setPrivacyMode('private'); // Enforce strict privacy
      showToast('Kids Mode / Parental Control Enabled 🛡️', 'success');
      return true;
    } else {
      // Disable requires matching PIN
      if (inputPin === parentalPin) {
        setIsKidsMode(false);
        showToast('Kids Mode Disabled', 'info');
        return true;
      } else {
        showToast('Incorrect Parental PIN!', 'error');
        return false;
      }
    }
  };

  const handleTogglePrivacyMode = (newMode) => {
    setPrivacyMode(newMode);
    if (newMode === 'private') {
      showToast('Switched to Private Mode (Chat Only)', 'info');
    } else {
      showToast('Switched to Full Share Mode (Phone & Social Shared)', 'success');
    }
  };

  // Sync connections to localStorage
  useEffect(() => {
    localStorage.setItem('scanme_user_connections', JSON.stringify(connections));
  }, [connections]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateProfile = (updatedFields) => {
    setProfile(prev => ({ ...prev, ...updatedFields }));
    hapticFeedback.medium();
    sounds.playPop();
    showToast('Profile updated successfully!', 'success');
  };

  // Called when user scans a QR code (real or simulated)
  const handleScanSuccess = (scannedPayload) => {
    sounds.playScanBeep();
    hapticFeedback.success();

    // Check if payload matches existing demo user or generate dynamic scanned contact
    let matchedUser = connections.find(c => c.qrCodeVal === scannedPayload || scannedPayload.includes(c.name.toLowerCase().replace(' ', '-')));
    
    if (!matchedUser) {
      // Dynamic profile generated from scanned payload
      matchedUser = {
        id: `scanned_${Date.now()}`,
        name: scannedPayload.includes('alexandra') ? 'Alexandra Thorne' : 'Jordan Blake',
        title: 'Strategy & Ops Lead',
        company: 'Venture Forge',
        bio: 'Connecting people and ideas across oceans. Excited to collaborate!',
        phone: '+1 (555) 678-9012',
        email: 'jordan@ventureforge.co',
        instagram: 'jordan.blake.live',
        linkedin: 'jordanblake-ops',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        qrCodeVal: scannedPayload,
        locationTag: 'Just Scanned • Deck Lounge',
        tags: ['New Contact', 'Deck Lounge'],
        badge: 'New Contact',
        metDate: 'Just now',
        lastMessage: 'Scan complete! Ready to exchange info.',
        unreadCount: 0,
        messages: []
      };
    }

    setScannedUser(matchedUser);
    setIsHandshakeOpen(true);
  };

  const handleConfirmConnection = (userToConnect, shareLevel = 'all') => {
    sounds.playSuccessChime();
    hapticFeedback.success();

    setConnections(prev => {
      const exists = prev.some(c => c.id === userToConnect.id);
      if (exists) {
        return prev.map(c => c.id === userToConnect.id ? { ...c, badge: 'Connected' } : c);
      }
      return [userToConnect, ...prev];
    });

    setIsHandshakeOpen(false);
    showToast(`Connected with ${userToConnect.name}! 🎉`, 'success');
    
    // Automatically switch to chat drawer or connections list
    setActiveChatUser(userToConnect);
    setActiveTab('chat');
  };

  const handleSendMessage = (targetUserId, text) => {
    if (!text.trim()) return;

    sounds.playPop();
    hapticFeedback.light();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = { id: `m_${Date.now()}`, sender: profile.id, text, timestamp };

    setConnections(prev => prev.map(conn => {
      if (conn.id === targetUserId) {
        const updatedMsgs = [...(conn.messages || []), newMessage];
        return {
          ...conn,
          messages: updatedMsgs,
          lastMessage: text
        };
      }
      return conn;
    }));

    // Auto-reply simulation from connection for instant preview magic
    setTimeout(() => {
      const replies = [
        "That sounds awesome! Let's talk more over coffee.",
        "Got it! Thanks for sharing.",
        "Loved connecting with you! See you at the deck later.",
        "Appreciate the fast reply! Check out my profile links anytime."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyMsg = {
        id: `m_reply_${Date.now()}`,
        sender: targetUserId,
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      sounds.playPop();
      hapticFeedback.light();

      setConnections(prev => prev.map(conn => {
        if (conn.id === targetUserId) {
          return {
            ...conn,
            messages: [...(conn.messages || []), replyMsg],
            lastMessage: randomReply
          };
        }
        return conn;
      }));
    }, 1200);
  };

  const handleResetDemo = () => {
    localStorage.removeItem('scanme_user_profile');
    localStorage.removeItem('scanme_user_connections');
    setProfile(INITIAL_PROFILE);
    setConnections(INITIAL_CONNECTIONS);
    showToast('Demo data reset to factory defaults', 'info');
  };

  return {
    profile,
    privacyMode,
    isKidsMode,
    parentalPin,
    connections,
    activeTab,
    setActiveTab,
    isProfileModalOpen,
    setIsProfileModalOpen,
    isHandshakeOpen,
    setIsHandshakeOpen,
    scannedUser,
    activeChatUser,
    setActiveChatUser,
    toast,
    showToast,
    handleUpdateProfile,
    handleTogglePrivacyMode,
    handleToggleKidsMode,
    handleScanSuccess,
    handleConfirmConnection,
    handleSendMessage,
    handleResetDemo
  };
}
