import styled from 'styled-components'
import colors from './style/colors'

export const Tooltip = styled.div`
   background-color: ${colors.SECONDARY};
   border-radius: 10px;
   box-shadow: rgba(10, 10, 30, 0.15) 3px 3px 10px;

   position: absolute;
   z-index: 2;
   top: -0.5em;
   left: calc(100% + 0.5em);

   width: 15em;
   height: 7.5em;
   padding: 1em 1em;

   pointer-events: none;
   cursor: unset;

   & > h1,
   h2,
   h3,
   p {
      color: ${colors.PRIMARY};
   }

   transition-property: opacity, transform;
   transition-duration: 200ms, 200ms;
   transition-timing-function: ease-in-out;
   transition-delay: 0;

   .tooltip:hover & {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 350ms, 350ms;
   }

   transform: translateY(50px);
   opacity: 0;
`