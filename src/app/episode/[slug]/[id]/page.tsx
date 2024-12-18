import { getDetailEpisodes } from '../../../../../lib/notion/notion';
import Image from "next/image";
import Link from "next/link";

export default async function EpisodeDetail({ params }: { params: { slug: string, id: string } }) {

  const { slug, id } = await params;
  
  const detailEpisode = await getDetailEpisodes(id);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>This is【{slug}】page.</h1>
        <p>Page id: {id}</p>
        <ul>
          {detailEpisode.map((prop: any) => (
            <li key={prop.id}>
              <p>=============================</p>
              <h1>type: {prop.type}</h1>
              <h1>id: {prop.id}</h1>
              <h1>value: {prop.value}</h1>
            </li>
          ))}
        </ul>
    </main>
    </div>
  );
};