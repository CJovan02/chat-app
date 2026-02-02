import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { UseChatLogicReturn } from '@/hooks/useChatLogic';
import { ButtonGroup } from '@/components/ui/button-group';
import { useState } from 'react';
import TextInput from '@/components/custom/textInput';
import { FormProvider } from 'react-hook-form';

type Props = {
  logic: UseChatLogicReturn;
};

function ChatInput({ logic }: Props) {
  const { sendMessageToCurrentChat, form } = logic;

  return (
    <div className='border-t border-primary/30 px-6 py-4'>
      <FormProvider {...form}>
        <form
          id='message-form'
          onSubmit={form.handleSubmit(sendMessageToCurrentChat)}>
          <ButtonGroup className='w-full'>
            <TextInput
              id='text'
              placeholder='Hello...'
              inputClassName='bg-ring/15 h-11'
            />
            <Button
              type='submit'
              className='size-11'
              aria-label='Send'>
              <Send className='size-4' />
            </Button>
          </ButtonGroup>
        </form>
      </FormProvider>
    </div>
    // <div className='border-t border-slate-800 px-6 py-4'>
    //   <div className='flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2'>
    //     <Input
    //       placeholder='Type a message...'
    //       className='border-0 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus-visible:ring-0'
    //     />
    //     <Button
    //       type='button'
    //       size='icon-sm'
    //       className='bg-indigo-500 text-white hover:bg-indigo-400'>
    //       <Send className='size-4' />
    //     </Button>
    //   </div>
    // </div>
  );
}

export default ChatInput;
