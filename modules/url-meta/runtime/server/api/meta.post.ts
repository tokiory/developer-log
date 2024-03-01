import { SiteMetaBodySchema, SiteMetaRequestBody, SiteMetaResponse } from "@/types/api/meta";

import axios, { AxiosError } from "axios";
import { JSDOM } from "jsdom";


const ruleset = {
  title: [
    { selector: "title", callback: (title: Element) => title.textContent },
    { selector: "meta[property=\"og:title\"]", callback: (meta: Element) => meta.getAttribute("content") },
    { selector: "meta[name=\"twitter:title\"]", callback: (meta: Element) => meta.getAttribute("content") },
    { selector: "meta[property=\"twitter:title\"]", callback: (meta: Element) => meta.getAttribute("content") },
  ],

  description: [
    { selector: "meta[property=\"og:description\"]", callback: (meta: Element) => meta.getAttribute("content") },
    { selector: "meta[name=\"description\" i]", callback: (meta: Element) => meta.getAttribute("content") },
  ],

  icon: [
    { selector: "link[rel=\"apple-touch-icon\"]", callback: (link: Element) => link.getAttribute("href") },
    { selector: "link[rel=\"apple-touch-icon-precomposed\"]", callback: (link: Element) => link.getAttribute("href") },
    { selector: "link[rel=\"icon\"]", callback: (link: Element) => link.getAttribute("href") },
    { selector: "link[rel=\"shortcut icon\"]", callback: (link: Element) => link.getAttribute("href") }
  ],

  image: [
    { selector: "meta[property=\"og:image:secure_url\"]", callback: (meta: Element) => meta.getAttribute("content") },
    { selector: "meta[property=\"og:image:url\"]", callback: (meta: Element) => meta.getAttribute("content") },
    { selector: "meta[property=\"og:image\"]", callback:  (meta: Element) => meta.getAttribute("content") },
    { selector: "meta[name=\"twitter:image\"]", callback:  (meta: Element) => meta.getAttribute("content") },
    { selector: "meta[property=\"twitter:image\"]", callback: (meta: Element) => meta.getAttribute("content") },
    { selector: "meta[name=\"thumbnail\"]", callback: (meta: Element) => meta.getAttribute("content") },
    { selector: "img", callback: (img: Element) => img.getAttribute("src") }
  ],
};

export default defineEventHandler(async (event) => {
  let body: SiteMetaRequestBody;

  try {
    const rawBody = await readBody<SiteMetaRequestBody>(event);
    body = SiteMetaBodySchema.parse(rawBody);
  } catch {
    setResponseStatus(event, 400);
    return send(event);
  }

  let rawHtml = "";
  try {
    const { data, status } = await axios.get<string>(body.url,
      {
        timeout: 3000
      }
    );

    if (status !== 200) {
      setResponseStatus(event, status);
      return send(event);
    }

    rawHtml = data;
  } catch (error) {
    setResponseStatus(event, (error as AxiosError).response?.status ?? 500);
    return send(event);
  }

  const documentNode = new JSDOM(rawHtml)
    .window
    .document;

  const result: SiteMetaResponse = {
    icon: null,
    image: null,
    description: null,
    title: null,
  };

  try {
    // Get every rule item
    for (const key in ruleset) {
      for (const rule of ruleset[key as keyof typeof ruleset]) {
        const node = documentNode.querySelector(rule.selector);

        if (node === null) {
          continue;
        }

        result[key as keyof typeof ruleset] = rule.callback(node);
        break;
      }
    }

    // Normalize all links
    // eslint-disable-next-line compat/compat
    const absoluteUrl = new URL(body.url);
    let key: keyof typeof result;
    for (key in result) {
      if (result[key] && result[key]?.startsWith("/")) {
        result[key] = absoluteUrl.origin + result[key];
      }
    }

    // Check favicon
    if (!result.icon) {
      result.icon = absoluteUrl.origin + "/favicon.ico";
    }

    // Check description
    if (!result.description) {
      const firstParagraph = documentNode.querySelector("p");
      result.description = firstParagraph?.textContent ?? null;
    }
  } catch(error) {
    console.error(error);
  }

  return send(event, JSON.stringify(result), "application/json");
});
