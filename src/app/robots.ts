import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

export const dynamic = "force-static";

/** Search engines and AI crawlers are all welcome: the site is public marketing content. */
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "ClaudeBot", "Claude-Web", "anthropic-ai", "Applebot-Extended", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(""),
  };
}
