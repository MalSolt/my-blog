'use client'
import { ImagePicker } from '../image-picker/image-picker'

import './editor.css'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/button'
import { StyleControllers } from './style-controllers'
import { useState } from 'react'
import { api } from '@/services/api-client'

export const Editor = () => {
  const [imgUrls, setImgUrls] = useState<string[]>([])
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none bg-background rounded',
      },
    },
  })

  if (!editor) {
    return null
  }

  const handleGetImgUrls = (urls: string[]) => {
    setImgUrls((prev) => [...prev, ...urls])
  }

  const handleCreatePost = () => {
    api.post('http://localhost:5000/posts', { content: editor.getJSON(), photo_url: imgUrls[0] })
  }

  return (
    <div className='flex flex-col border-y px-4 py-2.5'>
      <StyleControllers editor={editor} />
      <EditorContent editor={editor} />
      <ImagePicker getImgUrls={handleGetImgUrls} />
      <Button className='ml-auto' onClick={handleCreatePost} disabled={editor.isEmpty}>
        Tweet
      </Button>
    </div>
  )
}
