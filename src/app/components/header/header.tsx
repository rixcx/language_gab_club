"use client"
import { useState } from 'react';

import Image from "next/image";
import Link from 'next/link'

import HamburgerMenu from "@/src/app/components/header/HamburgerMenu"

import css from '@/src/app/styles/Header.module.scss';

export default function Header() {

  return (
    <header className={css.header}>
      <div className={css.wrap}>
        <div className={css.logo}>
          <Link href="/">
            <Image
              src="/common/logo_icon.svg"
              alt="Just English Please"
              width={50}
              height={55}
            />
          </Link>
        </div>
        <HamburgerMenu />
      </div>
    </header>
  );
}