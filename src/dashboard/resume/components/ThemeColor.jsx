import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Check, Palette } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import GlobalApi from './../../../../service/GlobalApi'
import { data, useParams } from 'react-router-dom'

const ThemeColor = () => {
    const colors=[
        "#2c3e50",   // Dark Blue (Midnight Blue)
        "#3498db",   // Medium Blue (Curious Blue)
        "#1a5276",   // Deep Navy Blue
        "#4a69bd",   // Royal Blue
        "#192a56",   // Dark Navy
        
        // Professional Greens (Best for environment, healthcare, education)
        "#27ae60",   // Emerald Green
        "#2ecc71",   // Mint Green  
        "#16a085",   // Teal
        "#006266",   // Deep Teal
        "#20bf6b",   // Jade
        
        // Professional Reds & Warm Tones (Best for marketing, creative roles)
        "#c0392b",   // Dark Red
        "#e74c3c",   // Brick Red
        "#922b21",   // Burgundy
        "#cb4335",   // Pomegranate
        "#e67e22",   // Carrot Orange
        
        // Purples & Pinks (Best for creative, design, innovation)
        "#6c3483",   // Deep Purple
        "#8e44ad",   // Wisteria Purple
        "#9b59b6",   // Amethyst Purple
        "#6F1E51",   // Magenta
        "#B53471",   // Fuchsia
        
        // Neutrals & Earth Tones (Best for legal, academic, traditional)
        "#2e4053",   // Charcoal
        "#566573",   // Slate Gray
        "#7f8c8d",   // Gray
        "#4b6584",   // Denim Blue
        "#5d4037",   // Brown
    ]
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const [customColor, setCustomColor] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const {resumeId} = useParams();

    const onColorSelect = (color) => {
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        })

        const data = {
            data: {
                themeColor: color
            }
        }
        // Close the popover when selecting a predefined color
        GlobalApi.UpdateResumeDetail(resumeId, data).then(
            (resp) => {
                toast.success("Theme color updated successfully");
            }
            , (error) => {
                toast.error("Failed to update theme color");
            }
        );
        setIsOpen(false);
    }
    
    const handleCustomColorInput = (e) => {
        setCustomColor(e.target.value);
    }
    
    const applyCustomColor = () => {
        // Check if the color is a valid hex code
        if (/^#([0-9A-F]{3}){1,2}$/i.test(customColor)) {
            onColorSelect(customColor);
            // The popover will close due to onColorSelect setting isOpen to false
        } else {
            toast.error("Please enter a valid hex color code");
            // Keep the popover open if there's an error
        }
    }
        
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
        <Palette className="h-4 w-4" /> 
          <span>Theme</span>
          {resumeInfo?.themeColor && (
            <div 
              className="w-3 h-3 rounded-full ml-1" 
              style={{background: resumeInfo.themeColor}} 
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h2 className='m-2 font-medium'>Select Theme Color</h2>
        
        {/* Predefined colors */}
        <div className='grid grid-cols-5 gap-3 mb-4'>
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`w-5 h-5 rounded-full cursor-pointer hover:scale-110 transition-transform ${
                resumeInfo?.themeColor === item ? 'ring-2 ring-offset-1 ring-black dark:ring-white' : ''
              }`}
              style={{background: item}}
              title={item}
            />
          ))}
        </div>
        
        {/* Divider with text */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-gray-800 px-2 text-xs text-gray-500">or pick your own</span>
          </div>
        </div>
        
        {/* Custom color picker */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 flex items-center gap-2 border rounded-md p-1 pl-2">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0" 
              style={{background: customColor || '#ffffff'}}
            />
            <Input
              type="text"
              value={customColor}
              onChange={handleCustomColorInput}
              placeholder="#000000"
              className="h-8 border-0 p-0 focus-visible:ring-0"
            />
          </div>
          
          <Button 
            size="icon"
            onClick={applyCustomColor}
            title="Apply custom color"
            className="h-9 w-9"
            disabled={!customColor}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeColor