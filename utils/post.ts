export const getPostSlug = (url: URL): string => {
  let slug = url.pathname;

  if (slug.endsWith("/")) {
    slug = slug.slice(0, - 1);
  }

  const lastSlashIndex = slug.lastIndexOf("/");
  slug = slug.slice(lastSlashIndex + 1);

  return `/posts/${slug}`;
};
