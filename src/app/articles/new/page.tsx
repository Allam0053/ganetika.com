'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { supabase } from '@/lib/utils'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content) return

    const { error } = await supabase
      .from('content')
      .insert([{ title, content, tag }])

    if (error) {
      alert(error.message)
    } else {
      // Refresh the articles list and go back
      router.push('/articles')
      router.refresh() // Ensures the new post is visible
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '100%', minHeight: '200px', padding: '8px' }}
          />
        </div>
        <div>
          <label htmlFor="tag">Tags (comma-separated)</label>
          <input
            id="tag"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '10px' }}>
          Create Post
        </button>
      </form>
    </div>
  )
}