import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <Result
      status="404"
      title="404"
      subTitle={t('notFound')}
      extra={
        <Button type="primary">
          <Link to="/dashboard">{t('dashboard')}</Link>
        </Button>
      }
    />
  )
}

