import React from 'react';

import CustomForm from '@/components/custom-form';

const DefaultEmailClassification = () => {
  return (
    <div className='flex flex-col px-12 py-6'>
      <div className='flex flex-col gap-2'>
        <h3 className='font-inter font-bold text-lg text-white'>
          Enviar email
        </h3>
        <p className='text-base font-inter text-[#737373]'>
          Preencha o campo abaixo e/ou faça upload de um arquivo em formato{' '}
          <span className='text-[#9c9c9c] italic'>.txt</span> ou
          <span className='text-[#9c9c9c] italic'> .pdf</span> contendo o
          conteúdo de um email.
        </p>
      </div>
      <CustomForm />
    </div>
  );
};

export default DefaultEmailClassification;
