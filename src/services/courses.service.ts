import type {
  GetPageResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { notion } from "@/clients";
import { bootcampCourseMapper } from "@/mappers";

const n2m = new NotionToMarkdown({ notionClient: notion });
const coursesDatabaseId = "14584e33-95ca-4383-a8e2-861f5eb56df6";

interface PostMetadata {
  id: string;
  title: string;
  curso: string;
  createdTime: Date;
  database: {
    id: string;
    title: string;
  };
}

interface Post extends PostMetadata {
  markdown: string;
}

const postMapper = (
  page: GetPageResponse,
  databases: QueryDatabaseResponse,
  markdown: string
): Post => {
  const database = databases.results[0];
  if (!isFullPage(page)) throw new Error("Invalid full page");

  let databaseTitle = null;
  let curso = null;
  let title = null;

  const databaseId = database.id;
  const id = page.id;
  const createdTime = new Date(page.created_time);

  if ("properties" in database && database.properties.Name.type === "title") {
    databaseTitle = database.properties.Name.title[0].plain_text;
  }

  if (page.properties.Curso.type === "select") {
    curso = page.properties.Curso.select?.name || "";
  }

  if (page.properties.Name.type === "title") {
    title = page.properties.Name.title[0].plain_text;
  }

  if (!id || !title || !curso || !createdTime || !databaseTitle || databaseId) {
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
};

const coursesServices = {
  getPost: async (pageId: string): Promise<Post> => {
    const page = await notion.pages.retrieve({ page_id: pageId });

    if (!isFullPage(page)) throw new Error("Invalid full page");
    if (page.parent.type !== "database_id") throw new Error("Invalida db");

    const databases = await notion.databases.query({
      database_id: page.parent.database_id,
      page_size: 1,
      filter_properties: ["title"],
    });

    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);

    return postMapper(page, databases, mdString);
  },

  getModules: async (databaseId: string) => {
    const { results } = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: "index", direction: "ascending" }],
    });

    return bootcampCourseMapper.mapperList(results);
  },

  getAllPosts: async () => {
    const { results } = await notion.databases.query({
      database_id: "3cab6207b819494bbbc8e85e3f1c2ce8",
      sorts: [{ property: "index", direction: "ascending" }],
    });

    const posts: { id: string; title: string; database: { id: string } }[] = [];

    for (const result of results) {
      if (!isFullPage(result)) continue;

      let postTitle = "";

      if (result.properties.Name.type === "title") {
        postTitle = result.properties.Name.title[0].plain_text;
      }

      posts.push({
        id: result.id,
        title: postTitle,
        database: { id: "3cab6207b819494bbbc8e85e3f1c2ce8" },
      });
    }

    return posts;
  },

  getCourses: async () => {
    const { results } = await notion.databases.query({
      database_id: coursesDatabaseId,
    });

    const courses: { id: string; title: string }[] = [];

    for (const result of results) {
      if (!isFullPage(result)) continue;

      let postTitle = "";

      if (result.properties.Name.type === "title") {
        postTitle = result.properties.Name.title[0].plain_text;
      }

      return {
        id: result.id,
        title: postTitle,
      };
    }

    return courses;
  },
};

export default coursesServices;
