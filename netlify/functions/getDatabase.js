const { Client } = require('@notionhq/client')

exports.handler = async (event) => {
  const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
  })
  const databaseId = '30632bd8c84342758c1dbc07aecd2e6b'
  const payload = JSON.parse(event.body)
  const startCursor = payload.startCursor ? payload.startCursor : undefined

  // FILTERS




  const myPage = await notion.databases.query({
    database_id: databaseId,
    start_cursor: startCursor,
    // filter: {
    //   and: [
    //     {
    //       property: 'Genre',
    //       select: {
    //         equals: 'Horror'
    //       }
    //     }
    //   ]
    // }
  })

  return {
    statusCode: 200,
    body: JSON.stringify(myPage),
  }
}
