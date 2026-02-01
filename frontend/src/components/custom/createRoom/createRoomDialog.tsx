import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  close: () => void;
};

function CreateRoomDialog({ close, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a private room with a friend.</DialogTitle>
          <DialogDescription>
            You can create a room with a friend using their Username.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}