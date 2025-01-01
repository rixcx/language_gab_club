import { getAllEpisodes } from "@/src/app/api/notion/route"

import Image from "next/image";
import Link from "next/link";

import styles from '@/src/app/styles/Episodes.module.scss'

async function fetchData() {
  const response = await getAllEpisodes();
  const result = await response.json();
  return result;
};

export default async function Episodes() {

  const episodes = await fetchData();

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.subtitle}>ALL EPISODES</h2>
        {episodes .map((episode: any) => (
          <div key={episode.id} className={styles.episode}>
            <Link href={`/episodes/${episode.properties.slug.rich_text[0].plain_text}/${episode.id}`}>
              <div className={styles.episode__img}>
                <Image
                  src={`/episodes/${episode.properties.thumbnail.rich_text[0].plain_text}`}
                  alt={`${episode.properties.title.title[0].plain_text}`}
                  width={330}
                  height={186}
                />
              </div>
              <div className={styles.episode__inner}>
                <div className={styles.episode__detail}>
                  <span>#{episode.properties.number.number}</span>
                  <h3>{episode.properties.title.title[0].plain_text}</h3>
                </div>
                <div className={styles.episode__bottom}>
                  <time>{episode.properties.date.date.start}</time>
                  <div>Listen</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </main>
    </>
  );
};