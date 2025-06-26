import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const PROMPT = `position title: {positionTitle}

Please generate 5-7 professional bullet points for my resume based on the position title "{positionTitle}" in the following JSON format:

{
  "position_title": "{positionTitle}",
  "resume_bullet_points": [
    "First bullet point describing a key achievement or responsibility",
    "Second bullet point describing another achievement or skill",
    "Third bullet point focused on technical skills or tools used",
    "Fourth bullet point about collaboration or team experiences",
    "Fifth bullet point about process improvements or metrics",
    "Optional sixth bullet point",
    "Optional seventh bullet point"
  ]
}

Each bullet point should:
- Start with a strong action verb
- Include specific skills, technologies, or methodologies relevant to the position
- Mention measurable achievements where possible (percentages, metrics)
- Be concise and professionally phrased
- Cover a mix of technical skills, soft skills, and achievements`;

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || '');
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [bulletPoints, setBulletPoints] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Update editor value when defaultValue changes (like when data loads from API)
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo?.Experience || !resumeInfo.Experience[index] || !resumeInfo.Experience[index].title) {
      toast("Please Add Position Title");
      setLoading(false);
      return;
    }
    
    const prompt = PROMPT.replace(/{positionTitle}/g, resumeInfo?.Experience[index].title);
    
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      console.log("AI Response:", responseText);
      
      try {
        const parsedResponse = JSON.parse(responseText);
        console.log("Parsed response:", parsedResponse);
        
        if (parsedResponse && Array.isArray(parsedResponse.resume_bullet_points)) {
          // Store the bullet points
          setBulletPoints(parsedResponse.resume_bullet_points);
          setShowSuggestions(true);
          toast("Generated bullet points for your position");
        } else {
          toast.error("Received invalid response format from AI");
          console.error("Invalid response format:", parsedResponse);
        }
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        toast.error("Could not parse the AI response");
        
        // Fallback: If parsing fails, just use the raw text
        setValue(responseText);
        onRichTextEditorChange(responseText);
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
      toast.error("Failed to generate content from AI");
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = () => {
    if (bulletPoints.length === 0) return;
    
    // Convert bullet points array to HTML list with proper formatting
    const htmlContent = `<ul style="list-style-type: disc; padding-left: 20px;">
      ${bulletPoints.map(point => `<li style="margin-bottom: 4px;">${point}</li>`).join('\n')}
    </ul>`;
    
    setValue(htmlContent);
    onRichTextEditorChange(htmlContent);
    setShowSuggestions(false);
  };

  const closeSuggestions = () => {
    setShowSuggestions(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          onClick={() => GenerateSummaryFromAI()}
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      
      {showSuggestions && bulletPoints.length > 0 && (
        <div className="border rounded-md p-3 mb-4 bg-slate-50">
          <h3 className="font-medium mb-2">Suggested Bullet Points:</h3>
          <ul className="list-disc pl-5 space-y-1 mb-3 text-sm">
            {bulletPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <div className="flex gap-2 justify-end">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={closeSuggestions}
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={applySuggestion}
              className="bg-primary"
            >
              Use These Points
            </Button>
          </div>
        </div>
      )}
      
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
                        onRichTextEditorChange(e.target.value);
          }}
          options={{
            // Enable proper list formatting
            lists: true,
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;