import { createGlobalStyle } from 'styled-components'

export const GlobalCssVars = createGlobalStyle`
  :root {
    --brand-text-color-primary: ${({ theme }) => theme.textColorPrimary};
    --brand-text-color-secondary: ${({ theme }) => theme.textColorSecondary};
    --brand-text-color-highlight: ${({ theme }) => theme.textColorHighlight};
    --brand-text-color-lowlight: ${({ theme }) => theme.textColorLowlight};
    --brand-background-color: ${({ theme }) => theme.backgroundColor};
    --brand-background-inverse-color: ${({ theme }) =>
      theme.backgroundInverseColor};
  }
`
