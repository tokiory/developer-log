import type { PostDateGroups, PostDateKey, PostItemContent } from "#imports";

interface UsePostsArguments {
  locale?: string;
  limit?: number;
}

const groupPostsByDate = (locale: string, posts: PostItemContent[]): PostDateGroups => {
  const groups: PostDateGroups = new Map();

  for (const post of posts) {
    const date = new Date(post.date);
    const dateKey = date.toLocaleDateString(locale, {
      month: "short",
      year: "numeric",
    }) as PostDateKey;

    if (groups.has(dateKey)) {
      groups.set(dateKey,
        [ ...groups.get(dateKey)!, post ]
      );
    } else {
      groups.set(dateKey, [ post ]);
    }
  }


  return groups;
};

export const useGroupPosts = ({ limit = -1, locale = "ru" } = {} as UsePostsArguments) => {
  return useAsyncData(async () => {
    const query = usePostQuery();

    // FIX: dir in "where" is temporary, 'cause `queryContent("posts")` doesn't work in production build 👺
    let posts = await query.find();

    // TODO: Maybe in the near future we'll separate all "if" statements
    //       in use-posts and this composable to another composable,
    //       that will be named something like usePostProcessing
    if (limit) {
      posts = posts.slice(0, limit);
    }

    return groupPostsByDate(locale, posts);
  });
};
