import Link from 'next/link'

// import DeleteButton from '@/components/DeleteButton' // We will create this next
import { supabase } from '@/lib/utils'

import DeleteButton from '@/app/components/DeleteButton'

type Post = {
  id: number
  created_at: string
  title: string
  content: string
  tag: string
}

async function getPost(id: string) {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('id', id)
    .single() // We only expect one result

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }
  return data as Post
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    return <p>Post not found.</p>
  }

  return (
    <div style={{ padding: '20px' }}>
      <Link href="/articles">&larr; Back to Articles</Link>
      <hr style={{ margin: '20px 0' }} />
      <h1>{post.title}</h1>
      <p><strong>Tags:</strong> {post.tag}</p>
      <div style={{ margin: '20px 0' }}>
        {post.content}
      </div>
      
      {/* Actions */}
      <Link 
        href={`/articles/${post.id}/edit`}
        style={{ padding: '10px', background: 'green', color: 'white', textDecoration: 'none' }}
      >
        Edit Post
      </Link>
      
      <DeleteButton id={post.id} />
    </div>
  )
}