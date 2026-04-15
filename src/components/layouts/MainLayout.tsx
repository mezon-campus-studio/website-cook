/**
 * Main application layout component
 * Extend or replace with your actual layout
 */

import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Add header, sidebar, footer etc. here */}
      <main className="container mx-auto grow">{children}</main>
      <Footer />
    </div>
  );
}
