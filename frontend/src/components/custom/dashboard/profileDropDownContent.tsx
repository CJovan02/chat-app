import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  CreditCardIcon,
  LogOutIcon,
  Moon,
  SettingsIcon,
  Sun,
  UserIcon,
} from 'lucide-react';
import UpdateUserDialog from '@/components/custom/updateUser/updateUserDialog';
import { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { useSidebar } from '@/components/ui/sidebar';

function ProfileDropDownContent() {
  const { isMobile } = useSidebar();

  const { theme, setTheme } = useThemeStore();
  const { set } = useUserStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    set(null);
    navigate('/login');
  };

  return (
    <>
      <DropdownMenuContent
        align='start'
        side={isMobile ? 'bottom' : 'right'}
        sideOffset={4}>
        <DropdownMenuItem
          onSelect={() => {
            setProfileOpen(true);
          }}>
          <UserIcon className='size-4' />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()} // keeps menu open
          className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2'>
            {theme === 'dark' ? (
              <Moon className='size-4' />
            ) : (
              <Sun className='size-4' />
            )}
            <span>Theme</span>
          </div>

          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant='destructive'
          onSelect={logout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>

      <UpdateUserDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        close={() => setProfileOpen(false)}
      />
    </>
  );
}

export default ProfileDropDownContent;
