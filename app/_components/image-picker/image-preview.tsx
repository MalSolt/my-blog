import React from 'react'
import Image from 'next/image'
import { ImageStatus, ImageUpload } from './image-picker'
import { Button } from '@/app/_components/ui/button'
import { Loader2, X } from 'lucide-react'

interface ImagePreviewProps {
  image: ImageUpload
  deleteImage: (name: string) => void
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image, deleteImage }) => {
  return (
    <div className='relative pt-[100%]'>
      <div className='absolute inset-0'>
        <Image
          src={image.url}
          alt={`Preview ${image.name}`}
          layout='fill'
          objectFit='cover'
          className='rounded-md'
        />
      </div>
      {image.status === ImageStatus.uploading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md'>
          <Loader2 className='h-6 w-6 animate-spin text-white' />
        </div>
      )}
      {image.status === ImageStatus.error && (
        <div className='absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-50 rounded-md'>
          <X className='h-6 w-6 text-white' />
        </div>
      )}
      <Button
        variant='destructive'
        size='icon'
        className='absolute top-0 right-0 -mt-2 -mr-2'
        onClick={() => deleteImage(image.name)}
      >
        <X className='h-4 w-4' />
      </Button>
    </div>
  )
}
