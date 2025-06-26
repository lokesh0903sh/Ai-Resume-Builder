import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (
    <div>
      <p className='text-xs'> 
        {resumeInfo?.summary || 'No summary available.'}
      </p>
    </div>
  )
}

export default SummaryPreview
