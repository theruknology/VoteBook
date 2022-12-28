import React from 'react'

const Error = (props) => {
  return (
    <div className='bg-red-200 px-4 py-2 text-red-700 font-semibold mt-5'>{ props.children }</div>
  )
}

export default Error