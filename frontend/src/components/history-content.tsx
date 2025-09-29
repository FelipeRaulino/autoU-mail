import React from 'react';

import CustomDialog from '@/components/custom-dialog';
import ErrorHistoryContent from '@/components/error-history-content';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Loading from '@/../public/svg/Loading.svg';
import { getEmailHistory } from '@/actions/getEmailHistory';

import { Email } from '@/types/emailType';

const HistoryContent = () => {
  const [data, setData] = React.useState<Email[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const reloadHistory = () => {
    setHasError(false);
    getHistory();
  };

  const getHistory = async () => {
    setIsLoading(true);
    try {
      const data = await getEmailHistory();

      if (!data || data.length === 0) {
        setData([]);
      } else {
        setData(data);
      }

      setHasError(false);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className='flex-1 flex px-8 py-6'>
      {isLoading ? (
        <Loading className='w-10 self-center justify-self-center mx-auto' />
      ) : hasError === true ? (
        <ErrorHistoryContent tryAgain={reloadHistory} />
      ) : data.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='font-inter font-bold text-sm text-white'>
                Email
              </TableHead>
              <TableHead className='font-inter font-bold text-sm text-white'>
                Classificação
              </TableHead>
              <TableHead className='font-inter font-bold text-sm text-white'>
                Ação
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((email, index) => (
              <TableRow key={email.id}>
                <TableCell className='font-inter text-sm text-[#8E8E8E]'>
                  E{index + 1}
                </TableCell>

                <TableCell>
                  <span
                    className={`${
                      email.classification === 'Produtivo'
                        ? 'bg-[#7860FF]'
                        : 'bg-[#F0A400]'
                    } px-4 py-1 font-inter font-bold text-white text-xs rounded-[8px]`}
                  >
                    {email.classification}
                  </span>
                </TableCell>

                <TableCell>
                  <CustomDialog
                    emailText={email.email_text}
                    autoReply={email.auto_reply}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Sem emails enviados</p>
      )}
    </div>
  );
};

export default HistoryContent;
