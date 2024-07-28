import { createGlobalStyle } from 'styled-components'

const interRegularUrl = chrome.runtime.getURL('fonts/Inter-Regular.ttf')

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('${interRegularUrl}') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`
