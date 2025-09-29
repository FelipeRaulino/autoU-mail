import { ArrowLeft } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

import { useEmailClassification } from '@/store/useEmailClassification';

interface SuccessEmailClassificationI {
  classification: string;
  auto_reply: string;
}

const SuccessEmailClassification = ({
  classification,
  auto_reply,
}: SuccessEmailClassificationI) => {
  const resetEmailSuccess = useEmailClassification(
    (state) => state.resetEmailSuccess
  );

  return (
    <div className='flex flex-col flex-1 relative px-12 py-6'>
      <ArrowLeft
        className='absolute top-3 left-4 cursor-pointer'
        color='#FFF'
        onClick={resetEmailSuccess}
      />

      <h3 className='font-inter text-white text-lg mt-8 font-bold'>
        Email processado com sucesso
      </h3>

      <div className='flex flex-col gap-3 mt-8'>
        <h4 className='font-inter text-white font-medium'>Classificação</h4>
        <Chip label={classification} />
      </div>

      <div className='flex flex-col gap-3 mt-8 '>
        <h4 className='font-inter text-white font-medium'>
          Sugestão de Mensagem
        </h4>
        <p className='font-inter text-[#737373] text-justify'>{auto_reply}</p>
      </div>

      <Button
        type='button'
        className='mt-auto text-white font-inter text-sm self-center cursor-pointer'
        onClick={resetEmailSuccess}
      >
        Enviar email novamente
      </Button>
    </div>
  );
};

export default SuccessEmailClassification;

const Chip = ({ label }: { label: string }) => {
  return (
    <div
      className={`flex font-inter text-white font-bold text-xs rounded-[8px] px-4 py-0.75 max-w-[88px] items-center justify-center ${
        label === 'Produtivo' ? 'bg-[#7860FF]' : 'bg-[#F0A400]'
      }`}
    >
      {label}
    </div>
  );
};
