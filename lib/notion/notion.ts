const { Client } = require("@notionhq/client")

// 初期化
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// データベースを取得
const response = await notion.databases.query({
  database_id: process.env.DATABASE_ID,
  sorts: [
    {
      property: 'created',
      direction: 'descending',
    },
    //publish追加
  ]
})


// すべての記事を取得
export const getAllEpisodes = async () => {

  const getEpisodeParagraph = async (blockId: any) => {
    const childrenBlocks = await notion.blocks.children.list({
        block_id: blockId,
    });
    
    // 空行を除去した結果を返す
    const paragraphs = childrenBlocks.results.filter((prop: { type: any; paragraph: { rich_text: any } }) => 
      prop.type === 'paragraph' && prop.paragraph.rich_text.length > 0
    );
    return paragraphs[0]?.paragraph.rich_text[0]?.plain_text;
  };

  const allEpisodesProps = await Promise.all(
   response.results.map(async (post: any) => {
    const id = post.id;
    const number = post.properties.number.number
    const title = post.properties.title.title[0].plain_text;
    const date = post.properties.date.date.start;
    const youtube_id = post.properties.youtube_id.rich_text[0].plain_text;
    const publish = post.properties.publish.checkbox;
    const slug = post.properties.slug.rich_text[0].plain_text;
    const paragraph = await getEpisodeParagraph(post.id);
    
    return { id,number,title,date,youtube_id,publish,slug,paragraph };
  }));

  return allEpisodesProps;
};


// 記事IDから要素を取得
export const getDetailEpisodes = async (pageId: any) => {

  const childrenBlocks = await notion.blocks.children.list({
      block_id: pageId,
  });
  
  const getTabeChildrenBlocks = async (blockId: any) => {
    const tableChildrenBlocks = await notion.blocks.children.list({
        block_id: blockId,
    });
    const customTableChildren = await 
    tableChildrenBlocks.results.map((block:any) => {
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
    return customTableChildren;
  };

  const detailEpisodeProps = await Promise.all(
    childrenBlocks.results.map(async (prop: { type: string; paragraph: { rich_text: string | any[]; }; has_children: any; id: any; heading_3: { rich_text: { plain_text: any; }[]; }; }) => {

    let value;
    //Paragraph
    if (prop.type === 'paragraph' && !!(prop.paragraph.rich_text.length)) {
      value = prop.paragraph?.rich_text?.[0]?.plain_text;
    //Table
    } else if (prop.type === "table" && prop.has_children) {
      const e = await getTabeChildrenBlocks(prop.id);
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

  return detailEpisodeProps;
};