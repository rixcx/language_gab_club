import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

import styles from '@/src/app/styles/HamburgerMenu.module.scss';

export default function HamburgerMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  const toggleOpen = () => {
      setOpen(!open)
  };

  useEffect(() => {
    setOpen(false); //
  }, [pathname]);

  return (
    <>
      <div
        className={`${styles.hamburger} ${open ? styles.open : ""}`}
        onClick={toggleOpen}
      ></div>
      <div className={`${styles.menu} ${open ? styles.open : ""}`}>
        <ul>
          <li><Link href="/about">ABOUT US</Link></li>
          <li><Link href="/episodes">EPISODES</Link></li>
        </ul>
      </div>
    </>
  );
}