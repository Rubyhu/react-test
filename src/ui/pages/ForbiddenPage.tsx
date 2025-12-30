import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function ForbiddenPage() {
  const { t } = useTranslation()

  return (
    <Result
      status="403"
      title="403"
      subTitle={t('forbidden')}
      extra={
        <Button type="primary">
          <Link to="/dashboard">{t('dashboard')}</Link>
        </Button>
      }
    />
  )
}
