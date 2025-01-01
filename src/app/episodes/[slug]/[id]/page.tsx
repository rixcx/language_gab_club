import { getDetailEpisode, getInfoEpisode } from "@/src/app/api/notion/route"

import Image from "next/image";
import Link from "next/link";

import styles from '@/src/app/styles/EpisodeDatail.module.scss'

async function fetchInfoData(id: string) {
  const infoEpisode = await getInfoEpisode(id);
  const result = await infoEpisode.json();
  return result;
};

async function fetchDetailData(id: string) {
  const detailEpisode = await getDetailEpisode(id);
  const result = await detailEpisode.json();
  return result;
};

export default async function EpisodeDetail({ params }: { params: { id: string } }) {

  const { id } = await params;
  const episodeInfo = await fetchInfoData(id)
  const episodeBlocks = await fetchDetailData(id);
  
  return (
    <>
      <main className={styles.main}>
        <div className={styles.info}>
          <p>#{episodeInfo.number.number}</p>
          <h1>{episodeInfo.title.title[0].plain_text}</h1>
          <time>{episodeInfo.date.date.start}</time>
        </div>
        <div className={styles.wrap}>
          <div className={styles.movie} title="[dummy]">
            <Image
              src={`/episodes/${episodeInfo.thumbnail.rich_text[0].plain_text}`}
              alt={`${episodeInfo.title.title[0].plain_tex}`}
              width={330}
              height={186}
            />
          </div>
          <div className={styles.contents}>
            {episodeBlocks.map((block: any) => {
              if (block.type === 'paragraph' && block.paragraph.rich_text.length !== 0) {
                return <div key={block.id} className={styles.paragraph}>{block.paragraph?.rich_text?.[0]?.plain_text}</div>;
              } else if (block.type === 'heading_3') {
                return <h2 key={block.id} className={styles.heading_3}>{block.heading_3?.rich_text?.[0]?.plain_text}</h2>;
              } else if (block.type === "table" && block.has_children) {
                return (
                  <table key={block.id} className={styles.table}>
                    <tbody>
                      {block.tableDetail.map((row: any, index: number) => (
                        <tr key={index}>
                          <th>{row.table_row.cells[0][0].plain_text}</th>
                          <td>{row.table_row.cells[1][0].plain_text}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              }
              return null;
            })}
          </div>
        </div>
      </main>
    </>
  );
};
