/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AdmissionProvider, useAdmission } from './context/AdmissionContext';
import { DemoScenarioBar } from './components/common/DemoScenarioBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { PublicHome } from './components/public/PublicHome';
import { AdminLayout } from './components/admin/AdminLayout';
import { LineageModal } from './components/admin/LineageModal';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activePortal, toastMessage } = useAdmission();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-600 selection:text-white">
      
      {/* Top Demo Scenario & Principles Control Bar */}
      <DemoScenarioBar />

      {/* Main Switcher: Public Portal vs Admin Portal */}
      {activePortal === 'public' ? (
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            <PublicHome />
          </main>
          <Footer />
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <AdminLayout />
        </div>
      )}

      {/* Lineage inspection modal (answers "Vì sao giá trị này ở đây?") */}
      <LineageModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className={`p-4 rounded-xl shadow-xl border flex items-center gap-3 max-w-md ${
            toastMessage.type === 'success' 
              ? 'bg-slate-900 text-white border-emerald-500/50' 
              : toastMessage.type === 'warning'
              ? 'bg-amber-900 text-white border-amber-500/50'
              : 'bg-slate-900 text-white border-sky-500/50'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : toastMessage.type === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-sky-400 shrink-0" />
            )}
            <p className="text-xs leading-relaxed font-medium">
              {toastMessage.text}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AdmissionProvider>
      <AppContent />
    </AdmissionProvider>
  );
}
