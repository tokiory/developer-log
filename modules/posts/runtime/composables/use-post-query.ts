import type { PostItemContent } from "#imports";

const DEFAULT_FIELDS: Array<keyof PostItemContent> = [
  "_id",
  "_path",
  "title",
  "date",
  "tags",
  "description",
  "keywords"
];

interface UsePostQuery {
  fields?: Array<keyof PostItemContent>
}

export const usePostQuery = ({ fields = DEFAULT_FIELDS } = {} as UsePostQuery) => {
  return queryContent<PostItemContent>()
    .where({
      _draft: { $ne: true },
      _dir: { $eq: "posts" },
    })
    .sort({ date: -1 })
    .only(fields);
};
