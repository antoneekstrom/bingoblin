import React from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import useBingoContext from '../hooks/useBingoContext'
import { BingoCellProps } from './BingoCellFactory'
import BingoCellTooltip from './BingoCellTooltip'
import { BingoCellLabelStyle, EditableBingoCellStyle } from './BingoGrid.style'
import EditableContent from './EditableContent'
import colors from './style/colors'

export type EditableBingoCellProps = BingoCellProps

export default function EditableBingoCell(props: EditableBingoCellProps) {
   const { cell } = props
   const { state, bingo } = useBingoContext()

   const textColor = cell.color ? colors.SECONDARY : colors.PRIMARY
   const forceBorderColor = true
   const borderColor = colors.PRIMARY
   const color = props.cell.color ?? colors.SECONDARY_DARKENED

   return (
      <EditableBingoCellStyle
         {...{ textColor, forceBorderColor, borderColor, color }}
      >
         <EditableContent
            value={cell.name}
            onBlur={onBlur}
            el={(props) => (
               <BingoCellLabelStyle {...props} gridSize={state?.board?.size}/>
            )}
         />
         <BingoCellTooltip details={cell.details} />
      </EditableBingoCellStyle>
   )

   function onBlur(value: string | undefined) {
      console.log('onBlur', value)
      state && bingo?.requestStateUpdate(FrontendBingoModel.from(state).setCell(cell.index, {...cell, name: value ?? cell.name}).getState())
   }
}
