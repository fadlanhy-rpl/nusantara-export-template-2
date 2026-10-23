'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import TopMarquee from '@/components/common/TopMarquee';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

interface AppChromeProps {
  children: React.ReactNode;
}

export default function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // If in admin dashboard, suppress public chrome (marquee, public navbar, public footer)
  if (isAdmin) {
    return <>{children}</>;
  }

  // Regular public landing page shell
  return (
    <>
      <TopMarquee />
      <Navbar />
      <main className="flex-1 w-full pt-2 sm:pt-4">{children}</main>
      <Footer />
    </>
  );
}
