import type { Metadata } from "next";
import { Anton_SC, Roboto } from 'next/font/google'

import Link from "next/link";
import Image from "next/image";

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
      <div className={styles.background}>
      
        <nav className={styles.nav}>
          <ul className={styles.links}>
            <li><Link href="/about">ABOUT US</Link></li>
            <li><Link href="/episodes">EPISODES</Link></li>
          </ul>
          <ul className={styles.sns}>
            <li>
              <Link href="#">
                <Image
                  src="/common/ico_youtube.svg"
                  alt="Youtube"
                  width={45}
                  height={45}
                />
              </Link>
            </li>
            <li>
              <Link href="#">
                <Image
                  src="/common/ico_instagram.svg"
                  alt="Instagram"
                  width={45}
                  height={45}
                />
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.footer}>
          <div className={styles.logo}>
            <Image
              src="/common/logo_title_wht.svg"
              alt="Language Gab Club"
              width={120}
              height={71}
            />
          </div>
          {/* <div className={styles.stream}>
            <p>WE ARE STREAMING AT<Link href="#">YOUTUBE</Link></p>
          </div> */}
        </div>
      
      
      
      
      
        <div className={styles.main}>
          <div className={styles.inner}>
            <Header />
              {children}
            <Footer />
          </div>
        </div>
      </div>
      </body>
    </html>
  );
}
