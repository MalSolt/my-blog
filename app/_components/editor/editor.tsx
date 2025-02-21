'use client'

import { Button } from '@/app/_components/ui/button'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import { ImagePicker } from '../image-picker/image-picker'
import './editor.css'
import { StyleControllers } from './style-controllers'

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

  // create onDelete function to remove images from imgUrls
  const handleGetImgUrls = (urls: string[]) => {
    setImgUrls((prev) => [...prev, ...urls])
  }

  const handleCreatePost = () => {
    console.log(imgUrls)
  }

  return (
    <div className='flex flex-col border-y px-4 py-2.5'>
      <StyleControllers editor={editor} />
      <EditorContent  editor={editor} />
      <ImagePicker getImgUrls={handleGetImgUrls} maxImages={5} />
      <Button className='ml-auto' onClick={handleCreatePost} disabled={editor.isEmpty}>
        Tweet
      </Button>
    </div>
  )
}
