import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        const { userId, postId, like } = req.body
        /* To update a document in a Sanity.io
        database. Specifically, it is updating a document with the ID `postId`
        and adding a new like to its `likes` array.
        ---------------------------------------------------------------------------
        It is removing a like from a document with the ID `postId` by unsetting
        the `likes` array element that has a `_ref` property equal to the `userId`. The `unset`
        method is used to remove the specified element from the array, and the `commit` method
        is used to commit the changes to the database.
        */
        const data = like ?
            await client
                .patch(postId).
                setIfMissing({ likes: [] })
                .insert('after', 'likes[-1]', [
                    {
                        _key: uuid(),
                        _ref: userId,
                    }
                ])
                .commit()
            :
            await client
                .patch(postId)
                .unset([`likes[_ref=="${userId}"]`])
                .commit();

        res.status(200).json(data)
    }
}
