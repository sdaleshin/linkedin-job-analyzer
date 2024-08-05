import { createGlobalStyle } from 'styled-components'

const interRegularUrl = chrome.runtime.getURL('fonts/Inter-Regular.ttf')
const interSemiBoldUrl = chrome.runtime.getURL('fonts/Inter-SemiBold.ttf')

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('${interRegularUrl}') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
      font-family: 'Inter';
      src: url('${interSemiBoldUrl}') format('truetype');
      font-weight: 600;
      font-style: normal;
  }
`
