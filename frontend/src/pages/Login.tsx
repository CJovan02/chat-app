import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const navigateToRegister = () => navigate('/register');

  return (
    <div className='flex min-h-screen items-start justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-6 sm:items-center sm:px-6 sm:py-0'>
      <div className='w-full max-w-sm'>
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
            <form className='space-y-4'>
              <div className='flex flex-col gap-4'>
                <div className='grid gap-2'>
                  <Label
                    htmlFor='username'
                    className='font-semibold'>
                    Username
                  </Label>
                  <Input
                    id='username'
                    type='text'
                    placeholder='Joca'
                    className='h-10'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center justify-between'>
                    <Label
                      htmlFor='password'
                      className='font-semibold'>
                      Password
                    </Label>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    className='h-10'
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='flex-col gap-3 pt-4'>
            <Button
              type='submit'
              className='w-full h-10 font-semibold'>
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
