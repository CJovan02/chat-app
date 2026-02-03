import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/custom/dashboard/sidebar/dashboardSidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className='w-screen h-screen' defaultOpen={true}>
      <DashboardSidebar />
      <main className='w-full h-full flex flex-col'>
        <SidebarTrigger />
          {children}
      </main>
    </SidebarProvider>
  );
}
