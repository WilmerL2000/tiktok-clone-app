import { client } from '@/utils/client'
import { allPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        /* This function returns a GraphQL query string that retrieves all posts 
        from the connected database. The `query` constant is then used to fetch
        the data from the database using the `client.fetch` method. */
        const query = allPostsQuery();

        //Fetching data
        const data = await client.fetch(query);
        //Response
        res.status(200).json(data);

    } else if (req.method === 'POST') {

        const doc = req.body;

        /* is creating a new document in the connected database using the data
        passed in the `doc` variable. Then send a success message */
        client.create(doc).then(() => {
            res.status(200).json('Video created!');
        });
    }
}
