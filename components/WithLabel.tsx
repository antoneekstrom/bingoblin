import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Label, LabelStyle } from './style/typography'

export type WithLabelProps = React.HTMLProps<HTMLDivElement> & PropsWithChildren<{
   label: (string | undefined) | (Omit<LabelStyle, 'children'> & {text: string})
}>

export type WithLabelStyle = unknown

const Container = styled.div`
   display: flex;
   flex-direction: column;
   display: grid;
   gap: 7px;
`

export default function WithLabel(props: WithLabelProps) {
   const { label, children } = props
   return (
      <Container {...(props as any)}>
         {label && (typeof(label) == 'string' ? <Label>{label}</Label> : <Label {...(label as any)} />)}
         {children}
      </Container>
   )
}