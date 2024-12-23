import Image from "next/image";
import Link from 'next/link'

import styles from '@/src/app/styles/Footer.module.scss';

export default function Footer() {

  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        <li><Link href="/about">ABOUT US</Link></li>
        <li><Link href="/episodes">EPISODES</Link></li>
      </ul>
      <ul className={styles.sns}>
        <li>
          <Link href="">
            <Image
              src="/common/img_icon_youtube.svg"
              alt="Youtube"
              width={45}
              height={45}
            />
          </Link>
        </li>
        <li>
          <Link href="">
            <Image
              src="/common/img_icon_instagram.svg"
              alt="Instagram"
              width={45}
              height={45}
            />
          </Link>
        </li>
      </ul>
      <div className={styles.logo}>
        <Image
          src="/common/logo_title_wht.svg"
          alt="Jast Engilish Please!"
          width={103}
          height={103}
      />
      </div>
      <small className={styles.copyright}>&copy; Copyright 2024 JEP All rights reserved.</small>
    </footer>
  );
}