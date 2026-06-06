import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './contextStore/store.tsx'
import ProductList from './pages/ProductList.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail.tsx'

const routes = createBrowserRouter([
  {
    path : '',
    element: <App />,
    children : [
      {
        path : '',
        element : <ProductList />
      },
      {
        path : 'product/:id',
        element: <ProductDetail />
      }
    ]
  },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={routes}/>
    </AppProvider>
  </StrictMode>,
)
