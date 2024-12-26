import { Client } from "@notionhq/client";

// 初期化
const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

const getEpisodeParagraph = async (blockId: any) => {
  const childrenBlocks: any = await notion.blocks.children.list({
    block_id: blockId,
  });
  
  // 空行を除去した結果を返す
  const paragraphs = childrenBlocks.results.filter((prop: any) => 
    prop.type === 'paragraph' && prop.paragraph.rich_text.length > 0
  );
  
  return paragraphs[0]?.paragraph?.rich_text[0]?.plain_text;
};

export async function getAllEpisodes() {
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
    
    // 最初の段落を配列に追加
    const episodes =  await Promise.all(
      response.results.map(async (episode) => {
        const paragraph = await getEpisodeParagraph(episode.id);
        const newResults = {...episode, paragraph};
        return newResults;
    }))
    
    return new Response(JSON.stringify(episodes), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data from Notion" }), {
      status: 500,
    });
  }
}

