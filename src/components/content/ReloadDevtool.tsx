'use client';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { HiRefresh } from 'react-icons/hi';

import ButtonLink from '@/components/links/ButtonLink';

export default function ReloadDevtool() {
  const pathname = usePathname();

  // const isProd = window?.location.href.includes('localhost') ?? undefined;

  return true ? (
    <ButtonLink href={pathname} className='fixed bottom-4 left-4'>
      <HiRefresh />
    </ButtonLink>
  ) : null;
}
