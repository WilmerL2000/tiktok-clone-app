import { searchPostsQuery } from '@/utils/queries';
import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {

        const { searchTerm } = req.query

        const data = await client.fetch(searchPostsQuery(searchTerm));

        res.status(200).json(data)

    }
}