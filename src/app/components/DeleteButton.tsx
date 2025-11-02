'use client'

import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/utils'


export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?')
    
    if (confirmed) {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id) // Specify which post to delete

      if (error) {
        alert(error.message)
      } else {
        // Go back to the articles list
        router.push('/articles')
        router.refresh() // Refresh the list
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      style={{ padding: '10px', background: 'red', color: 'white', border: 'none', marginLeft: '10px', cursor: 'pointer' }}
    >
      Delete
    </button>
  )
}