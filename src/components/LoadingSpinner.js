import React from 'react'
import { Spin, Icon } from 'antd'

const LoadingSpinner = () => (
  <div style={{ textAlign: 'center', margin: '20vw' }}>
    <Spin
      tip='Carregando...'
      size='large'
      indicator={<Icon type='loading' style={{ fontSize: 42 }} spin />}
    />
  </div>
)

export default LoadingSpinner
