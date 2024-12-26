import { Client } from "@notionhq/client";

// 初期化
const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

export async function GET() {
  const databaseId = process.env.DATABASE_ID as string;;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'created',
          direction: 'descending',
        },
        //publish追加
      ]
    });

    return new Response(JSON.stringify(response.results), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data from Notion" }), {
      status: 500,
    });
  }
}
