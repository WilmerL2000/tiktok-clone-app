import { uuid } from 'uuidv4';
import { postDetailQuery } from '@/utils/queries';
import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { id }: any = req.query
        const query = postDetailQuery(id)

        const data = await client.fetch(query)

        res.status(200).json(data)

    } else if (req.method === 'PUT') {
        const { userId, comment } = req.body
        const { id }: any = req.query

        /* This code is performing a `PATCH` request to update a specific document in a database using
        the `client` object. */
        const data =
            await client
                .patch(id).
                setIfMissing({ comments: [] })
                .insert('after', 'comments[-1]', [
                    {
                        comment,
                        _key: uuid(),
                        postedBy: { _type: 'postedBy', _ref: userId },
                    }
                ])
                .commit()

        res.status(200).json(data)

    }

}
