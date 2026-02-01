import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';
import DashboardAside from '@/components/custom/dashboard/dashboardAside';

function DashboardAsideSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'>
          <PanelLeft className='size-5' />
        </Button>
      </SheetTrigger>

      <SheetContent
        side='left'
        className='w-72 p-0'>
        <DashboardAside />
      </SheetContent>
    </Sheet>
  );
}

export default DashboardAsideSheet;
