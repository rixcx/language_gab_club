
import { getEpisodeBlocks } from '../../../../../lib/notion/notion';
import Image from "next/image";
import Link from "next/link";

export default async function EpisodeDetail({ params }: { params: { slug: string, id: string } }) {

  //URLからパラメータ取り出し
  const { slug, id } = await params;
  
  //記事IDから、ページの親ブロックすべて取得
  const EpisodeBlocks = await getEpisodeBlocks(id);
  
  //親ブロックのうち、テーブルブロックの子要素を取得して配列を作成
  async function getTableChildrenBlocks(blockid: any) {
    const tableChildren = await getEpisodeBlocks(blockid);
    const customTableChildrenList = await 
    tableChildren.map((block:any) => {
      return {
        table_row: {
          cells: block.table_row.cells.map((cell: any[]) => {
            return cell.map((item) => ({
              plain_text: item.plain_text,
            }));
          }),
        },
      };
    });
    return customTableChildrenList;
  }
  
  //すべての非同期処理が成功した場合にコールバックを実行するPromise.allメソッドを使う
  const EpisodeProps = await Promise.all(
    EpisodeBlocks.map(async (prop: { type: string; paragraph: { rich_text: string | any[]; }; has_children: any; id: any; heading_3: { rich_text: { plain_text: any; }[]; }; }) => {

    //value出し分け
    let value;
    //Paragraph
    if (prop.type === 'paragraph' && !!(prop.paragraph.rich_text.length)) {
      value = prop.paragraph?.rich_text?.[0]?.plain_text;
    //Table
    } else if (prop.type === "table" && prop.has_children) {
      const e = await getTableChildrenBlocks(prop.id);
      value =  JSON.stringify(e);
    //Heading
    } else if (prop.type === 'heading_3') {
      value = prop.heading_3?.rich_text?.[0]?.plain_text;
    } else {
      value = null;
    }
    const newEpisodeProps = {
      id: prop.id,
      has_children: prop.has_children,
      type: prop.type,
      value: value
    };
    return newEpisodeProps;
  }));
    
  // console.log(JSON.stringify(EpisodeProps));

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {JSON.stringify(EpisodeProps)}
      <p>===================================================</p>
      <h1>This is【{slug}】page.</h1>
      <p>PAGE ID: {id}</p>
      <ul>
        {EpisodeProps.map((props: any) => (
          <li key={props.id}>
            <p>=================</p>
            <h1>type: {props.type}</h1>
            <h1>id: {props.id}</h1>
            <h1>value: {props.value}</h1>
          </li>
        ))}
      </ul>
    </main>
    </div>
  );
};