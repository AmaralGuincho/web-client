import React from 'react'
import { Icon } from 'antd'

const styles = {
  div: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    fontSize: '40px'
  },
  icon: {
    fontSize: '140px',
    margin: '40px'
  }
}

const NotFound = () => (
  <div style={styles.div}>
    <Icon type='frown-o' style={styles.icon} />
    <span> A página que você está procurando não existe </span>
  </div>
)

export default NotFound
