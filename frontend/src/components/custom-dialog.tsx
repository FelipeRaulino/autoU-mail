import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ICustomDialog {
  emailText: string;
  autoReply: string;
}

const CustomDialog = ({ emailText, autoReply }: ICustomDialog) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' className='cursor-pointer'>
          Ver detalhes
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='font-inter font-bold text-white'>
            Detalhes do Email
          </DialogTitle>
        </DialogHeader>
        <div className='flex-1 flex flex-col gap-4 mt-4'>
          <div className='flex flex-col gap-2'>
            <h3 className='font-inter text-white font-semibold'>
              Texto do Email
            </h3>
            <p className='font-inter text-[#8E8E8E] text-justify'>
              {emailText}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='font-inter text-white font-semibold'>
              Sugestão de resposta
            </h3>
            <p className='font-inter text-[#8E8E8E] text-justify'>
              {autoReply}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
