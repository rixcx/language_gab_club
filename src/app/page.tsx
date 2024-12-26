'use client';
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from '@/src/app/styles/Index.module.scss'

export default function Home() {

  const [episodes, setEpisodes] = useState<any[]>([]);
  const [latestEpisode, setLatestEpisode] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/notion");
      const result = await response.json();
      setEpisodes(result);
      setLatestEpisode(result[0])
    };
    fetchData();
  }, []);

  return (
    <>
      <main className={styles.main}>
      
      <section className={styles.hero}>
        <div className={styles.logo}>
          <h1>Just English Please!</h1>
          <Image
            src="/common/logo_title_blk.svg"
            alt="Just English Please!"
            width={258}
            height={258}
          />
        </div>
        <p className={styles.disc}>Our podcast is all about life at our language school—learning, overcoming challenges, and living abroad. Join us for stories, tips, and insights from our vibrant community!
        </p>
      </section>
      
      <section className={styles.latest_episode}>
        <div className={styles.latest_episode_inner}>
          <h2 className={styles.subtitle}>LATEST EPISODE</h2>
          <div className={styles.latest}>
            <Image
              src="/episodes/img_thum_03.jpg"
              alt="FAVORITE PLACES IN BRISBANE!"
              width={330}
              height={186}
            />
            <div className={styles.latest_inner}>
              <div className={styles.latest_detail}>
              <p>{latestEpisode.properties.number.number}</p>
              <p>{latestEpisode.properties.title.title[0].plain_text}</p>
                <span>#3</span>
                <h3>FAVORITE PLACES IN BRISBANE!</h3>
                <p>Brisbane, the city we live in, is a place where beautiful nature and historic buildings harmonize. It's full of cafés, restaurants, and cultural spots...</p>
              </div>
              <div className={styles.latest_bottom}>
                <time>2024.03.15</time>
                <div>Listen</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      
        {episodes.map((episode) => (
          <li key={episode.id}>
            <p>#{episode.properties.number.number}</p>
            <p>{episode.properties.title.title[0].plain_text}</p>
            <p>{episode.id}</p>
            <p>{episode.properties.date.date.start}</p>
            
            <Link href={`/episode/${episode.properties.slug.rich_text[0].plain_text}/${episode.id}`}>【Listen】</Link>
          </li>
        ))}
      
      
        
      <section className={styles.recent_episode}>
      <h2 className={styles.subtitle}>RECENT EPISODES</h2>
      
      
      
      
      
      
      
      
      <div className={styles.recents}>
        <ul className={styles.recents__wrap}> 
          {/* {allEpisodes.map(async (prop: any) => (
            <li key={prop.id}>
              <p>=============================</p>
              <h2>{prop.title}</h2>
              <p>Date: {prop.date}</p>
              <p>ID: {prop.youtube_id}</p>
              <p>Description: {prop.paragraph}</p>
              <Link href={`/episode/${prop.slug}/${prop.id}`}>【Listen】</Link>
            </li>
          ))} */}
        </ul>
      </div>
      <div>・・・</div>
      
      <Link href="" className={styles.recent__btn}>
        ALL EPISODES
      </Link>
      </section>
      </main>
    </>
  );
}
