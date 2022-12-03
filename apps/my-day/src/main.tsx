import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import { App } from './app/app'

import { store } from '@my/shared/redux'
import { Provider } from 'react-redux'

const darkTheme = createTheme({
  palette: { mode: 'dark' },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  </Provider>,
)
