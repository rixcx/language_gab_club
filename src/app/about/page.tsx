import Image from "next/image";
import Link from "next/link";

import styles from '@/src/app/styles/About.module.scss'

export default function About() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.desc}>
          <h2 className={styles.subtitle}>ABOUT US</h2>
          <p className={styles.desc__txt}>Our podcast is all about life at our language school—learning, overcoming challenges, and living abroad. Join us for stories, tips, and insights from our vibrant community!</p>
          <div className={styles.desc__img}>
            <Image
              src="/about/img_member.png"
              alt="Project member"
              width={590}
              height={426}
            />
          </div>
        </div>
        <div className={styles.howto}>
          <h2 className={styles.subtitle}>HOW TO LISTEN</h2>
          <p className={styles.howto__txt}>Our Podcasts is available at <Link  href="https://www.youtube.com/" target="_blank">Youtube.</Link></p>
        </div>
      </main>
    </>
  );
};