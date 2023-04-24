import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from './../../../utils/queries';
import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { id }: any = req.query;

        /* These lines of code are fetching data from a GraphQL API using the `client` object and three
        different queries: `singleUserQuery`, `userCreatedPostsQuery`, and `userLikedPostsQuery`. The `id`
        parameter is used to specify which user's data to fetch. The fetched data is then stored in the
        `user`, `userVideos`, and `userLikedVideos` variables respectively. */
        const user = await client.fetch(singleUserQuery(id));
        const userVideos = await client.fetch(userCreatedPostsQuery(id));
        const userLikedVideos = await client.fetch(userLikedPostsQuery(id));

        res.status(200).json({ user: user[0], userVideos, userLikedVideos });

    }
}
