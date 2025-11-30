import { cache } from 'react';
import 'server-only'

import { getFileBySlug, getRecommendations } from '@/lib/mdx.server'

export const getItem = cache(async (slug: string[]) => {
  const post = await getFileBySlug('blog', typeof slug === 'string' ? slug : slug.join('/'));
  const recommendations = await getRecommendations(typeof slug === 'string' ? slug : slug.join('/'));

  return {
    props: { ...post, recommendations },
  };
});
 
export const preload = (slug: string[]) => {
  void getItem(slug);
}