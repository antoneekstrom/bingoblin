import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

export type PageDropzoneProps = {
   onDrop?: (e: React.DragEvent) => void
}

export type PageDropzoneStyle = {
   isDropping?: boolean
}

const Element = styled.div<PageDropzoneStyle>`
   position: absolute;
   left: 0;
   top: 0;

   pointer-events: none;
   ${({isDropping}) => isDropping && css`
      pointer-events: all;
      background-color: rgba(0,0,0,0.4);
   `}

   width: 100vw;
   height: 100vh;
`

export default function PageDropzone(props: PageDropzoneProps) {
   const [isDropping, setIsDropping] = useState(false)
   useEffect(() => {
      window.addEventListener('dragenter', onWindowDragEnter)
      return () => window.removeEventListener('dragenter', onWindowDragEnter)
   }, [])

   return (
      <Element
         isDropping={isDropping}
         onDragOver={e => e.preventDefault()}
         onDrop={onDrop}
         onDragEnter={() => setIsDropping(true)}
         onDragExit={() => setIsDropping(false)}
         onDragEnd={() => setIsDropping(false)}
         onDragStart={() => setIsDropping(true)}
      />
   )

   function onDrop(e: React.DragEvent) {
      e.preventDefault()
      props.onDrop?.(e)
      setIsDropping(false)
   }

   
   function onWindowDragEnter(e: DragEvent) {
      setIsDropping(true)
   }
}