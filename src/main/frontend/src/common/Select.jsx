import React from 'react'
import styles from './Select.module.css'

const Select = ({...props}) => {
  return (
    <select {...props}>
      <option value= {0}>제조사를 선택하세요</option>
      <option value="현대">현대</option>
      <option value="기아">기아</option>
    </select>
  )
}

export default Select