const { Client } = require('@notionhq/client')

exports.handler = async () => {
  const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
  })
  const databaseId = '30632bd8c84342758c1dbc07aecd2e6b'
  const myPage = await notion.databases.retrieve({
    database_id: databaseId,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  }
}
