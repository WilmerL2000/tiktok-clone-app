import { topicPostsQuery } from './../../../utils/queries';
import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { topic }: any = req.query;

        /* Creates a new user in a database if the user does not already exist.*/
        const videos = await client.fetch(topicPostsQuery(topic));

        res.status(200).json(videos);

    }
}
