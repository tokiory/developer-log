import { z } from "zod";

export const SiteMetaBodySchema = z.object({
  url: z.string().url(),
});

export type SiteMetaRequestBody = z.infer<typeof SiteMetaBodySchema>;

export interface SiteMetaResponse {
  title: string | null;
  description: string | null;
  image: string | null;
  icon: string | null;
}
