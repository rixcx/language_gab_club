import Image from "next/image";
import { getAllEpisodes } from '../../lib/notion/notion';

//＜なぜasync/awaitが必要？＞
//asyncは非同期処理の宣言、つまり実行しながら他の処理もしますということ。
//awaitはasyncの中で非同期処理が終わるまで一時停止させることができる。
//→通常、非同期処理では、その処理が完了する前に次の行のコードが実行されますが、
//awaitを使うと、その処理が終わるまで次の処理を待つようになります。
//→APIの読み込みが発生するので、非同期処理かつawaitを使って待ってもらうのがベスト？

export default async function Home() {

  const allEpisodes = await getAllEpisodes();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      
        {allEpisodes.map((item: any) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>Date: {item.date}</p>
          </li>
        ))}

      </main>
    </div>
  );
}
