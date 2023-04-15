import type {
  GetPageResponse,
  GetDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Post } from "@/types";

import { isFullDatabase, isFullPage } from "@notionhq/client";

export default function postMapper(
  page: GetPageResponse,
  database: GetDatabaseResponse,
  markdown: string
): Post {
  if (!isFullPage(page)) throw new Error("Invalid full page");
  if (!isFullDatabase(database)) throw new Error("Invalid full db");

  let curso = null;
  let title = null;

  const databaseId = database.id;
  const databaseTitle = database.title[0].plain_text;
  const id = page.id;
  const createdTime = new Date(page.created_time);

  if (page.properties.Curso.type === "select") {
    curso = page.properties.Curso.select?.name || "";
  }

  if (page.properties.Name.type === "title") {
    title = page.properties.Name.title[0].plain_text;
  }

  if (
    !id ||
    !title ||
    !curso ||
    !createdTime ||
    !databaseTitle ||
    !databaseId
  ) {
    throw new Error("error");
  }

  return {
    id,
    title,
    curso,
    createdTime,
    markdown,
    database: {
      id: databaseId,
      title: databaseTitle,
    },
  };
}
