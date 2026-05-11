import { useState } from 'react';

import Sidebar from './components/Sidebar';
import LoginScreen from './pages/LoginScreen';
import DashboardScreen from './pages/DashboardScreen';
import CampaignDetailScreen from './pages/CampaignDetailScreen';
import VtuberDetailScreen from './pages/VtuberDetailScreen';

export default function App() {
  const [screen, setScreen] = useState('login');   // 'login' | 'app'
  const [nav, setNav] = useState('dashboard');       // 'dashboard' | 'campaign' | 'vtuber'
  const [companyId, setCompanyId] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedVtuber, setSelectedVtuber] = useState(null);

  const handleLogin = (id) => {
    setCompanyId(id);
    setScreen('app');
    setNav('dashboard');
  };

  const handleLogout = () => {
    setScreen('login');
    setNav('dashboard');
    setSelectedCampaign(null);
    setSelectedVtuber(null);
  };

  const handleNav = (key) => {
    // サイドバーのナビゲーション
    setNav('dashboard');
    setSelectedCampaign(null);
    setSelectedVtuber(null);
  };

  const handleSelectCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setNav('campaign');
  };

  const handleSelectVtuber = (vtuber) => {
    setSelectedVtuber(vtuber);
    setNav('vtuber');
  };

  const handleBackToDashboard = () => {
    setNav('dashboard');
  };

  const handleBackToCampaign = () => {
    setNav('campaign');
  };

  // ログイン画面
  if (screen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // アプリ本体
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06060f' }}>
      <Sidebar
        current={nav === 'campaign' || nav === 'vtuber' ? 'dashboard' : nav}
        onNav={handleNav}
        onLogout={handleLogout}
        companyId={companyId}
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {nav === 'dashboard' && (
          <DashboardScreen onSelectCampaign={handleSelectCampaign} />
        )}
        {nav === 'campaign' && selectedCampaign && (
          <CampaignDetailScreen
            campaign={selectedCampaign}
            onSelectVtuber={handleSelectVtuber}
            onBack={handleBackToDashboard}
          />
        )}
        {nav === 'vtuber' && selectedVtuber && (
          <VtuberDetailScreen
            vtuber={selectedVtuber}
            onBack={handleBackToCampaign}
          />
        )}
      </main>
    </div>
  );
}
