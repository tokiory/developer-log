interface SocialItem {
  url: string;
  icon: string;
  name: string;
}

interface SocialLinks {
  telegram: string;
  codepen: string;
  github: string;
}

export interface SocialContent extends SocialLinks {
  list: SocialItem[];
}
