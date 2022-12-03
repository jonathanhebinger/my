import { Grid } from '@mui/material'
import WikiMenu from './components/Menu'
import WikiPageList from './components/PageList'
import { WikiPageDatabaseProvider } from './hooks/usePageDatabase'
import { WikiOpenedPageListProvider } from './hooks/usePageOpenedList'
import { WikiProvider } from './hooks/useWiki'

export function App() {
  return (
    <WikiProvider wikiUuid="test">
      <WikiPageDatabaseProvider>
        <WikiOpenedPageListProvider>
          <Grid container spacing={2} padding={1}>
            <Grid item xs={8}>
              <WikiPageList />
            </Grid>
            <Grid item xs={4}>
              <WikiMenu />
            </Grid>
          </Grid>
        </WikiOpenedPageListProvider>
      </WikiPageDatabaseProvider>
    </WikiProvider>
  )
}

export default App
