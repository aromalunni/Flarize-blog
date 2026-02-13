// src/app/sitemap.ts
import { getAllBlogSlugs, getBlogCategories } from '@/lib/strapi';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://flarize.com';

  // Static pages
  const staticPages = [
    '', '/residential', '/commercial', '/projects', '/blog', '/about', '/contact',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  // Blog posts
  const slugs = await getAllBlogSlugs();
  const blogPages = slugs.map((slug: string) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Category pages
  const categories = await getBlogCategories();
  const catPages = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...catPages];
}
