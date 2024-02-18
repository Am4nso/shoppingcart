import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.tsx";
import {Checkout} from "./Checkout.tsx";
import {Cart} from "./Cart.tsx";
import AddItems from "./AddItems.tsx";
import {Layout} from "./Layout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/checkout",
        element: <Checkout/>,
    },
    {
        path: "/cart/:barcode",
        element: <Cart/>,
    },
    {
        path: "/addItems",
        element: <AddItems/>,
    },
    {
        path: "*",
        element: <App />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Suspense>
      <Layout>
          <RouterProvider router={router} />
      </Layout>
  </React.Suspense>,
)
