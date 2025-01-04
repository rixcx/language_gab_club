import type { Metadata } from "next";
import { Anton_SC, Roboto } from 'next/font/google'

import Header from '@/src/app/components/header/header';
import Footer from '@/src/app/components/footer/footer';

import '@/src/app/styles/global/reset.css'
import '@/src/app/styles/global/global.scss'

import styles from '@/src/app/styles/Layout.module.scss';

import 'swiper/swiper-bundle.css';

const anton_sc = Anton_SC({
  weight: "400",
  variable: '--font-anton_sc',
  subsets: ["latin"],
})
 
const roboto = Roboto({
  weight: ['400', '700'],
  variable: '--font-roboto',
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Language Gab Club",
  description: "The podcast of our language school!",
  robots: {
      index: false,
      follow: false,
      nosnippet: true,
      noimageindex: true,
      
    googleBot: {
      index: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Language Gab Club</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${anton_sc.variable} ${roboto.variable} antialiased ${styles.body}`}
      >
        <div className={styles.inner}>
          <Header />
            {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
