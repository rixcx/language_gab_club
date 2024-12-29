import { getDetailEpisode } from "@/src/app/api/notion/route"

import Image from "next/image";
import Link from "next/link";

import styles from '@/src/app/styles/EpisodeDatail.module.scss'

async function fetchData(id: string) {
  const detailEpisode = await getDetailEpisode(id);
  const result = await detailEpisode.json();
  return result;
};

export default async function EpisodeDetail({ params }: { params: { slug: string, id: string } }) {

  const { slug, id } = await params;
  const episodeBlocks = await fetchData(id);

  // 表示用にjsonを加工
  const customEpisodeBlocks = await Promise.all(
    episodeBlocks.map(async (block: any) => {

    let contents;
    //Paragraph
    if (block.type === 'paragraph' && !!(block.paragraph.rich_text.length)) {
      contents = block.paragraph?.rich_text?.[0]?.plain_text;
    //Table
    } else if (block.type === "table" && block.has_children) {
      contents = JSON.stringify(block.tableDetail);
    //Heading
    } else if (block.type === 'heading_3') {
      contents = block.heading_3?.rich_text?.[0]?.plain_text;
    } else {
      contents = null;
    }
    
    const customEpisodeProps = {
      id: block.id,
      has_children: block.has_children,
      type: block.type,
      contents: contents
    };
    
    return customEpisodeProps;
  }));

  return (
    <div className="">
      <main className="">
        <h1>This is【{slug}】page.</h1>
        <p>Page id: {id}</p>
        <div>
          {episodeBlocks.map((block: any) => {
            if (block.type === 'paragraph' && block.paragraph.rich_text !== null) {
              return <div key={block.id} className={styles.paragraph}>{block.paragraph?.rich_text?.[0]?.plain_text}</div>;
            } else if (block.type === 'heading_3') {
              return <div key={block.id} className={styles.heading_3}>{block.heading_3?.rich_text?.[0]?.plain_text}</div>;
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
        {/* <ul>
          {customEpisodeBlocks.map((block: any) => (
            <li key={block.id}>
              <p>=============================</p>
              <h1>type: {block.type}</h1>
              <h1>id: {block.id}</h1>
              <h1>contents: {block.contents}</h1>
            </li>
          ))}
        </ul> */}
    </main>
    </div>
  );
};