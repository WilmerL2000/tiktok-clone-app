import { topicPostsQuery } from './../../../utils/queries';
import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { topic }: any = req.query;

        /* Is fetching data from a GraphQL API using the `client` object and the `topicPostsQuery` query. 
        The `topic` variable is passed as an argument to the query to retrieve data related to a specific topic. */
        const videos = await client.fetch(topicPostsQuery(topic));

        res.status(200).json(videos);
    }
}
