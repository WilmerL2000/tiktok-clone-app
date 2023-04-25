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

        /* Is fetching data from the database using the `client` instance and the `postDetailQuery` function, 
        The `postDetailQuery` function likely constructs a GROQ query that
        retrieves the details of a specific post based on its `id`. The fetched data is then stored
        in the `data` variable */
        const data = await client.fetch(postDetailQuery(id))

        res.status(200).json(data)

    } else if (req.method === 'PUT') {
        const { userId, comment } = req.body
        const { id }: any = req.query


        /* This code is performing a `PATCH` request to update a specific document
        It sets the `comments` field to an empty array if it is missing, then inserts a
        new comment object at the end of the `comments` array. The comment object contains the `comment`
        text, a unique `_key` generated using the `uuid` function, and a `postedBy` object that references
        the `userId`. Finally, the changes are committed to the database and the updated data is returned
        as the response. */
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
