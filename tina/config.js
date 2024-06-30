import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch: "main",

  // Get this from tina.io
  clientId: "cab34a91-4df1-4f84-89ae-71dcce7af0c6",
  // Get this from tina.io
  token: "793aed08c93832615306cf07260fd12b855b12b4",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    search: {
      tina: {
        indexerToken: "95d20762443e60dba61d256e2353a1b8845bfb10",
        stopwordLanguages: ["eng"],
      },
      indexBatchSize: 100,
      maxSearchIndexFieldLength: 100,
    },

    collections: [
      {
        label: "Page Blocks",
        name: "pageBlocks",
        path: "content/pages",
        format: "md",
        fields: [
          {
            name: "pagename",
            label: "Page Name",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "blocks",
            label: "Blocks",
            type: "object",
            list: true,
            templates: [
              {
                label: "Welcome Hero",
                name: "welcomehero",
                fields: [
                  {
                    name: "messages",
                    type: "rich-text",
                  },
                  {
                    name: "links",
                    label: "Links",
                    type: "object",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "link",
                      },
                      {
                        type: "string",
                        name: "label",
                      },
                      {
                        type: "string",
                        name: "style",
                        options: ["simple", "buttons"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
