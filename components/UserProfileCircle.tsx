import React from 'react'
import { Label } from './style/typography'

export type UserProfileCircleProps = {
   name?: string
   pictureUrl?: string
   color?: string
}

export type UserProfileCircleStyle = unknown

export default function UserProfileCircle({ name, color }: UserProfileCircleProps) {
   return (
      <Label style={{color}}>{name}</Label>
   )
}