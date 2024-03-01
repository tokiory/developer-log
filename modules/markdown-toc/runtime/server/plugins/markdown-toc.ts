import { MarkdownNode } from "@nuxt/content/dist/runtime/types";
import { HookKeys } from "hookable";
import { NitroRuntimeHooks } from "nitropack";
import { visit } from "unist-util-visit";

const headingRegex = new RegExp("^h\\d$");

/**
 * Get toc item from markdown node
 * @param element
 * @param id
 */
const getTableOfContentItem = (element: MarkdownNode, id?: number) => {
  const text = element.children?.at(0)?.type === "text" ? element.children?.at(0)?.value : "";

  if (!text) {
    return;
  }

  if (!id) {
    id = Date.now();
  }

  const title = element.children?.at(0)?.value ?? "";
  const level = Number.parseInt(element.tag?.replaceAll(/\D/g, "") ?? "");

  return {
    title,
    level: Number.isNaN(level) ? 0 : level - 1,
    anchor: element.props?.id,
    id
  };
};

export default defineNitroPlugin((nitroApp) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  nitroApp.hooks.hook("content:file:afterParse" as HookKeys<NitroRuntimeHooks>, (file) => {
    if (file._id.endsWith(".md")) {
      file.toc = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      visit(file.body, (element: any) => headingRegex.test(element.tag), (node, id) => {
        file.toc.push(getTableOfContentItem(node, id));
      });
    }
  });
});
