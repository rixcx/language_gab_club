import { getAllEpisodes } from '../../lib/notion/notion';
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const allEpisodes = await getAllEpisodes();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul>
          {allEpisodes.map(async (prop: any) => (
            <li key={prop.id}>
              <p>=============================</p>
              <h2>{prop.title}</h2>
              <p>Date: {prop.date}</p>
              <p>ID: {prop.youtube_id}</p>
              <p>Description: {prop.paragraph}</p>
              <Link href={`/episode/${prop.slug}/${prop.id}`}>【Listen】</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
