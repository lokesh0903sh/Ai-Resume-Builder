import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const formField = {
    degree: '',
    major: '',
    universityName: '',
    startYear: '',
    endYear: '',
    grade: '',
    description: ''
};

const Education = ({ enabledNext }) => {
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [educationList, setEducationList] = useState([formField]);
    const initialLoadDone = useRef(false);

    // Load education from resumeInfo when component mounts
    useEffect(() => {
        if (resumeInfo?.Education && Array.isArray(resumeInfo.Education) && 
            resumeInfo.Education.length > 0 && !initialLoadDone.current) {
            initialLoadDone.current = true;
            
            // Create a deep copy to avoid reference issues
            const loadedEducation = JSON.parse(JSON.stringify(resumeInfo.Education));
            setEducationList(loadedEducation);
        }
    }, [resumeInfo]);

    const handleChange = (event, index) => {
        const newEntries = [...educationList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationList(newEntries);
        
        // Update context immediately for preview
        setResumeInfo(prev => ({
            ...prev,
            Education: newEntries
        }));
    };

    const AddNewEducation = () => {
        const newEducationList = [...educationList, { ...formField }];
        setEducationList(newEducationList);
        
        // Update context immediately for preview
        setResumeInfo(prev => ({
            ...prev,
            Education: newEducationList
        }));
    };

    const RemoveEducation = () => {
        if (educationList.length > 1) {
            const newEducationList = educationList.slice(0, -1);
            setEducationList(newEducationList);
            
            // Update context immediately for preview
            setResumeInfo(prev => ({
                ...prev,
                Education: newEducationList
            }));
        }
    };

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Clean data before sending to API
            const cleanedEducation = educationList.map(({ id, ...rest }) => rest);

            const data = {
                data: {
                    Education: cleanedEducation
                }
            };

            const resp = await GlobalApi.UpdateResumeDetail(params.resumeId, data);
            console.log("Education update response:", resp);
            
            if (enabledNext) enabledNext(true);
            toast("Education Details Updated Successfully");
        } catch (error) {
            console.error("Error updating education:", error);
            toast.error("Failed to update education details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold">Education</h2>
                <p>Add Your educational details</p>
                <div>
                    {educationList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                                <div>
                                    <label className="text-xs">University Name</label>
                                    <Input
                                        name="universityName"
                                        onChange={(e) => handleChange(e, index)}
                                        value={item?.universityName || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Degree</label>
                                    <Input
                                        name="degree"
                                        onChange={(e) => handleChange(e, index)}
                                        value={item?.degree || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Major</label>
                                    <Input
                                        name="major"
                                        onChange={(e) => handleChange(e, index)}
                                        value={item?.major || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Grade</label>
                                    <Input
                                        name="grade"
                                        onChange={(e) => handleChange(e, index)}
                                        value={item?.grade || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Start Year</label>
                                    <Input
                                        type="date"
                                        name="startYear"
                                        onChange={(e) => handleChange(e, index)}
                                        value={item?.startYear || ''}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">End Year</label>
                                    <Input
                                        type="date"
                                        name="endYear"
                                        onChange={(e) => handleChange(e, index)}
                                        value={item?.endYear || ''}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs">Description</label>
                                    <Textarea
                                        name="description"
                                        onChange={(e) => handleChange(e, index)}
                                        value={item?.description || ''}
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
                            onClick={AddNewEducation}
                            className="text-primary"
                        >
                            + Add More Education
                        </Button>
                        <Button
                            variant="outline"
                            onClick={RemoveEducation}
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
    );
};

export default Education;