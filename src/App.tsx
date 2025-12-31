import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import { useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { router } from './router/router'

function App() {
  const { i18n } = useTranslation()

  const locale = useMemo(() => {
    return i18n.language.startsWith('zh') ? zhCN : enUS
  }, [i18n.language])

  return (
    <ConfigProvider locale={locale} theme={{
      token: {
        colorPrimary: "red",
      },
    }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
