// @ts-ignore: Allow side-effect CSS import without type declarations
import './globals.css';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import  {CartProvider}  from '../context/cartContext';
import StoreContextProvider from '../context/authContext';
import ProtectedRoute from '../components/protectedRoutes';
import { Toaster } from 'sonner';
// @ts-ignore: Allow side-effect CSS import without type declarations
import 'aos/dist/aos.css';

export const metadata: Metadata = {
  title: 'Gollya Avanta LLP | Building Success Through Innovation and Trust',
  description:
    'Gollya Avanta LLP delivers comprehensive business solutions with a commitment to excellence. We partner with organizations to drive growth, innovation, and sustainable success.',
  keywords: [
    'Gollya Avanta LLP',
    'Business Solutions',
    'Consulting',
    'Business Growth',
    'Innovation',
    'India',
  ],
  authors: [{ name: 'Gollya Avanta LLP' }],
  openGraph: {
    title: 'Gollya Avanta LLP | Building Success Through Innovation and Trust',
    description:
      'Gollya Avanta LLP delivers comprehensive business solutions with a commitment to excellence.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Gollya Avanta LLP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gollya Avanta LLP | Building Success Through Innovation and Trust',
    description:
      'Gollya Avanta LLP delivers comprehensive business solutions with a commitment to excellence.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreContextProvider>
          <CartProvider>
            <ProtectedRoute>
              <Header />
              {children}
              <Footer />
            </ProtectedRoute>
          </CartProvider>
        </StoreContextProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}