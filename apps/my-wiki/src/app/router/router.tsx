import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import SignIn from '../components/Auth/SignIn'
import SignRoot from '../components/Auth/SignRoot'
import SignUp from '../components/Auth/SignUp'
import NotebookList from '../components/NotebookList'
import RootPage from '../pages/RootPage'
import SignPage from '../pages/SignPage'
import WikiPage from '../pages/WikiPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RootPage />}>
        <Route path="wiki" element={<NotebookList />}></Route>
        <Route path="wiki/:wikiId" element={<WikiPage />}></Route>
      </Route>
      <Route path="sign" element={<SignPage />}>
        <Route path="" element={<SignRoot />} />
        <Route path="in" element={<SignIn />} />
        <Route path="up" element={<SignUp />} />
      </Route>
    </Route>,
  ),
)
