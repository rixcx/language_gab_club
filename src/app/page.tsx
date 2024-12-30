import { getAllEpisodes } from "@/src/app/api/notion/route"
import { EpisodeSlider } from '@/src/app/components/EpisodeSlider';

import Image from "next/image";
import Link from "next/link";

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
          <div className={styles.hero__logo}>
            <h1>Just English Please!</h1>
            <Image
              src="/common/logo_title_blk.svg"
              alt="Just English Please!"
              width={258}
              height={258}
            />
          </div>
          <p className={styles.hero__disc}>Our podcast is all about life at our language school—learning, overcoming challenges, and living abroad. Join us for stories, tips, and insights from our vibrant community!
          </p>
        </section>
        
        <section className={styles.latest_episode}>
          <div className={styles.latest_episode__wrap}>
            <h2 className={styles.subtitle}>LATEST EPISODE</h2>
            <div className={styles.latest}>
              <div className={styles.latest_img}>
                <Link href={`/episodes/${latestEpisode.properties.slug.rich_text[0].plain_text}/${latestEpisode.id}`}>
                  <Image
                    src={`/episodes/${latestEpisode.properties.thumbnail.rich_text[0].plain_text}`}
                    alt={`${latestEpisode.properties.title.title[0].plain_text}`}
                    width={330}
                    height={186}
                  />
                </Link>
              </div>
              <div className={styles.latest_inner}>
                <div className={styles.latest_detail}>
                  <span>#{latestEpisode.properties.number.number}</span>
                  <h3><Link href={`/episodes/${latestEpisode.properties.slug.rich_text[0].plain_text}/${latestEpisode.id}`}>{latestEpisode.properties.title.title[0].plain_text}</Link></h3>
                  <p>{latestEpisode.paragraph}</p>
                </div>
                <div className={styles.latest_bottom}>
                  <time>{latestEpisode.properties.date.date.start}</time>
                  <div><Link href={`/episodes/${latestEpisode.properties.slug.rich_text[0].plain_text}/${latestEpisode.id}`}>Listen</Link></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className={styles.recent_episode}>
        <h2 className={styles.subtitle}>RECENT EPISODES</h2>
        <div className={styles.recents}>
          <EpisodeSlider episodes={episodes} />
        </div>
        <div className={styles.recent_episode__btn}><Link href="/episodes">ALL EPISODES</Link></div>
        </section>
      </main>
    </>
  );
}
