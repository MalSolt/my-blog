import React from 'react'
import Image from 'next/image'
import { ImageStatus, ImageUpload } from './image-picker'
import { Button } from '@/app/_components/ui/button'
import { cn } from '@/app/_components/utils'

interface ImagePreviewProps {
  image: ImageUpload
  deleteImage: () => void
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image, deleteImage }) => {
  return (
    <div key={image.name} className='w-full aspect-w-1 aspect-h-1 relative'>
      <div className='w-full h-full'>
        <Image
          src={image.url}
          alt={image.name}
          layout='fill'
          objectFit='cover'
          className={cn('rounded-lg', { 'opacity-50': image.status !== ImageStatus.uploaded })}
        />
      </div>
      <div className='w-full h-48 z-10'>
        <Button className='absolute top-2 right-5'>Edit</Button>
        <Button className='absolute top-2 left-5' onClick={deleteImage}>
          Delete
        </Button>
      </div>
      {image.status === ImageStatus.uploading && (
        <div className='absolute inset-0 flex items-center justify-center bg-muted bg-opacity-50'>
          <p>Uploading …</p>
        </div>
      )}
      {image.status === ImageStatus.error && (
        <div className='absolute inset-0 flex items-center justify-center bg-muted bg-opacity-50'>
          <p>Error</p>
        </div>
      )}
    </div>
  )
}
