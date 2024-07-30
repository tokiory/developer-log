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
      name: "Don't Do",
      stack: {
        primary: [
          "typescript",
          "react",
          "redux",
          "bun",
          "sass"
        ],
        additional: [
          "eslint",
          "stylelint",
          "vite",
          "uvu",
        ]
      },
      links: [
        {
          type: "github",
          url: "https://github.com/tokiory/dontdo"
        },
        {
          type: "other",
          url: "https://dontdo.vercel.app"
        }
      ],
      description: {
        short: "projects.dontdo.short",
        long: [
          "projects.dontdo.long.1",
          "projects.dontdo.long.2",
        ]
      }
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
    },
    {
      name: "Term Portfolio",
      links: [
        {
          type: "github",
          url: "https://github.com/tokiory/term-portfolio"
        },
        {
          type: "other",
          url: "https://tokiory.vercel.app/"
        }
      ],
      stack: {
        primary: [
          "vue",
          "typescript"
        ],
        additional: [
          "eslint",
          "vite",
        ]
      },
      description: {
        short: "projects.termprofile.short",
        long: [
          "projects.termprofile.long.1",
        ]
      }
    },
    {
      name: "Gosha",
      links: [
        {
          type: "github",
          url: "https://github.com/tokiory/gosha"
        },
      ],
      stack: {
        primary: [
          "go"
        ],
        additional: []
      },
      description: {
        short: "projects.gosha.short",
        long: [
          "projects.gosha.long.1",
        ]
      }
    },
    {
      name: "Zed Gruvbox Material Theme",
      links: [
        {
          type: "github",
          url: "https://github.com/tokiory/zed-gruvbox-material"
        },
      ],
      stack: {
        primary: [
          "go"
        ],
        additional: []
      },
      description: {
        short: "projects.zedgruvbox.short",
        long: [
          "projects.zedgruvbox.long.1",
        ]
      }
    }
  ]
};

export default projects;
