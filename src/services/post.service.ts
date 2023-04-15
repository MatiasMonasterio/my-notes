import type { PostId, Post } from "@/types";

import { isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { notion } from "@/clients";
import { postMapper } from "@/mappers";

const n2m = new NotionToMarkdown({ notionClient: notion });

const postService = {
  async getById(postId: PostId): Promise<Post> {
    const page = await notion.pages.retrieve({ page_id: postId });

    if (!isFullPage(page)) throw new Error("Invalid full page");
    if (page.parent.type !== "database_id") throw new Error("Invalida db");

    const databases = await notion.databases.retrieve({
      database_id: page.parent.database_id,
    });

    const mdblocks = await n2m.pageToMarkdown(postId);
    const mdString = n2m.toMarkdownString(mdblocks);

    return postMapper(page, databases, mdString);
  },
};

export default postService;
