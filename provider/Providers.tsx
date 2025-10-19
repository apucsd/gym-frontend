'use client'
import { store } from '@/redux/store'
import { ConfigProvider } from 'antd'
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

export default function Providers({children}:{children:ReactNode}) {
  return (
    <Provider store={store}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#1890ff',
        },
        components: {
          Button: {
            colorPrimary: '#1890ff',
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
      <Toaster position='top-right' />
      </ConfigProvider>
    </Provider>
  )
}
