/**
 * Panel Dashboard Layout
 * Site tasarımıyla uyumlu modern admin panel
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PanelSidebar from './components/PanelSidebar';
import PanelHeader from './components/PanelHeader';

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/giris');
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background via-background to-background">
      {/* Background Effects - Site ile uyumlu */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-red-400/10 via-rose-500/5 to-transparent rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Sidebar */}
      <PanelSidebar />

      {/* Main Content */}
      <div className="lg:pl-72">
        <PanelHeader user={user} />
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
