'use client'

import { useRouter } from 'next/navigation'
import { useEffect,useState } from 'react'

import { supabase } from '@/lib/utils'

export default function EditPost({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const router = useRouter()
  const { id } = params

  // Fetch the existing post data
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from('content')
        .select('*')
        .eq('id', id)
        .single()
      
      if (data) {
        setTitle(data.title)
        setContent(data.content)
        setTag(data.tag)
      }
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from('content')
      .update({ title, content, tag })
      .eq('id', id) // Specify which post to update

    if (error) {
      alert(error.message)
    } else {
      // Go back to the post page
      router.push(`/articles/${id}`)
      router.refresh() // Refresh to show new data
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Post</h1>
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
          Update Post
        </button>
      </form>
    </div>
  )
}