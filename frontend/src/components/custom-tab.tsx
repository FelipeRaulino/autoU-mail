'use client';

import React from 'react';

import DefaultEmailClassification from '@/components/default-email-classification';
import ErrorEmailClassification from '@/components/error-email-classification';
import HistoryContent from '@/components/history-content';
import SuccessEmailClassification from '@/components/success-email-classification';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useEmailClassification } from '@/store/useEmailClassification';

const CustomTab = () => {
  const emailSuccess = useEmailClassification((state) => state.emailSuccess);
  const emailError = useEmailClassification((state) => state.emailError);

  return (
    <Tabs defaultValue='email' className='my-6 mx-2.5 md:mx-0'>
      <TabsList>
        <TabsTrigger value='email'>Enviar email</TabsTrigger>
        <TabsTrigger value='history'>Histórico</TabsTrigger>
      </TabsList>
      <TabsContent value='email'>
        {emailError ? (
          <ErrorEmailClassification />
        ) : emailSuccess.state ? (
          <SuccessEmailClassification
            classification={emailSuccess.classification}
            auto_reply={emailSuccess.auto_reply}
          />
        ) : (
          <DefaultEmailClassification />
        )}
      </TabsContent>
      <TabsContent value='history'>
        <HistoryContent />
      </TabsContent>
    </Tabs>
  );
};

export default CustomTab;
