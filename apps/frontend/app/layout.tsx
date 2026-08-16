import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ojas Toy Exchange | Swap Toys, Share Joy, Save Planet',
  description: 'Hyper-local toy exchange hub for neighborhood parents in Ravet & Kiwale, PCMC Pune.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
