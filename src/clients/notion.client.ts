import { Client } from "@notionhq/client";
import { notionConfig } from "@/config";

const notionClient = new Client({ auth: notionConfig.token });

export default notionClient;
