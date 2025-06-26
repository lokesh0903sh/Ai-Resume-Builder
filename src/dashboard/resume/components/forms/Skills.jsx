import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const formField = {
    name: '',
    rating: 0
};

const Skills = ({enabledNext}) => {
    const [skillsList, setSkillsList] = useState([formField]);
    const [loading, setLoading] = useState(false);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const params = useParams();
    const initialLoadDone = useRef(false);

    // Load skills from resumeInfo when component mounts or resumeInfo changes
    useEffect(() => {
        if (resumeInfo?.Skills && Array.isArray(resumeInfo.Skills) && 
            resumeInfo.Skills.length > 0 && !initialLoadDone.current) {
            initialLoadDone.current = true;
            
            // Create a deep copy to avoid reference issues
            const loadedSkills = resumeInfo.Skills.map(skill => ({
                name: skill.name || '',
                rating: skill.rating || 0,
                id: skill.id
            }));
            
            setSkillsList(loadedSkills);
        }
    }, [resumeInfo]);

    const AddNewSkills = () => {
       const newSkillsList = [...skillsList, {...formField}];
       setSkillsList(newSkillsList);
       
       // Update context immediately for preview
       setResumeInfo(prev => ({
           ...prev,
           Skills: newSkillsList
       }));
    }   

    const RemoveSkills = () => {
        if (skillsList.length > 1) {
            const newSkillsList = skillsList.slice(0, -1);
            setSkillsList(newSkillsList);
            
            // Update context immediately for preview
            setResumeInfo(prev => ({
                ...prev,
                Skills: newSkillsList
            }));
        }
    }

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
        
        // Update context immediately for preview
        setResumeInfo(prev => ({
            ...prev,
            Skills: newEntries
        }));
    }

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Clean data before sending to API
            const cleanedSkills = skillsList.map(({id, ...rest}) => rest);
            
            const data = {
                data: {
                    Skills: cleanedSkills
                }
            };

            const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
            console.log("Skills update response:", resp);
            
            if (enabledNext) enabledNext(true);
            toast("Skills Updated Successfully");
        } catch (error) {
            console.error("Error updating skills:", error);
            toast.error("Failed to update skills");
        } finally {
            setLoading(false);
        }
    }
        
    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold">Skills</h2>
                <p>Add Your top professional skills</p>

                <div>
                    {skillsList && skillsList.map((item, index) => (
                        <div key={index}>
                            <div className='flex justify-between border rounded-lg p-3 my-5'>
                                <div>
                                    <label className='text-xs'>Name</label>
                                    <Input 
                                        className="w-full" 
                                        value={item.name || ''} 
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div className='flex justify-center py-6 mx-2'>
                                    <Rating 
                                        style={{ maxWidth: 120 }} 
                                        value={item.rating || 0} 
                                        onChange={(v) => handleChange(index, 'rating', v)} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
                        <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>
                    </div>
                    <Button onClick={onSave} disabled={loading}>
                        {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Skills