import { ArrowLeft, MailWarning } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

import { useEmailClassification } from '@/store/useEmailClassification';

const ErrorEmailClassification = () => {
  const changeEmailError = useEmailClassification(
    (state) => state.changeEmailError
  );

  return (
    <div className='flex flex-col flex-1 relative px-12 py-6'>
      <ArrowLeft
        className='absolute top-3 left-4 cursor-pointer'
        color='#FFF'
        onClick={() => changeEmailError(false)}
      />

      <h3 className='font-inter text-white text-lg mt-8 font-bold'>
        Não foi possível processar seu email
      </h3>

      <MailWarning size={65} color='#AB4141' className='mt-12 self-center' />

      <p className='font-inter text-[#737373] text-justify mt-12'>
        Não foi possível processar o conteúdo do email enviado. Por favor,
        verifique o formato do arquivo ou o texto informado e tente novamente.
        Caso o problema persista, entre em contato com nossa equipe de suporte.
      </p>

      <Button
        type='button'
        className='mt-auto text-white font-inter text-sm self-center cursor-pointer'
        onClick={() => changeEmailError(false)}
      >
        Tente novamente
      </Button>
    </div>
  );
};

export default ErrorEmailClassification;
