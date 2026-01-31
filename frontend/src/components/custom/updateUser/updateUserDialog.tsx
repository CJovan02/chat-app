import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const UpdateUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary'>Update Profile</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your profile information here. Click "Click" to save changes.
          </DialogDescription>
        </DialogHeader>

        

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
