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
    <div className="min-h-screen">
      {/* Add header, sidebar, footer etc. here */}
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
