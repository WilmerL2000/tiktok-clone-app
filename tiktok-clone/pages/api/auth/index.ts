import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const user = req.body;
        /* Creates a new user in a database if the user does not already exist.*/
        client.createIfNotExists(user).then(() => res.status(200).json('Login success'));

    }
}
