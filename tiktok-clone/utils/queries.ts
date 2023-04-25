/**
 * This function returns a query to retrieve all posts with their associated data.
 * @returns The function `allPostsQuery` returns a string that represents a query to retrieve all posts
 * from a database. The query includes fields such as post ID, caption, video URL, user ID, user name,
 * user image, likes, and comments. The posts are ordered by creation date in descending order.
 */
export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

/**
 * This function returns a query string to fetch details of a post with a given ID.
 * @param {string | string[]} postId - The postId parameter is a string or an array of strings that
 * represents the unique identifier(s) of the post(s) that we want to retrieve details for.
 * @returns The function `postDetailQuery` returns a string that represents a query in the GROQ
 * language. The query is used to retrieve details of a post with a specific ID, including the post ID,
 * caption, video URL, user ID, user name, user image, likes, and comments.
 */
export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;
  return query;
};

/**
 * The function returns a search query for posts based on a given search term.
 * @param {string | string[]} searchTerm - The search term that the user is looking for in the posts.
 * It can be a string or an array of strings.
 * @returns The function `searchPostsQuery` returns a string that represents a GROQ query for searching
 * posts based on a given search term. The query returns an array of objects that contain information
 * about the posts, including their ID, caption, video, user ID, user who posted the post, likes, and
 * comments. The query also includes filtering based on the search term, which can match either the
 * post
 */
export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;
  return query;
};

/**
 * This TypeScript function returns a query string to retrieve a single user based on their ID.
 * @param {string | string[]} userId - The `userId` parameter is a string or an array of strings that
 * represents the unique identifier(s) of the user(s) being queried. The function returns a query
 * string that can be used to retrieve the user(s) from a database.
 * @returns The function `singleUserQuery` returns a string that represents a query to retrieve a
 * single user from a database based on their ID. The query is constructed using the `userId` parameter
 * passed to the function.
 */
export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

/**
 * This function returns a query to retrieve all users from a database.
 * @returns The `allUsersQuery` function returns a string that represents a query to retrieve all
 * documents of type "user" from a database.
 */
export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};

/**
 * The function returns a query string to retrieve posts created by a specific user, along with their
 * associated video, user information, likes, and comments.
 * @param {string | string[]} userId - The userId parameter is a string or an array of strings that
 * represents the unique identifier(s) of the user(s) whose created posts are being queried.
 * @returns The function `userCreatedPostsQuery` returns a string that represents a GROQ query. The
 * query is used to retrieve posts created by a specific user, identified by their `userId`. The query
 * includes fields such as `_id`, `caption`, `video`, `userId`, `postedBy`, `likes`, and `comments`.
 * The results are ordered by creation date in descending order.
 */
export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

/**
 * The function returns a query string that retrieves posts liked by a specific user, along with their
 * associated comments and user information.
 * @param {string | string[]} userId - The userId parameter is a string or an array of strings that
 * represents the user ID(s) for which we want to retrieve the liked posts.
 * @returns The function `userLikedPostsQuery` returns a string that represents a GROQ query. The query
 * is used to retrieve posts that have been liked by a specific user, sorted by creation date in
 * descending order. The query includes fields such as post ID, caption, video URL, user ID, postedBy
 * user details, likes, and comments with their respective details.
 */
export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

/**
 * The function returns a query string for retrieving posts related to a given topic, including their
 * captions, videos, user IDs, likes, and comments.
 * @param {string | string[]} topic - The topic parameter is a string or an array of strings that
 * represents the topic(s) of the posts to be queried. The query will return all posts that have a
 * topic that matches the provided string or any of the strings in the array.
 * @returns The function `topicPostsQuery` returns a string that represents a GROQ query. The query is
 * used to retrieve data from a Sanity.io database and it selects all posts that have a matching topic.
 * The selected fields include the post ID, caption, video asset ID and URL, user ID, postedBy user ID,
 * username, and image, likes, and comments with their respective fields.
 */
export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};
