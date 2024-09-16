import React from 'react'
import AppCss from '../App.css'
//target="_blank"
const UrlItem = ({country, urlItem}) => {
  return (
    <div className='url-item'>
      <a href={urlItem.url}>{urlItem.url}</a>
      <p>Company Name : {urlItem.name}</p>
      <p>Estimate Employees: {urlItem.est_emp}</p>
      <br/>
    </div>
  )
}

export default UrlItem
