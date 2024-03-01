import type { ProjectContent } from "@/types/content";

const projects: ProjectContent = {
  list: [
    {
      name: "Developer Log",
      stack: {
        primary: [
          "typescript",
          "nuxt",
          "sass"
        ],
        additional: [
          "eslint",
          "stylelint",
          "vite",
          "ava",
          "playwright"
        ]
      },
      description: {
        short: "projects.developerLog.short",
        long: [
          "projects.developerLog.long.1",
          "projects.developerLog.long.2",
        ]
      },
      links: [
        {
          type: "github",
          url: "https://github.com/tokiory/developer-log"
        }
      ]
    },
    {
      name: "Neovim Boilerplate",
      stack: {
        primary: [
          "vim",
          "lua",
        ],
        additional: [],
      },
      description: {
        short: "projects.neovimBoilerplate.short",
        long: [
          "projects.neovimBoilerplate.long.1",
        ]
      },
      links: [
        {
          type: "github",
          url: "https://github.com/tokiory/neovim-boilerplate"
        }
      ],
    },
    {
      name: "Intquest",
      stack: {
        primary: [
          "typescript",
          "react",
          "sass"
        ],
        additional: [
          "eslint",
          "vite",
          "playwright",
        ]
      },
      description: {
        short: "projects.interquesty.short",
        long: [
          "projects.interquesty.long.1",
          "projects.interquesty.long.2",
        ]
      },
      links: [
        {
          type: "github",
          url: "https://github.com/tokiory/intquest"
        },
        {
          type: "other",
          url: "https://interquesty.vercel.app"
        }
      ]
    },
    {
      name: "Capybara",
      stack: {
        primary: [
          "rust",
          "tauri",
          "typescript",
          "react",
          "sass"
        ],
        additional: [
          "eslint",
          "stylelint",
          "vite",
          "uvu",
          "playwright"
        ]
      },
      description: {
        short: "projects.capybara.short",
        long: [
          "projects.capybara.long.1",
          "projects.capybara.long.2",
        ]
      }
    }
  ]
};

export default projects;
