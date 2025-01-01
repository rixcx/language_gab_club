import { Client } from "@notionhq/client";

// 初期化
const notion = new Client ({
  auth: process.env.NOTION_TOKEN
});


// すべての記事を取得
export async function getAllEpisodes() {
  const databaseId = process.env.DATABASE_ID as string;
  
  // 空行を除去した結果を返す
  const getEpisodeParagraph = async (pageId: string) => {
    const childrenBlocks: any = await notion.blocks.children.list({
      block_id: pageId,
    });
    
    const paragraphs = childrenBlocks.results.filter((prop: any) => 
      prop.type === 'paragraph' && prop.paragraph.rich_text.length > 0
    );
    
    return paragraphs[0]?.paragraph?.rich_text[0]?.plain_text;
  };
  
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
    
    const responseEpisodes = response.results;
    
    // 各記事の最初の段落を配列に追加
    const episodes =  await Promise.all(
      responseEpisodes.map(async (episode) => {
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


// 記事IDから日付などを取得
export async function getInfoEpisode(pageId: string) {

  try {
    const response = await notion.pages.retrieve({
    page_id: pageId
   });
    
    const responseInfo = (response as any).properties; 

    return new Response(JSON.stringify(responseInfo), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data from Notion" }), {
      status: 500,
    });
  }
};


// 記事IDから詳細を取得
export async function getDetailEpisode(pageId: string) {

  // テーブルの子要素を取得
  const getTableChildren = async (blockId: any) => {
    const ChildrenBlocks = await notion.blocks.children.list({
        block_id: blockId,
    });

    const customTableChildren = ChildrenBlocks.results.map((prop: any) => {
      return {
        table_row: {
          cells: prop.table_row.cells.map((cell: any[]) => {
            return cell.map((item) => ({
              plain_text: item.plain_text,
            }));
          }),
        },
      };
    });
    return customTableChildren;
  };

  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    
    const responseBlocks = response.results

    // typeがテーブルなら子要素を取得して配列に追加、そうでないならそのままreturn
    const blocks =  await Promise.all(
      responseBlocks.map(async (block: any) => {
        if (block.type === "table" && block.has_children) {
          const tableDetail = await getTableChildren(block.id);
          return { ...block, tableDetail };
        } return block; 
      }))

    return new Response(JSON.stringify(blocks), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data from Notion" }), {
      status: 500,
    });
  }
}
