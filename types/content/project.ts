type ProjectProvider = "github" | "gitlab" | "codepen" | "bitbucket" | "other";

interface Stack {
  primary: string[];
  additional: string[];
}

interface Link {
  type: ProjectProvider;
  url: string;
}

export interface ProjectItemContent {
  name: string;
  description: {
    short: string;
    long: string[];
  };
  stack?: Stack;
  links?: Link[];
}

export interface ProjectContent {
  list: ProjectItemContent[];
}
