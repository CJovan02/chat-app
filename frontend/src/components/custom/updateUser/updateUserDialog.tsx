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
import { ReactNode } from 'react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/custom/textInput';

export const updateUserSchema = z.object({
  DisplayName: z.string().min(3, 'Display name must be at least 3 characters'),
  Age: z
    .number()
    .min(1, 'Age must be larger than 1')
    .max(100, "Age can't exceed 100"),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

type props = {
  trigger: ReactNode;
};

const UpdateUserDialog = ({ trigger }: props) => {
  const formMethods = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  const onSubmit = async (data: UpdateUserFormValues) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your profile information here. Click "Save" to save changes.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...formMethods}>
          <form
            id='update-user-form'
            className='space-y-4'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              <TextInput
                id='DisplayName'
                label='Display Name'
                placeholder='Josh'
                required
              />
              <TextInput
                id='Age'
                label='Age'
                type='number'
                placeholder='25'
                required
              />
            </div>
          </form>
        </FormProvider>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            type='submit'
            form='update-user-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
