import React, { useState } from 'react';
import { useAppStore } from './store/useAppStore';
import Navigation from './components/Navigation';
import ProfileCard from './components/ProfileCard';
import ProfileEditorModal from './components/ProfileEditorModal';
import QrScannerModal from './components/QrScannerModal';
import HandshakeModal from './components/HandshakeModal';
import ConnectionList from './components/ConnectionList';
import ChatDrawer from './components/ChatDrawer';
import SettingsView from './components/SettingsView';
import Toast from './components/Toast';

export default function App() {
  const {
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
  } = useAppStore();

  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification Container */}
      <Toast toast={toast} />

      {/* Navigation Top & Mobile Bottom Bars */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        connectionsCount={connections.length}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 px-4 py-4 max-w-md mx-auto w-full">
        {activeTab === 'card' && (
          <ProfileCard
            profile={profile}
            privacyMode={privacyMode}
            onTogglePrivacyMode={handleTogglePrivacyMode}
            onEditProfile={() => setIsProfileModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'connections' && (
          <ConnectionList
            connections={connections}
            onOpenChat={(user) => {
              setActiveChatUser(user);
            }}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'chat' && (
          <ConnectionList
            connections={connections}
            onOpenChat={(user) => {
              setActiveChatUser(user);
            }}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            profile={profile}
            connectionsCount={connections.length}
            isKidsMode={isKidsMode}
            onToggleKidsMode={handleToggleKidsMode}
            onResetDemo={handleResetDemo}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Profile Editor Modal */}
      <ProfileEditorModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={handleUpdateProfile}
      />

      {/* Camera & Quick Demo QR Scanner Modal */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* Instant Contact Handshake Modal */}
      <HandshakeModal
        isOpen={isHandshakeOpen}
        onClose={() => setIsHandshakeOpen(false)}
        scannedUser={scannedUser}
        onConfirmConnect={handleConfirmConnection}
      />

      {/* 1-on-1 Realtime Chat Drawer */}
      <ChatDrawer
        isOpen={Boolean(activeChatUser)}
        onClose={() => setActiveChatUser(null)}
        activeUser={activeChatUser}
        currentUserId={profile.id}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
