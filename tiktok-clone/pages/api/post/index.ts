import { client } from '@/utils/client'
import { allPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {


        /* Is fetching data from the connected database using the `allPostsQuery` query.*/
        const data = await client.fetch(allPostsQuery());

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
