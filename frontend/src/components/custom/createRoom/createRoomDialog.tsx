import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useCreateRoomLogic from '@/hooks/useCreateRoomLogic';
import { FormProvider } from 'react-hook-form';
import TextInput from '@/components/custom/textInput';
import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';
import { showError } from '@/toast';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  close: () => void;
};

function CreateRoomDialog({ close, open, onOpenChange }: Props) {
  const { form, createRoom, isLoading, isError, isSuccess, errorMessage } =
    useCreateRoomLogic();

  useEffect(() => {
    if (isError) showError(errorMessage);
  }, [isError]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a private room with friend.</DialogTitle>
          <DialogDescription>
            You can create a room with friend using their Username.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            id='create-room-form'
            className=''
            onSubmit={form.handleSubmit(createRoom)}>
            <div className='flex flex-col gap-4'>
              <FieldGroup>
                <TextInput
                  id='username'
                  label='Username'
                  type='text'
                  placeholder='JohnWick007'
                  required
                />
              </FieldGroup>
            </div>
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>

          <Button
            type='submit'
            form='create-room-form'
            className='w-32'
            disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Create Room'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRoomDialog;
