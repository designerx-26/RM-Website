import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Every public page. Add new routes here so search engines find them.
const routes = ["/", "/about", "/the-car", "/team", "/sponsors", "/join", "/donate", "/gallery", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.meta.url}${route === "/" ? "" : route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
