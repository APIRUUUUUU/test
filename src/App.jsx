import { useState } from 'react';
import Sidebar from './components/Sidebar';
import LoginScreen from './pages/LoginScreen';
import DashboardScreen from './pages/DashboardScreen';
import CampaignDetailScreen from './pages/CampaignDetailScreen';
import VtuberDetailScreen from './pages/VtuberDetailScreen';
import CampaignCreateScreen from './pages/CampaignCreateScreen';
import VtuberManageScreen from './pages/VtuberManageScreen';
import AdminScreen from './pages/AdminScreen';

export default function App() {
  const [company, setCompany] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [nav, setNav] = useState('dashboard');
  const [selCampaign, setSelCampaign] = useState(null);
  const [selVtuber, setSelVtuber] = useState(null);

  // 管理者画面
  if (isAdmin) {
    return <AdminScreen onLogout={() => setIsAdmin(false)} />;
  }

  // 未ログイン
  if (!company) {
    return (
      <LoginScreen
        onLogin={setCompany}
        onAdminLogin={() => setIsAdmin(true)}
      />
    );
  }

  const handleNav = (key) => {
    setNav(key);
    if (key === 'dashboard') {
      setSelCampaign(null);
      setSelVtuber(null);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f9ff' }}>
      <Sidebar
        current={nav}
        onNav={handleNav}
        companyId={company.company_id}
        companyName={company.company_name}
        onLogout={() => { setCompany(null); setNav('dashboard'); }}
      />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {nav === 'dashboard' && (
          <DashboardScreen
            company={company}
            onSelectCampaign={(c) => { setSelCampaign(c); setNav('campaign'); }}
            onCreate={() => setNav('create')}
          />
        )}
        {nav === 'create' && (
          <CampaignCreateScreen
            company={company}
            onCreated={() => setNav('dashboard')}
            onBack={() => setNav('dashboard')}
          />
        )}
        {nav === 'campaign' && selCampaign && (
          <CampaignDetailScreen
            campaign={selCampaign}
            onSelectVtuber={(v) => { setSelVtuber(v); setNav('vtuber'); }}
            onManageVtubers={() => setNav('manage_vtubers')}
            onBack={() => { setSelCampaign(null); setNav('dashboard'); }}
          />
        )}
        {nav === 'manage_vtubers' && selCampaign && (
          <VtuberManageScreen
            campaign={selCampaign}
            onBack={() => setNav('campaign')}
          />
        )}
        {nav === 'vtuber' && selVtuber && (
          <VtuberDetailScreen
            vtuber={selVtuber}
            company={company}
            onBack={() => setNav('campaign')}
          />
        )}
      </main>
    </div>
  );
}
