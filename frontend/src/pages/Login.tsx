import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

const Login = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800'>
      <div className='w-full max-w-sm px-4'>
        <Card className='border-0 shadow-2xl'>
          <CardHeader className='space-y-2'>
            <CardTitle className='text-2xl font-bold'>
              Login to your account
            </CardTitle>
            <CardDescription className='text-base'>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction className='pt-2'>
              <Button
                variant='link'
                className='pl-0'>
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className='pt-6'>
            <form className='space-y-4'>
              <div className='flex flex-col gap-4'>
                <div className='grid gap-2'>
                  <Label
                    htmlFor='email'
                    className='font-semibold'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
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
                    <a
                      href='#'
                      className='text-xs text-blue-600 underline-offset-4 hover:underline'>
                      Forgot your password?
                    </a>
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
            <Button
              variant='outline'
              className='w-full h-10 font-semibold'>
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
