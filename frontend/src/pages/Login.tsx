import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/custom/textInput';
import { usePostUserLogin } from '@/api/generated/user/user';
import { LoginRequest } from '@/api/generated/model';
import { showError } from '@/toast';
import { Spinner } from '@/components/ui/spinner';
import UpdateUserDialog from '@/components/custom/updateUser/updateUserDialog';

export const loginSchema = z.object({
  Username: z.string().min(3, 'Username is required'),
  Password: z.string().min(5, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutateAsync, isPending, isError } = usePostUserLogin();

  const navigateToRegister = () => navigate('/register');
  const navigateToDashboard = () => navigate('/dashboard');

  const onSubmit = async (data: LoginFormValues) => {
    const request: LoginRequest = {
      username: data.Username,
      password: data.Password,
    };

    const result = await mutateAsync({ data: request });
    console.log(result);
  };

  if (isError) {
    showError('Login failed. Please check your credentials and try again.');
  }

  return (
    <div className='flex min-h-screen items-start justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-6 sm:items-center sm:px-6 sm:py-0'>
      <div className='w-full max-w-sm'>
        {isPending || isSubmitting ? (
          <Spinner />
        ) : (
          <Card className='border-0 shadow-2xl'>
            <CardHeader className='gap-1'>
              <CardTitle className='text-xl font-bold sm:text-2xl'>
                Login to your account
              </CardTitle>
              <CardDescription className='text-sm sm:text-base'>
                Enter your username below to login to your account
              </CardDescription>
              <div>
                <Button
                  variant='link'
                  className='pl-0 w-full justify-start'
                  onClick={navigateToRegister}>
                  Sign Up
                </Button>
              </div>
            </CardHeader>
            <CardContent className='pt-2'>
              <UpdateUserDialog />
              <FormProvider {...methods}>
                <form
                  id='login-form'
                  className='space-y-4'
                  onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col gap-4'>
                    <TextInput
                      id='Username'
                      label='Username'
                      placeholder='Joca'
                      required
                    />
                    <TextInput
                      id='Password'
                      label='Password'
                      type='password'
                      placeholder='********'
                      required
                    />
                  </div>
                </form>
              </FormProvider>
            </CardContent>
            <CardFooter className='flex-col gap-3 pt-4'>
              <Button
                type='submit'
                form='login-form'
                className='w-full h-10 font-semibold'>
                Login
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;
