import type { PostItemContent } from "@/types/content";

import { serverQueryContent } from "#content/server";
import rss from "rss";

export default defineEventHandler(async (event) => {
  const feedBuilder = new rss({
    title: "Developer Log",
    site_url: "https://developer-log.com",
    feed_url: "https://developer-log.com/rss.xml",
    language: "ru",
    copyright: "Copyright 2024 Developer Log",
    webMaster: "Daniil Shilo",
    managingEditor: "Daniil Shilo",
    ttl: 60,
  });

  const fields: Array<keyof PostItemContent> = [
    "_id",
    "_path",
    "title",
    "date",
    "tags",
    "description",
    "keywords"
  ];

  const posts = await serverQueryContent(event)
    .where({
      _draft: { $ne: true },
      _dir: { $eq: "posts" },
    })
    .sort({ date: -1 })
    .only(fields)
    .find();

  for (const post of posts) {
    feedBuilder.item({
      title: post.title || "",
      url: post._path || "",
      date: post.date,
      description: post.description,
      categories: post.tags,
    });
  }

  const feedRaw = feedBuilder.xml({ indent: true });
  event.node.res.setHeader("content-type", "text/xml");
  event.node.res.end(feedRaw);
});
