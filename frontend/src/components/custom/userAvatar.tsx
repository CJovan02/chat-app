import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  classNameAvatar?: string;
  classNameFallback?: string;
};

const AVATAR_BG_CLASSES = [
  'bg-avatar-1',
  'bg-avatar-2',
  'bg-avatar-3',
  'bg-avatar-4',
  'bg-avatar-5',
] as const;

function UserAvatar({ name, classNameAvatar, classNameFallback }: Props) {
  const index = stringToPaletteIndex(name, 5);
  console.log(index);

  return (
    <Avatar
      className={classNameAvatar}
      key={index}>
      <AvatarFallback
        className={cn(
          'text-white',
          classNameFallback,
          AVATAR_BG_CLASSES[index],
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
