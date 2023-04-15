import type { GetStaticProps, GetStaticPaths } from "next";
import type { Bootcamp } from "@/mappers/bootcampCourse.mapper";

import { PostLink } from "@/components";
import { coursesServices, bootcampService } from "@/services";

interface Props {
  modules: Bootcamp;
}

export default function Course({ modules }: Props) {
  return (
    <main className="max-w-4xl px-4 mx-auto">
      {Object.keys(modules).map((section) => (
        <div key={section}>
          <h2 className="mt-12 mb-6 text-xl font-bold">{section}</h2>

          {Object.keys(modules[section]).map((moduleValue) => (
            <div key={moduleValue} className="mb-6">
              <h3 className="mb-4 font-medium text-md">{moduleValue}</h3>

              <div className="grid gap-y-1 gap-x-4 md:grid-cols-3 sm:grid-cols-2">
                {modules[section][moduleValue].map((item) => (
                  <PostLink
                    post={item}
                    key={item.id}
                    href={`/courses/fc7b61e5-bf00-46c3-8d6e-870226f8e6a8/${item.id}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const bootcamps = await bootcampService.getAll();
  return {
    paths: bootcamps.map((bootcamp) => ({
      params: { slug: bootcamp.id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug || typeof params.slug !== "string") {
    throw new Error("Error al obtener slug");
  }

  const modules = await coursesServices.getModules(params.slug);

  return { props: { modules } };
};
