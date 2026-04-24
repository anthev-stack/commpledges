"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Upload, X, Image as ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  aspectRatio?: string
  maxSize?: number // in MB
  acceptedTypes?: string[]
  placeholder?: string
  className?: string
  compact?: boolean // Makes the upload area smaller for logos
}

export default function ImageUpload({
  value,
  onChange,
  aspectRatio = "500/100",
  maxSize = 2,
  acceptedTypes = ["image/webp", "image/gif", "image/png"],
  placeholder = "Upload banner image",
  className = "",
  compact = false
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    setError("")
    
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Invalid file type. Only ${acceptedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')} files are allowed.`)
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be under ${maxSize}MB`)
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/servers/banner', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      onChange(data.dataUrl)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }, [acceptedTypes, maxSize, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onChange("")
    setError("")
  }, [onChange])

  return (
    <div className={className}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg transition-colors cursor-pointer
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${error ? 'border-red-500' : ''}
          ${compact ? 'max-w-xs' : ''}
        `}
        style={{ aspectRatio: compact ? undefined : aspectRatio }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        {value ? (
          <div className={`relative ${compact ? 'w-32 h-32 mx-auto' : 'w-full h-full'}`}>
            <Image
              src={value}
              alt="Uploaded banner"
              fill={!compact}
              width={compact ? 128 : undefined}
              height={compact ? 128 : undefined}
              className="object-cover rounded-lg"
              unoptimized
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center ${compact ? 'w-32 h-32 mx-auto p-4' : 'w-full h-full p-6'}`}>
            {isUploading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} text-gray-400 mx-auto mb-2`} />
                <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-900 mb-1`}>
                  {placeholder}
                </p>
                {!compact && (
                  <>
                    <p className="text-xs text-gray-500">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      WebP, GIF, PNG up to {maxSize}MB
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      <p className="mt-2 text-xs text-gray-500">
        Recommended: {aspectRatio} aspect ratio for best results
      </p>
    </div>
  )
}
