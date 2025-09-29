import { MailWarning } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

interface IErrorHistoryContent {
  tryAgain: () => void;
}

const ErrorHistoryContent = ({ tryAgain }: IErrorHistoryContent) => {
  return (
    <div className='flex flex-col flex-1 relative px-12 py-6'>
      <h3 className='font-inter text-white text-lg mt-8 font-bold'>
        Não foi possível carregar o histórico de emails
      </h3>

      <MailWarning size={65} color='#AB4141' className='mt-12 self-center' />

      <p className='font-inter text-[#737373] text-justify mt-12'>
        Não foi possível carregar o histórico de emails enviados. Tente
        novamente, caso o problema persista, entre em contato com nossa equipe
        de suporte.
      </p>

      <Button
        type='button'
        className='mt-auto text-white font-inter text-sm self-center cursor-pointer'
        onClick={tryAgain}
      >
        Tente novamente
      </Button>
    </div>
  );
};

export default ErrorHistoryContent;
