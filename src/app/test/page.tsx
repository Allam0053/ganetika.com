'use client';
import { useEffect,useState } from 'react'

import { supabase } from "@/lib/utils";

export default function TestPage() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('content').select('*');

      console.log('duar todos', todos);
      if (todos.length > 1) {
        setTodos(todos)
      }
    }

    getTodos();
  }, [])


  return <>
    <div aria-hidden="false">
      {todos.map((todo) => (
        <li key={todo.id}>{todo.content}</li>
      ))}
    </div>
  </>
}