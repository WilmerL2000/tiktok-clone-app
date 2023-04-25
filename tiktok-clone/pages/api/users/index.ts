import { allUsersQuery } from '@/utils/queries';
import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {

        const data = await client.fetch(allUsersQuery());
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(204).json([])
        }

    }
}
