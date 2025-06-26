import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState, useRef } from 'react'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    workSummary: '',
}

const Experience = ({enabledNext}) => {
    const [experienceList, setExperienceList] = useState([formField]);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const initialLoadDone = useRef(false);

    // Load experience data from resumeInfo when component mounts
    useEffect(() => {
        if (resumeInfo?.Experience && Array.isArray(resumeInfo.Experience) && 
            resumeInfo.Experience.length > 0 && !initialLoadDone.current) {
            initialLoadDone.current = true;
            
            // Create a deep copy to avoid reference issues
            const loadedExperience = JSON.parse(JSON.stringify(resumeInfo.Experience));
            setExperienceList(loadedExperience);
        }
    }, [resumeInfo]);

    const handleChange=(index,event)=>{
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
        
        // Update context immediately for preview
        setResumeInfo(prev => ({
            ...prev,
            Experience: newEntries
        }));
    }

    const handleCheckboxChange=(index, event)=>{
        const newEntries = [...experienceList];
        const { name, checked } = event.target;
        newEntries[index][name] = checked;
        setExperienceList(newEntries);
        
        // Update context immediately for preview
        setResumeInfo(prev => ({
            ...prev,
            Experience: newEntries
        }));
    }

    const AddNewExperience = () => {
        const newExperienceList = [...experienceList, { ...formField }];
        setExperienceList(newExperienceList);
        
        // Update context immediately for preview
        setResumeInfo(prev => ({
            ...prev,
            Experience: newExperienceList
        }));
    };

    const RemoveExperience = () => {
        if (experienceList.length > 1) {
            const newExperienceList = experienceList.slice(0, -1);
            setExperienceList(newExperienceList);
            
            // Update context immediately for preview
            setResumeInfo(prev => ({
                ...prev,
                Experience: newExperienceList
            }));
        }
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experienceList];
                newEntries[index][name] = e;
        setExperienceList(newEntries);
        
        // Update context immediately for preview
        setResumeInfo(prev => ({
            ...prev,
            Experience: newEntries
        }));
    }

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Clean data before sending to API
            const cleanedExperience = experienceList.map(({id, ...rest}) => rest);
            
            const data = {
                data: {
                    Experience: cleanedExperience
                }
            };

            const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
            console.log("Experience update response:", resp);
            
            if (enabledNext) enabledNext(true);
            toast("Experience Details Updated Successfully");
        } catch (error) {
            console.error("Error updating experience:", error);
            toast.error("Failed to update experience details");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold">Professional Experience</h2>
            <p>Add Your previous Job experience</p>
            <div>
                {experienceList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div>
                                <label className="text-xs">Position Title</label>
                                <Input 
                                    name="title" 
                                    onChange={(event)=>handleChange(index,event)} 
                                    value={item?.title || ''}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Company Name</label>
                                <Input 
                                    name="companyName" 
                                    value={item?.companyName || ''} 
                                    onChange={(event)=>handleChange(index,event)}
                                />
                            </div>
                            <div>
                                <label className="text-xs">City</label>
                                <Input 
                                    name="city" 
                                    onChange={(event)=>handleChange(index,event)} 
                                    value={item?.city || ''}
                                />
                            </div>
                            <div>
                                <label className="text-xs">State</label>
                                <Input 
                                    name="state" 
                                    onChange={(event)=>handleChange(index,event)} 
                                    value={item?.state || ''}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Start Date</label>
                                <Input 
                                    type="date" 
                                    name="startDate" 
                                    onChange={(event)=>handleChange(index,event)} 
                                    value={item?.startDate || ''}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs">End Date</label>
                                <Input 
                                    type="date" 
                                    name="endDate" 
                                    onChange={(event)=>handleChange(index,event)} 
                                    value={item?.endDate || ''}
                                    disabled={item?.currentlyWorking}
                                />
                                <div className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        name="currentlyWorking"
                                        checked={item?.currentlyWorking || false}
                                        onChange={(event)=>handleCheckboxChange(index,event)}
                                        className="mr-2"
                                    />
                                    <label className="text-xs">Currently Working</label>
                                </div>
                            </div>
                            <div className='col-span-2'>
                                <label className="text-xs">Work Summary</label>
                                <RichTextEditor 
                                    index={index} 
                                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', index)} 
                                    defaultValue={item?.workSummary || ''}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={AddNewExperience}
                        className="text-primary"
                    >
                        + Add More Experience
                    </Button>
                    <Button
                        variant="outline"
                        onClick={RemoveExperience}
                        className="text-primary"
                    >
                        - Remove
                    </Button>
                </div>
                <Button onClick={onSave} disabled={loading}>
                    {loading ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        "Save"
                    )}
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Experience