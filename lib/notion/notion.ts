const { Client } = require("@notionhq/client")

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

//データベース一覧から各記事の情報とる関数
export const getAllEpisodes = async () => {

  //インスタンス作成
  const mynotion = notion;
  
  //インスタンスをもとにAPIを取得してきて、responceにいれる
  const response = await mynotion.databases.query({
    database_id: process.env.DATABASE_ID,
    sorts: [
      {
        property: 'created',
        direction: 'descending',
      },
      //publish追加
    ]
  })
  
  //Responseから各記事の必要な情報だけを取り出し配列に入れ直す
  const allEpisodesProperties = response.results.map((post:any) => {
    const id = post.id;
    const number = post.properties.number.number
    const title = post.properties.title.title[0].plain_text;
    const date = post.properties.date.date.start;
    const youtube_id = post.properties.youtube_id.rich_text[0].plain_text;
    const publish = post.properties.publish.checkbox;
    const slug = post.properties.slug.rich_text[0].plain_text;
    return { id,number,title,date,youtube_id,publish,slug };
  });
  
  return allEpisodesProperties;
};

//記事IDから内容のブロックを取り出す
export const getEpisodeBlocks = async (id: any)  => {
  const response = await notion.blocks.children.list({
      block_id: id,
  });
  return response.results;
}

//記事IDからページ本文を取得する
export const getEpisodeParagraph = async (id: any)  => {
  const response = await getEpisodeBlocks(id)
  
  //空行を削除
  const paragraphs = response.filter((prop: { type: any; paragraph: { rich_text: any }; })=> {
      if(prop.type === 'paragraph' && !!(prop.paragraph.rich_text.length) ){
          return true;
      }
  });
  
  //results[0]で直接指定してしまっている→一時的な処置として?オプショナルチェイニングで判定する
  // return response.results[0]?.paragraph.rich_text[0]?.plain_text;

  return paragraphs[0].paragraph.rich_text[0].plain_text;
}