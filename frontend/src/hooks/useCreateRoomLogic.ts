import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { usePostRoomCreatePrivate } from '@/api/generated/room/room';
import { CreatePrivateRoomRequest } from '@/api/generated/model';
import { useUserStore } from '@/store/userStore';
import { isAxiosError } from 'axios';

function useCreateRoomLogic() {
  const { user } = useUserStore();
  const [error, setError] = useState<Error | null>(null);
  const formSchema = z.object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters.')
      .max(40, "Username can't exceed 40 characters."),
  });
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const mutation = usePostRoomCreatePrivate();

  const uiState = {
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    errorMessage: mapCreateRoomError(mutation.error),
  };

  function mapCreateRoomError(error: unknown): string | null {
    if (!error) return null;

    if (isAxiosError(error) && error.response?.status === 404) {
      return "User with provided username doesn't exist.";
    }

    return 'Something went wrong while creating room.';
  }

  const createRoom = useCallback(
    async (data: FormValues) => {
      try {
        const request: CreatePrivateRoomRequest = {
          userId: user.id,
          otherUserUsername: data.username,
        };
        await mutation.mutateAsync({ data: request });
      } catch (error) {
        console.error(error);
      }
    },
    [mutation.mutateAsync, user.id],
  );

  return { form, createRoom, ...uiState };
}
