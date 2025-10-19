'use client'
import { persistor, store } from '@/redux/store'
import { ConfigProvider } from 'antd'
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NextTopLoader from 'nextjs-toploader';

export default function Providers({children}:{children:ReactNode}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: 'green',
        },
        components: {
          Button: {
            colorPrimary: 'green',
            fontSize: 16,
            controlHeight: 42
          },
          Input: {
        controlHeight: 42
          },
          InputNumber: {
            controlHeight: 42
          },
          Select: {
            controlHeight: 42
          },
          DatePicker: {
            controlHeight: 42
          },
          Form: {
          marginLG: 16
          },
          
          
        
        },
      }}>
      {children}
      <NextTopLoader color="green" />
      <Toaster position='top-right' />
      </ConfigProvider>
      </PersistGate>
    </Provider>
  )
}
