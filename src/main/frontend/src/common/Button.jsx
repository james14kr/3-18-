import React from 'react'
import styles from './Button.module.css'

const Button = ({...props}) => {
  return (
    <button {...props}>
      등록
    </button>
  )
}

export default Button