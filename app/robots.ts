import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'OAI-SearchBot',
        allow: '/'
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/'
      },
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    sitemap: 'https://shamsi-dev.vercel.app/sitemap.xml'
  };
}
