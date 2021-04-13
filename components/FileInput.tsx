import React, { useRef, useState } from 'react'
import { FileInputContainer, FileInputInnerContainer, FileInputInner } from './FileInput.style'
import { ButtonHalf } from './Input.style'
import MaterialIcon from './MaterialIcon'
import { Label } from './style/typography'

export type FileInputProps = {
   onFile?: (file: File, error?: Error | undefined) => void
   onFileDragEnter?: (file: File, error?: Error | undefined) => void
   file?: File
   match?: RegExp
   type?: string | string[]
   disabled?: boolean
}

export const FileTypes = {
   json: 'application/json',
   text: 'text/plain',
}

export default function FileInput({
   file,
   match,
   type,
   disabled,
}: FileInputProps) {
   const fileInputRef = useRef<HTMLInputElement | undefined>()
   const [isDragging, setIsDragging] = useState<boolean>(false)
   const [fileError, setFileError] = useState<Error | undefined>()

   return (
      <FileInputContainer
         error={fileError != undefined}
         isDragging={isDragging}
         onDrop={onDrop}
         onDrag={onDrag}
         onDragEnter={() => setIsDragging(true)}
         onDragExit={() => setIsDragging(false)}
         onDragEnd={() => setIsDragging(false)}
         disabled={disabled}
      >
         <FileInputInnerContainer disabled={disabled}>
            <Label>{file?.name ?? 'Upload File'}</Label>
            <FileInputInner
               type="file"
               onChange={onChange}
               ref={(el) => (fileInputRef.current = el as any)}
            />
         </FileInputInnerContainer>
         <ButtonHalf
            side="right"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
         >
            <MaterialIcon size={22}>file_upload</MaterialIcon>
         </ButtonHalf>
      </FileInputContainer>
   )

   function onDrag(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault()
   }

   function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      const files = e.currentTarget.files
      if (files && files.length > 0) handleFiles(files)
   }

   function onDrop(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault()
      setIsDragging(false)
      const files = e.dataTransfer.files
      if (files && files.length > 0) handleFiles(files)
   }

   function validate(file: File) {
      if (!file) {
         return new Error('File is undefined')
      }

      if (type && file.type != type && !type.includes(file.type)) {
         return new Error (`File is of the type "${file.type}" and is required to be of type ${type}`)
      }

      if (match && file.name.match(match)?.length == undefined) {
         return new Error(`File does not match pattern ${match}`)
      }
   }

   function handleFiles(files: FileList) {
      const file = files[0]
      const error = validate(file)
      setFileError(error)
   }
}
