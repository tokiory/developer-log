import type { PostItemContent } from "#imports";

interface UsePostsArguments {
  limit?: number;
  tagLimit?: number;
  fields?: Array<keyof PostItemContent>
}

export const usePosts = ({ limit = 0, fields, tagLimit } = {} as UsePostsArguments) => {
  return useAsyncData("posts", async () => {

    const query = usePostQuery({ fields });

    // FIX: dir in "where" is temporary, 'cause `queryContent("posts")` doesn't work in production build 👺
    let posts = await query.find();

    if (limit) {
      posts = posts.slice(0, limit);
    }

    if (tagLimit) {
      for (const post of posts) {
        post.tags = post.tags.slice(0, tagLimit);
      }
    }

    return posts;
  });
};
