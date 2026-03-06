import React from 'react'
import styles from './Input.module.css'

const Input = ({...props}) => {
  return (
   <input 
    {...props}
  />
  )
}

export default Input