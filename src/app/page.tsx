import { getAllEpisodes } from '../../lib/notion/notion';
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const allEpisodes = await getAllEpisodes();

  return (
    <div className="">
      <main className="">
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
