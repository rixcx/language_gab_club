const { Client } = require("@notionhq/client")

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})