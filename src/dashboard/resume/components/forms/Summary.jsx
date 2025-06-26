import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt = `Job Title: {jobtitle}

Please provide resume summaries for the role of "{jobtitle}" in the following JSON format:

[
  {
    "job_title": "{jobtitle}",
    "experience_level": "Fresher",
    "summary": "<4-5 line professional summary for someone new to the field>"
  },
  {
    "job_title": "{jobtitle}",
    "experience_level": "Mid-Level",
    "summary": "<4-5 line professional summary for someone with 2-5 years experience>"
  },
  {
    "job_title": "{jobtitle}",
    "experience_level": "Experienced",
    "summary": "<4-5 line professional summary for someone with 6+ years experience>"
  }
]

Each summary should be 4-5 lines long, professional in tone, and highlight appropriate skills and qualities for that experience level.`;

const Summary = ({enabledNext}) => {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [summary,setSummary] = useState(resumeInfo?.summary || '');
    const [loading, setLoading] = useState(false);
    const params =useParams();
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

    useEffect(() => {
        // Initialize with existing data from context
        if (resumeInfo?.summary) {
            setSummary(resumeInfo.summary);
        }
    }, [resumeInfo?.summary]);

    const handleSummaryChange = (e) => {
        const newSummary = e.target.value;
        setSummary(newSummary);
        
        // Update context immediately for preview components
        setResumeInfo(prev => ({
            ...prev, 
            summary: newSummary
        }));
    };

    const GenerateSummaryFromAI=async()=>{
        setLoading(true);
        const PROPMT = prompt.replace("{jobtitle}", resumeInfo?.jobTitle);
        console.log(PROPMT);
        const result = await AIChatSession.sendMessage(PROPMT);
        console.log(JSON.parse(result.response.text()));
        setAiGeneratedSummaryList(JSON.parse(result.response.text()))
        setLoading(false);
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true);

        const data={
            data: {
                summary: summary
            }
        }

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Summary Detail Updated Successfully");
        }, (error) => {
            setLoading(false);
            toast.error("Failed to update summary");
        });
    }

    const applySuggestion = (suggestedSummary) => {
        setSummary(suggestedSummary);
        
        // Update context immediately for preview
        setResumeInfo(prev => ({
            ...prev,
            summary: suggestedSummary
        }));
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold">Summary</h2>
                <p>Add Summary for your job title</p>
                <form onSubmit={onSave} className="mt-7">
                    <div className="flex justify-between items-end">
                        <label>Add Summary</label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-primary text-primary flex gap-2"
                            onClick={GenerateSummaryFromAI}
                        >
                            {" "}
                            <Brain className="h-4 w-4" /> Generate from AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5"
                        name="summary"
                        value={summary}
                        required
                        placeholder="Add Summary"
                        onChange={handleSummaryChange}
                    />
                    <div className="flex justify-end mt-5">
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummaryList && aiGeneratedSummaryList.length > 0 && (
                <div className="mt-5 p-4 border rounded-lg">
                    <h2 className="font-bold text-lg">Suggestions</h2>
                    {aiGeneratedSummaryList.map((item, index) => (
                        <div key={index} className="p-3 border-b last:border-b-0">
                            <h2 className="font-bold my-1">Level: {item.experience_level}</h2>
                            <p>{item.summary}</p>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2" 
                                onClick={() => applySuggestion(item.summary)}
                            >
                                Use this summary
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summary
