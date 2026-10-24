'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import TopMarquee from '@/components/common/TopMarquee';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AdminFloatingPill from '@/components/common/AdminFloatingPill';

interface AppChromeProps {
  children: React.ReactNode;
}

export default function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isTerminalAdmin = pathname?.startsWith('/terminal-925');

  // If in secret admin dashboard, suppress public chrome (marquee, public navbar, public footer)
  if (isTerminalAdmin) {
    return <>{children}</>;
  }

  // Regular public landing page shell with floating admin return badge
  return (
    <>
      <TopMarquee />
      <Navbar />
      <main className="flex-1 w-full pt-2 sm:pt-4">{children}</main>
      <Footer />
      {/* Discreet floating return button for logged-in admins previewing public portal */}
      <AdminFloatingPill />
    </>
  );
}
