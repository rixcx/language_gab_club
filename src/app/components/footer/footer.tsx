import Image from "next/image";
import Link from 'next/link'

import css from '@/src/app/styles/Footer.module.scss';

export default function Footer() {

  return (
    <footer className={css.footer}>
      <small>&copy; Copyright 2024 Just English Please All rights reserved.</small>
    </footer>
  );
}