import { CreateUserRequest, ProblemDetails } from '@/api/generated/model';
import { usePostUser } from '@/api/generated/user/user';
import TextInput from '@/components/custom/textInput';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { showError } from '@/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long.'),
  displayName: z
    .string()
    .min(5, 'Display name must be at least 5 characters long.'),
  age: z.number().min(16, 'You must be at least 16 years old to register.'),
  password: z.string().min(5, 'Password must be at least 5 characters long.'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutateAsync, isPending, isError } = usePostUser();

  const navigateToLogin = () => navigate('/login');

  const onSubmit = async (data: RegisterFormValues) => {
    const request: CreateUserRequest = {
      username: data.username,
      displayName: data.displayName,
      age: data.age,
      password: data.password,
    };
    try {
      await mutateAsync({ data: request });
      navigateToLogin();
    } catch (error) {
      showError('Something went wrong');
    }
  };

  return (
    <div className='flex min-h-screen items-start justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-6 sm:items-center sm:px-6 sm:py-0'>
      <div className='w-full max-w-sm'>
        {isPending || isSubmitting ? (
          <Spinner />
        ) : (
          <Card className='border-0 shadow-2xl'>
            <CardHeader className='gap-1'>
              <CardTitle className='text-xl font-bold sm:text-2xl'>
                Create an account
              </CardTitle>
              <CardDescription className='text-sm sm:text-base'>
                Enter your information below to create your account
              </CardDescription>
              <div>
                <Button
                  variant='link'
                  className='p-0 w-full justify-start'
                  onClick={navigateToLogin}>
                  <span className='block leading-tight'>
                    Already have an account?
                  </span>
                  <span className='block leading-tight'>Login</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className='pt-2'>
              <FormProvider {...methods}>
                <form
                  id='register-form'
                  className='space-y-4'
                  onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col gap-4'>
                    <TextInput
                      id='username'
                      label='Username'
                      placeholder='joca'
                      required
                    />
                    <TextInput
                      id='displayName'
                      label='Display Name'
                      placeholder='Jovan Cvektović'
                      required
                    />
                    <TextInput
                      id='age'
                      type='number'
                      label='Age'
                      placeholder='18'
                      required
                    />
                    <TextInput
                      id='password'
                      type='password'
                      label='Password'
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
                form='register-form'
                className='w-full h-10 font-semibold'>
                Register
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Register;
