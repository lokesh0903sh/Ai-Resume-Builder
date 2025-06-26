import React from 'react'

const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{color: resumeInfo?.themeColor}}>Professional Experience</h2>
      <hr style={{borderColor: resumeInfo?.themeColor}}/>
      {
        Array.isArray(resumeInfo?.Experience) && resumeInfo.Experience.length > 0 ? (
          resumeInfo.Experience.map((experience, index) => (
            <div className='my-5' key={index}>
              <h2 className='text-sm font-bold' style={{color: resumeInfo?.themeColor}}>{experience?.title}</h2>
              <h2 className='text-xs flex justify-between'>
                {experience?.companyName}{experience?.city ? `, ${experience?.city}` : ''}{experience?.state ? `, ${experience?.state}` : ''}
                <span>{experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience?.endDate}</span>
              </h2>
              <div 
                className='text-xs my-2 work-summary-content' 
                dangerouslySetInnerHTML={{__html: experience?.workSummary || ''}}
              />
            </div>
          ))
        ) : (
          <p className='text-xs text-center my-4'>No experience details available.</p>
        )
      }
      
      {/* Add global styles for rich text content */}
      <style jsx global>{`
        .work-summary-content ul {
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .work-summary-content ol {
          padding-left: 1.5rem;
          list-style-type: decimal;
        }
        .work-summary-content li {
          margin-bottom: 0.25rem;
        }
        .work-summary-content p {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  )
}

export default ExperiencePreview