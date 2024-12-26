import Image from "next/image";
import Link from "next/link";

import { getAllEpisodes } from "@/src/app/api/notion/route"

import styles from '@/src/app/styles/Index.module.scss'

async function fetchData() {
  const response = await getAllEpisodes();
  const result = await response.json();
  return result;
};

export default async function Home() {

  const episodes = await fetchData();
  const latestEpisode = episodes[0];

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
                <span>#{latestEpisode.properties.number.number}</span>
                <h3>{latestEpisode.properties.title.title[0].plain_text}</h3>
                <p>{latestEpisode.paragraph}</p>
              </div>
              <div className={styles.latest_bottom}>
                <time>{latestEpisode.properties.date.date.start}</time>
                <div><Link href={`/episode/${latestEpisode.properties.slug.rich_text[0].plain_text}/${latestEpisode.id}`}>Listen</Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.recent_episode}>
      <h2 className={styles.subtitle}>RECENT EPISODES</h2>
      
      <div className={styles.recents}>
        <ul className={styles.recents__wrap}> 
        {episodes.map((episode: any) => (
          <li key={episode.id}>
            <p>#{episode.properties.number.number}</p>
            <p>{episode.properties.title.title[0].plain_text}</p>
            <p>{episode.id}</p>
            <p>{episode.properties.date.date.start}</p>
            <p>{episode.paragraph}</p>
            <Link href={`/episode/${episode.properties.slug.rich_text[0].plain_text}/${episode.id}`}>【Listen】</Link>
          </li>
        ))}
        </ul>
      </div>
      
      <Link href="" className={styles.recent__btn}>
        ALL EPISODES
      </Link>
      </section>
      </main>
    </>
  );
}
