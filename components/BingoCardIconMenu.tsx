import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import useBingoContext from '../hooks/useBingoContext'
import { FileTypes } from './FileInput'
import MaterialIcon from './MaterialIcon'
import { Flex } from './style/layout'
import { Label } from './style/typography'
import { NeutralThemeProvider, PRIMARY_PALETTE } from './ThemeProvider'

export type BingoCardIconMenuProps = PropsWithChildren<unknown>

export type BingoCardIconMenuStyle = unknown

const List = styled(Flex)`
   margin: 0;
   padding: 0;
   list-style-type: none;
   position: absolute;
   right: 0;
   top: 3rem;
   transform: translateX(calc(100% + 0.5rem));
`

const MenuIcon = styled(Flex)`
   height: 24px;

   transition: opacity 200ms ease-in-out;
   ${({ theme }) =>
      !theme.props.disabled &&
      css`
         opacity: 0;
      `}

   span:first-child {
      cursor: pointer;  
   }

   span:hover + .label {
      opacity: 1;
      transform: translateY(0);
   }

   .label {
      transform: translateY(50px);
      opacity: 0;

      transition-property: opacity, transform;
      transition-duration: 200ms, 200ms;
      transition-timing-function: ease-in-out;
      transition-delay: 0;

      pointer-events: none;
   }
`

export default function BingoCardIconMenu({}: BingoCardIconMenuProps) {
   const {
      state,
      bingoCodeState: [bingoCode],
   } = useBingoContext()

   return (
      <NeutralThemeProvider palette={PRIMARY_PALETTE}>
         <List as="ul" direction="column" gap="1rem">
            <MenuIcon as="li" gap="0.3rem">
               <MaterialIcon>edit</MaterialIcon>
               <Label as="span" className="label">Edit</Label>
            </MenuIcon>
            <MenuIcon as="li" gap="0.3rem">
               <MaterialIcon onClick={download}>download</MaterialIcon>
               <Label as="span" className="label">Download</Label>
            </MenuIcon>
         </List>
      </NeutralThemeProvider>
   )

   function download() {
      const board = { ...state?.board }
      if (board) {
         board.items = board?.items?.filter((item) => item != undefined)
         const fileBlob = new Blob([JSON.stringify(board, null, 4)], {
            type: FileTypes.json,
         })
         const fileUrl = URL.createObjectURL(fileBlob)

         const anchor = document.createElement('a')
         anchor.href = fileUrl
         anchor.download = `${bingoCode}.bingo.json`
         anchor.click()
      }
   }
}
