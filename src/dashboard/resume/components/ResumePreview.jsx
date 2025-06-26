import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillsPreview from './preview/SkillsPreview';

const ResumePreview = () => {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{borderColor: resumeInfo?.themeColor}}>
      <PersonalDetailPreview resumeInfo={resumeInfo}/>
      <SummaryPreview resumeInfo={resumeInfo}/>
      <ExperiencePreview resumeInfo={resumeInfo}/>
      <EducationPreview resumeInfo={resumeInfo}/>
      <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview