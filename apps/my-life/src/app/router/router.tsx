import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import MyLifeItemCreatePage from '../pages/ItemCreate'
import MyLifeItemEditPage from '../pages/ItemEdit'
import MyLifeItemListPage from '../pages/ItemList'
import MyLifeRootPage from '../pages/Root'
import MyLifeSignPage from '../pages/Sign'
import MyLifeTrackingPage from '../pages/Tracking'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MyLifeRootPage />}>
      <Route path="sign" element={<MyLifeSignPage />} />
      <Route path="tracking" element={<MyLifeTrackingPage />} />
      <Route path="item" element={<MyLifeItemListPage />} />
      <Route path="item/create" element={<MyLifeItemCreatePage />} />
      <Route path="item/edit/:itemUuid" element={<MyLifeItemEditPage />} />
    </Route>,
  ),
)
