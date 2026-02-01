import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/custom/textInput';
import { useUserStore } from '@/store/userStore';
import { usePatchUserUserId } from '@/api/generated/user/user';
import { showError, showSuccess } from '@/toast';
import type { PatchUserUserIdParams } from '@/api/generated/model';
import { toast } from 'react-toastify';
import error = toast.error;
import { Spinner } from '@/components/ui/spinner';
import { useEffect } from 'react';

export const updateUserSchema = z.object({
  DisplayName: z
    .string()
    .min(3, 'Display name must be at least 3 characters')
    .optional()
    .nullable(),
  Age: z
    .number()
    .min(1, 'Age must be larger than 1')
    .max(100, "Age can't exceed 100")
    .optional()
    .nullable(),
});

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  close: () => void;
};

const UpdateUserDialog = ({ open, onOpenChange, close }: Props) => {
  const { user, set: setUser } = useUserStore();
  const formMethods = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      DisplayName: user.displayName,
      Age: user.age,
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset: resetForm,
  } = formMethods;
  const { mutateAsync, isPending, isError, reset } = usePatchUserUserId();

  useEffect(() => {
    if (open) {
      resetForm({
        DisplayName: user.displayName,
        Age: user.age,
      });
    }
  }, [open, user, resetForm]);

  const onSubmit = async (data: UpdateUserFormValues) => {
    if (
      (data.Age === null || data.Age === undefined) &&
      (data.DisplayName === null || data.DisplayName === undefined)
    ) {
      showError(
        'You need to enter at least one field in order to change your profile data',
      );
      return;
    }

    const params: PatchUserUserIdParams = {
      DisplayName: data.DisplayName,
      Age: data.Age,
    };
    try {
      const response = await mutateAsync({ userId: user.id, params: params });
      if (response.status === 200) {
        showSuccess('Successfully updated your profile info.');
        let newUser = user;

        if (data.DisplayName !== null && data.DisplayName !== undefined)
          newUser.displayName = data.DisplayName;
        if (data.Age !== null && data.Age !== undefined) newUser.age = data.Age;

        setUser(newUser);
        close();
      }
    } catch (error) {
      console.error(error);
      showError('Profile update failed, please try again.');
      reset();
    }
  };

  if (isError) {
    showError('Profile update failed, please try again.');
    reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Update your profile information here.
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
                placeholder={user.displayName}
              />
              <TextInput
                id='Age'
                label='Age'
                type='number'
                placeholder={user.age.toString()}
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
            form='update-user-form'
            className='w-32'
            disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? <Spinner /> : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
