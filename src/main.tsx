import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { HashRouter, Route, Routes} from "react-router-dom";
import App from "./App.tsx";
import {Checkout} from "./Checkout.tsx";
import {Cart} from "./Cart.tsx";
import AddItems from "./AddItems.tsx";
import {Layout} from "./Layout.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Suspense>
      <Layout>
          <HashRouter>
              <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/cart/:barcode" element={<Cart/>}/>
                    <Route path="/addItems" element={<AddItems/>}/>
                </Routes>
          </HashRouter>
      </Layout>
  </React.Suspense>,
)
