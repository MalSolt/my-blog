import { cn } from '@/app/_components/utils'
import { Editor } from '@tiptap/react'

export const StyleControllers = ({ editor }: { editor: Editor }) => {
  const toggleBold = () => editor.chain().focus().toggleBold().run()
  const toggleItalic = () => editor.chain().focus().toggleItalic().run()

  const buttons = [
    {
      text: 'Bold',
      type: 'bold',
      onClick: toggleBold,
    },
    {
      text: 'Italic',
      type: 'italic',
      onClick: toggleItalic,
    },
  ]

  return (
    <div className='flex gap-2 mb-2'>
      {buttons.map(({ text, type, onClick }) => (
        <span
          key={type}
          className={cn('cursor-pointer hover:text-primary active:text-primary/70 transition', {
            'text-primary': editor.isActive(type),
          })}
          onClick={onClick}
        >
          {text}
        </span>
      ))}
    </div>
  )
}
