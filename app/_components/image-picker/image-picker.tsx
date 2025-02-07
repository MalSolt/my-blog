'use client'

import { ChangeEvent, useState } from 'react'
import { ImagePreview } from './image-preview'

export enum ImageStatus {
  uploading = 'uploading',
  uploaded = 'uploaded',
  error = 'error',
}

export type ImageUpload = {
  name: string
  url: string
  status: ImageStatus
}

const MAX_IMAGES = 2

type Props = {
  getImgUrls: (urls: string[]) => void
}

export const ImagePicker = ({ getImgUrls }: Props) => {
  const [selectedImages, setSelectedImages] = useState<ImageUpload[]>([])

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    if (selectedImages.length + files.length > MAX_IMAGES) {
      alert('You can only upload up to 5 images')
      return
    }

    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      status: ImageStatus.uploading,
    }))

    setSelectedImages((prev) => [...prev, ...newImages])

    files.forEach((file) => uploadImage(file))
  }

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const apiKey = '568d853a3fda897db0860e688d73a4dc'
      const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const { data } = await response.json()
      
      getImgUrls([data.url])

      setSelectedImages((prev) =>
        prev.map((img) =>
          img.name === file.name ? { ...img, status: ImageStatus.uploaded, url: data.url } : img
        )
      )
    } catch (error) {
      setSelectedImages((prev) =>
        prev.map((img) => (img.name === file.name ? { ...img, status: ImageStatus.error } : img))
      )
      console.error(error)
    }
  }

  const handleDeleteImage = (name: string) => () => {
    setSelectedImages((prev) => prev.filter((img) => img.name !== name))
  }

  return (
    <div>
      <label htmlFor='image-input' className='px-4 py-2 bg-primary cursor-pointer'></label>
      <input
        id='image-input'
        type='file'
        multiple
        accept='image/*'
        className='hidden'
        onChange={handleImageChange}
      />
      <div className='mt-4'>
        {selectedImages.length === 1 ? (
          <ImagePreview
            deleteImage={handleDeleteImage(selectedImages[0].name)}
            image={selectedImages[0]}
          />
        ) : (
          <div className='grid grid-cols-2 gap-2'>
            {selectedImages.map((image) => (
              <ImagePreview
                deleteImage={handleDeleteImage(image.name)}
                image={image}
                key={image.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
