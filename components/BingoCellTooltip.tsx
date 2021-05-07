import React from 'react'
import { Label } from './style/typography'
import { Tooltip } from './Tooltip.style'

export type BingoCellTooltipProps = {
   details?: string
}

export default function BingoCellTooltip({ details }: BingoCellTooltipProps) {
   return (
      details ? (
         <Tooltip>
            <Label as="p">{details}</Label>
         </Tooltip>
      ) : <></>
   )
}