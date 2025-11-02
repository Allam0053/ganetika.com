'use client';

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { supabase } from '@/lib/utils'

// Define the type for a post based on your table
type Post = {
  id: number
  created_at: string
  title: string
  content: string
  tag: string
}

async function getPosts() {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  return data as Post[]
}

export default function ArticlesList() {
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    (async () => {
      const postsRes = await getPosts();
      setPosts(postsRes);
    })();
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Articles</h1>
      <Link href="/articles/new" style={{ padding: '10px', background: 'blue', color: 'white', textDecoration: 'none' }}>
        + Create New Post
      </Link>
      
      <div style={{ marginTop: '20px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1p solid gray', padding: '10px', margin: '10px 0' }}>
            <h2>
              <Link href={`/articles/${post.id}`}>{post.title}</Link>
            </h2>
            <p>Tags: {post.tag}</p>
          </div>
        ))}
      </div>
    </div>
  )
}