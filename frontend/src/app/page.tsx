'use client';

import * as React from 'react';
import '@/lib/env';

import CustomTab from '@/components/custom-tab';
import Footer from '@/components/footer';

import Logo from '~/svg/logo-autoU.svg';

export default function HomePage() {
  return (
    <main>
      <section className='flex bg-black flex-col min-h-screen h-full items-center'>
        <Logo className='w-[205.52px] my-8' />
        <CustomTab />
        <Footer />
      </section>
    </main>
  );
}
