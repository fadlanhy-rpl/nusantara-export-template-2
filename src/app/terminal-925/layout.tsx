'use client';

import React, { useState } from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminNavbar from '@/components/admin/AdminNavbar';

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#14100D] flex flex-row">
        {/* Dedicated Industrial Admin Sidebar */}
        <AdminSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Dedicated Admin Main Content Container */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#14100D] overflow-x-hidden">
          {/* Dedicated Admin Navbar */}
          <AdminNavbar onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)} />

          {/* Main Admin Workspace */}
          <main className="flex-1 w-full p-3 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
