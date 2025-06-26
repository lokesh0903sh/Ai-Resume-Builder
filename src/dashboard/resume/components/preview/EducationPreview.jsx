import React from 'react'

const EducationPreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{color: resumeInfo?.themeColor}}>Education</h2>
      <hr style={{borderColor: resumeInfo?.themeColor}}/>
      {
        Array.isArray(resumeInfo?.Education) && resumeInfo.Education.length > 0 ? (
          resumeInfo.Education.map((education, index) => (
            <div className='my-5' key={index}>
              <h2 className='text-sm font-bold' style={{color: resumeInfo?.themeColor}}>{education?.universityName}</h2>
              <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}, 
                <span>{education?.startYear} - {education?.endYear}</span>
              </h2>
              <h3 className='text-xs'>Grade:- {education?.grade}</h3>
              <p className='text-xs my-2'>{education?.description}</p>
            </div>
          ))
        ) : (
          <p className='text-xs text-center'>No education details available.</p>
        )
      }
    </div>
  )
}

export default EducationPreview
