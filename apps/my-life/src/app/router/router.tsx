import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import MyLifeSignIn from '../components/Auth/SignIn'
import MyLifeItemCreatePage from '../pages/ItemCreate'
import MyLifeItemEditPage from '../pages/ItemEdit'
import MyLifeItemListPage from '../pages/ItemList'
import MyLifeMainPage from '../pages/Main'
import MyLifeRootPage from '../pages/Root'
import MyLifeSignPage from '../pages/Sign'
import MyLifeTrackingPage from '../pages/Tracking'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<MyLifeRootPage />}>
      <Route path="/sign">
        <Route path="" element={<MyLifeSignPage />} />
        <Route path="in" element={<MyLifeSignIn />} />
        <Route path="up" element={<MyLifeSignIn />} />
      </Route>
      <Route path="" element={<MyLifeMainPage />}>
        <Route path="tracking" element={<MyLifeTrackingPage />} />
        <Route path="item" element={<MyLifeItemListPage />} />
        <Route path="item/create" element={<MyLifeItemCreatePage />} />
        <Route path="item/edit/:itemUuid" element={<MyLifeItemEditPage />} />
      </Route>
    </Route>,
  ),
)
