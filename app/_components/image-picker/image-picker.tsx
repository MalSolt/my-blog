'use client'

import axios from 'axios'
import { ChangeEvent, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { ImagePreview } from './image-preview'
import { toast } from 'react-toastify'

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

type Props = {
  getImgUrls: (urls: string[]) => void
  maxImages?: number
}

export const ImagePicker = ({ getImgUrls, maxImages = 5 }: Props) => {
  const [selectedImages, setSelectedImages] = useState<ImageUpload[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAdd = (files: File[]) => {
    if (selectedImages.length + files.length > maxImages) {
      toast.error('You can only upload up to 5 images', {
        position: 'bottom-right',
      })
      return
    }

    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      status: ImageStatus.uploading,
    }))

    setSelectedImages((prev) => [...prev, ...newImages])

    files.forEach((file) => handleUpload(file))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleAdd(Array.from(event.target.files))
    }
  }

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
      const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`

      const { data } = await axios.post(apiUrl, formData)
      const url = data.data.url

      getImgUrls([url])

      setSelectedImages((prev) =>
        prev.map((img) => {
          console.log(img.name, file.name, data)

          return img.name === file.name ? { ...img, status: ImageStatus.uploaded, url } : img
        })
      )
    } catch (error) {
      setSelectedImages((prev) =>
        prev.map((img) => (img.name === file.name ? { ...img, status: ImageStatus.error } : img))
      )
      console.error(error)
    }
  }

  const handleRemove = (name: string) => {
    setSelectedImages((prev) => prev.filter((img) => img.name !== name))
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files) {
      handleAdd(Array.from(event.dataTransfer.files))
    }
  }

  return (
    <div className='w-full max-w-2xl mx-auto m-4'>
      {selectedImages.length > 0 && (
        <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {selectedImages.map((image, idx) => (
            <ImagePreview key={`${image.name}${idx}`} deleteImage={handleRemove} image={image} />
          ))}
        </div>
      )}
      <div
        className='mt-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer'
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id='pictures'
          type='file'
          multiple
          accept='image/*'
          className='hidden'
          onChange={handleChange}
          ref={fileInputRef}
        />
        <p>Click to select or drag and drop images here</p>
      </div>
    </div>
  )
}
