import React from 'react'
import styles from './Select.module.css'

const Select = ({option = [], placeholder = '선택하세요', ...props}) => {
  return (
    <select className={styles.select} {...props}>
      <option value=''>{placeholder}</option>
      {
        option.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))
      }
    </select>
  )
}

export default Select
