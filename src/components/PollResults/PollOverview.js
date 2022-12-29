import React from 'react'

const PollOverview = (props) => {
  props.data

  return (
    <div className=''>
      {props.options.map(itm => {
        return <div key={itm.id}>
        <p>{itm.title} : {itm.votes}</p> 
        </div>
      })}
    </div>
  )
}

export default PollOverview