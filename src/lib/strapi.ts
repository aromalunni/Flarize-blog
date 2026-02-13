// src/lib/strapi.ts

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// ============================================================
// TYPES
// ============================================================
export interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  subtitle?: string;
  heroImage?: StrapiImage;
  category?: BlogCategory;
  author?: Author;
  publishedDate: string;
  updatedDate?: string;
  readTime?: number;
  isFeatured: boolean;
  postType?: string;
  urgencyStrip?: string;
  body: DynamicBlock[];
  seo?: SEO;
  relatedPosts?: BlogPost[];
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  order?: number;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  photo?: StrapiImage;
  role?: string;
  bio?: string;
  credentialBadge?: string;
  credentialColor?: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  customerName: string;
  systemSize?: string;
  location?: string;
  district?: string;
  billReduction?: string;
  installDate?: string;
  photo?: StrapiImage;
  rating?: number;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: StrapiImage;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: any;
}

export interface DynamicBlock {
  __component: string;
  id: number;
  [key: string]: any;
}

// ============================================================
// FETCH HELPER
// ============================================================
async function fetchStrapi<T = any>(path: string, revalidate = 60): Promise<T | null> {
  const url = `${STRAPI_URL}/api${path}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      next: { revalidate },
    });

    if (!res.ok) {
      console.error(`Strapi ${res.status}: ${url}`);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error(`Strapi fetch error: ${url}`, err);
    return null;
  }
}

// ============================================================
// POPULATE QUERIES (Strapi v5 compatible — uses qs-style encoding)
// ============================================================

// For listing pages: just top-level relations
const LIST_POPULATE = 'populate[heroImage][fields][0]=url&populate[heroImage][fields][1]=alternativeText&populate[heroImage][fields][2]=width&populate[heroImage][fields][3]=height&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[category][fields][2]=color&populate[category][fields][3]=icon&populate[author][populate][photo][fields][0]=url&populate[author][fields][0]=name&populate[author][fields][1]=slug&populate[author][fields][2]=credentialBadge';

// For single post: deep populate via Strapi middleware (see blog-post middleware)
// We use populate=deep which our custom middleware handles
const POST_POPULATE = 'populate=deep';

// ============================================================
// API METHODS — with mock data fallback when Strapi is offline
// ============================================================

import { MOCK_POSTS, MOCK_CATEGORIES } from './mock-data';

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const data = await fetchStrapi(
    `/blog-posts?filters[slug][$eq]=${slug}&${POST_POPULATE}`
  );
  const post = data?.data?.[0];
  if (post) return post;
  // Fallback to mock data
  return MOCK_POSTS.find(p => p.slug === slug) || null;
}

export async function getAllBlogPosts(page = 1, pageSize = 12): Promise<{ posts: BlogPost[]; pagination: any }> {
  const data = await fetchStrapi(
    `/blog-posts?${LIST_POPULATE}&sort=publishedDate:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
  if (data?.data?.length) {
    return {
      posts: data.data,
      pagination: data.meta?.pagination || { page: 1, pageSize: 12, pageCount: 1, total: 0 },
    };
  }
  // Fallback to mock data
  return {
    posts: MOCK_POSTS,
    pagination: { page: 1, pageSize: 12, pageCount: 1, total: MOCK_POSTS.length },
  };
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const data = await fetchStrapi(
    `/blog-posts?filters[isFeatured][$eq]=true&${LIST_POPULATE}&sort=publishedDate:desc&pagination[pageSize]=3`
  );
  if (data?.data?.length) return data.data;
  // Fallback
  return MOCK_POSTS.filter(p => p.isFeatured).slice(0, 3);
}

export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const data = await fetchStrapi(
    `/blog-posts?filters[category][slug][$eq]=${categorySlug}&${LIST_POPULATE}&sort=publishedDate:desc`
  );
  if (data?.data?.length) return data.data;
  // Fallback
  return MOCK_POSTS.filter(p => p.category?.slug === categorySlug);
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const data = await fetchStrapi(`/blog-categories?sort=order:asc`);
  if (data?.data?.length) return data.data;
  // Fallback
  return MOCK_CATEGORIES;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const data = await fetchStrapi(
    `/blog-posts?fields[0]=slug&pagination[pageSize]=200`
  );
  if (data?.data?.length) return data.data.map((p: any) => p.slug);
  // Fallback
  return MOCK_POSTS.map(p => p.slug);
}

// ============================================================
// HOMEPAGE
// ============================================================

export async function getHomepage(): Promise<any | null> {
  const STRAPI = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  try {
    const basicResp = await fetch(STRAPI + '/api/homepage?populate=*', { next: { revalidate: 60 } });
    if (!basicResp.ok) return null;
    const basic = await basicResp.json();
    if (!basic?.data) return null;
    const heroResp = await fetch(STRAPI + '/api/homepage?populate%5Bhero%5D%5Bpopulate%5D=*', { next: { revalidate: 60 } });
    if (heroResp.ok) {
      const heroData = await heroResp.json();
      if (heroData?.data?.hero) basic.data.hero = heroData.data.hero;
    }
    return basic.data;
  } catch (e) { return null; }
}

// ============================================================
// HELPERS
// ============================================================

export function getStrapiMedia(url?: string | null): string {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}