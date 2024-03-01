import type { UseSeoMetaInput } from "@unhead/schema";
import defu from "defu";

interface OpenGraphArguments {
  url: URL;
  title: string;
  description: string;
  author: string;
  image: {
    title: string;
    description: string;
  }
}

export default function({
  title,
  description,
  author,
  url,
  image,
}: Partial<OpenGraphArguments> & Pick<OpenGraphArguments, "url">): Partial<UseSeoMetaInput> {

  const runtimeConfig = useRuntimeConfig();
  const information = defu({
    title,
    description,
    url,
    image,
    author,
  }, runtimeConfig.public.openGraph);

  const imageQuery = encodeURI(`title=${information.image.title}&description=${information.image.description}`);
  const imageSource = `${information.url.origin}/api/og?${imageQuery}`;

  return {
    title: information.title,
    description: information.description,
    author: information.author,
    ogUrl: information.url,

    // OG
    ogTitle: information.title,
    ogDescription: information.description,
    ogImage: imageSource,
    ogImageAlt: information.title,

    // Twitter
    twitterTitle: information.title,
    twitterDescription: information.description,
    twitterImage: imageSource,
    twitterImageAlt: information.title,
  };
}
