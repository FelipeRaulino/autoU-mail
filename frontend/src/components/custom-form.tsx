'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { useEmailClassification } from '@/store/useEmailClassification';

import Loading from '@/../public/svg/Loading.svg';
import { getEmailClassification } from '@/actions/postEmailRequest';

import { Progress } from './ui/progress';

const formSchema = z.object({
  text: z.string().min(10, {
    message:
      'A mensagem de texto do email deverá ter, pelo menos, 10 caracteres.',
  }),
  file: z
    .custom<File>()
    .refine(
      (file) => {
        if (!file) return true; // permitir vazio, pois é opcional
        const validTypes = ['application/pdf', 'text/plain'];
        return validTypes.includes(file.type);
      },
      {
        message: 'Somente arquivos .pdf ou .txt são permitidos',
      }
    )
    .optional(),
});

const CustomForm = () => {
  const [progress, setProgress] = React.useState<number>(0);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [_, setLoadingFile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const changeEmailSuccess = useEmailClassification(
    (state) => state.changeEmailSuccess
  );
  const changeEmailError = useEmailClassification(
    (state) => state.changeEmailError
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      file: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await getEmailClassification(values.text, values.file);
      setIsLoading(false);
      changeEmailSuccess(true, response.classification, response.auto_reply);
    } catch (error) {
      setIsLoading(false);
      changeEmailError(true);
    }
  }

  const handleFileChange = (
    files: FileList | null,
    onChange: (value: File) => void
  ) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    onChange(file);
    setFileName(file.name);
    setLoadingFile(true);
    setProgress(0);

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded / e.total) * 100);
        setProgress(percentage);
      }
    };

    reader.onloadend = () => {
      setProgress(100);
      setTimeout(() => {
        setLoadingFile(false);
      }, 800);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleRemoveFile = (onChange: (value: File | undefined) => void) => {
    onChange(undefined);
    setFileName(null);
    setProgress(0);
    setLoadingFile(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-1 flex-col mt-6 gap-6'
      >
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-inter text-[#FAFAFA]'>
                Mensagem*
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Insira aqui sua mensagem de email'
                  {...field}
                  className='bg-[#272727] border border-[#737373] text-sm font-inter text-[#D4D4D4] resize-none h-[125px]'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-inter text-[#FAFAFA]'>
                Arquivo (.txt ou .pdf)
              </FormLabel>
              <FormControl>
                {fileName ? (
                  <div className='flex px-6 py-4 bg-[#272727] border border-[#737373] rounded-[5px] items-center gap-4'>
                    <FileText color='#FEA006' size={24} />
                    <div className='flex flex-col flex-1 gap-1'>
                      <span className='font-inter text-xs text-[#BFBCBC]'>
                        {fileName}
                      </span>
                      <Progress value={progress} />
                    </div>
                    <button
                      type='button'
                      className='cursor-pointer'
                      onClick={() => handleRemoveFile(field.onChange)}
                    >
                      <X
                        size={24}
                        className='text-[#BFBCBC] hover:text-[#dad8d8] transition-all'
                      />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      document.getElementById('fileInput')?.click()
                    }
                    className='flex flex-col gap-4 items-center max-w-[250px] bg-[#272727] border border-[#737373] py-4 rounded-[5px] border-dashed'
                  >
                    <p className='text-white font-inter text-sm'>
                      Clique aqui para
                    </p>
                    <span className='font-inter text-sm px-4 py-2 border border-[#FEA006] rounded-[5px] text-[#FEA006]'>
                      Procurar arquivo
                    </span>
                    <input
                      id='fileInput'
                      type='file'
                      className='hidden'
                      accept='.pdf,.txt'
                      onChange={(e) =>
                        handleFileChange(e.target.files, field.onChange)
                      }
                    />
                  </div>
                )}
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='self-center mt-auto bg-[#2C2C2C] rounded-[5px] hover:bg-[#2C2C2C] cursor-pointer'
          disabled={isLoading}
        >
          {' '}
          {isLoading ? (
            <span className='flex gap-2 items-center font-inter text-white'>
              {' '}
              <Loading size={14} fill='#FFF' /> Enviando...{' '}
            </span>
          ) : (
            'Enviar'
          )}{' '}
        </Button>
      </form>
    </Form>
  );
};

export default CustomForm;
