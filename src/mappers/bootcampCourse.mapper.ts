import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { isFullPage } from "@notionhq/client";

interface BootcampModule {
  id: string;
  title: string;
  index: string;
  name: string;
  moduleName: string;
}

export interface Bootcamp {
  [bootcampTitle: string]: {
    [moduleTitle: string]: BootcampModule[];
  };
}

export default class BootcampCourseMapper {
  public static mapperList(
    pages: (PageObjectResponse | PartialPageObjectResponse)[]
  ) {
    const section: Bootcamp = {};

    for (const page of pages) {
      if (!isFullPage(page)) continue;

      const bootcamp = this.mapperItem(page);

      if (Object.keys(section).includes(bootcamp.name)) {
        if (Object.keys(section[bootcamp.name]).includes(bootcamp.moduleName)) {
          section[bootcamp.name][bootcamp.moduleName].push(bootcamp);
        } else {
          section[bootcamp.name][bootcamp.moduleName] = [bootcamp];
        }
      } else {
        section[bootcamp.name] = { [bootcamp.moduleName]: [bootcamp] };
      }
    }

    return section;
  }

  public static mapperItem(page: PageObjectResponse) {
    let sectionName = "";
    let moduleName = "";
    let moduleTitle = "";
    let moduleIndex = "";

    if (page.properties.Curso.type === "select") {
      sectionName = page.properties.Curso.select?.name || "";
    }

    if (page.properties.modulo_name.type === "formula") {
      if (page.properties.modulo_name.formula.type === "string") {
        moduleName = page.properties.modulo_name.formula.string || "";
      }
    }

    if (page.properties.Name.type === "title") {
      moduleTitle = page.properties.Name.title[0].plain_text;
    }

    if (page.properties.index.type === "rich_text") {
      moduleIndex = page.properties.index.rich_text[0].plain_text;
    }

    const moduleItem: BootcampModule = {
      id: page.id,
      title: moduleTitle,
      index: moduleIndex,
      name: sectionName,
      moduleName: moduleName,
    };

    return moduleItem;
  }
}
