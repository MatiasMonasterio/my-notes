export type PostSlug = string;
export type PostMarkdown = string;
export type PostTitle = string;
export type PostId = string;
export type CursoTitle = string;
export type PostCreatedTime = Date;
export type DatabaseId = string;
export type DatabaseTitle = string;

export interface PostMetadata {
  id: PostId;
  title: PostTitle;
  curso: CursoTitle;
  createdTime: PostCreatedTime;
  database: {
    id: DatabaseId;
    title: DatabaseTitle;
  };
}

export interface Post extends PostMetadata {
  markdown: PostMarkdown;
}
