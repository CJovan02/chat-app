import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  classNameAvatar?: string;
  classNameFallback?: string;
};

function UserAvatar({ name, classNameAvatar, classNameFallback }: Props) {
  const index = stringToPaletteIndex(name, 5);

  return (
    <Avatar
      className={classNameAvatar}
      key={index}>
      <AvatarFallback
        className={cn(
          'text-white',
          `bg-avatar-${index} ${classNameFallback}`,
        )}>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;

export function stringToPaletteIndex(str: string, paletteSize = 5) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // force 32bit
  }

  return Math.abs(hash) % paletteSize;
}
