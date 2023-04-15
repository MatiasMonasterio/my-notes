import type { GetStaticProps, GetStaticPaths } from "next";
import type { Post, PostBreadcrumbItem } from "@/types";

import Head from "next/head";
import { useRef } from "react";
import { BiCalendar } from "react-icons/bi";
import { MarkdownRender, PostBreadcrumb } from "@/components";
import { postService, coursesServices } from "@/services";
import filter from "@/filters";

interface Props {
  post: Post;
}

export default function CoursePost({ post }: Props) {
  const postBreadcrumbItems = useRef<PostBreadcrumbItem[]>([
    { title: post.database.title, href: `/courses/${post.database.id}` },
    { title: post.curso, href: `/courses/${post.database.id}#${post.curso}` },
  ]);

  return (
    <>
      <Head>
        <title>
          {post.title} | {post.curso}
        </title>
      </Head>

      <main className="max-w-3xl px-4 mx-auto ">
        <div className="flex flex-col justify-between mb-2 md:flex-row">
          <PostBreadcrumb items={postBreadcrumbItems.current} />

          <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
            <BiCalendar />
            {filter.date(post.createdTime)}
          </div>
        </div>

        <MarkdownRender markdown={post.markdown} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<{
  post: string;
  slug: string;
}> = async () => {
  const posts = await coursesServices.getAllPosts();
  const paths = posts.map((item) => ({
    params: { slug: item.database.id, post: item.id },
  }));

  return { paths: paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.post || typeof params.post != "string") {
    throw new Error("Error al obtener post slug");
  }

  const post = await postService.getById(params.post);

  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
  };
};
