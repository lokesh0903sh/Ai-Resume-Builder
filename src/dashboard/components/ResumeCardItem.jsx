import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi';
import { toast } from 'sonner'

const ResumeCardItem = ({resume, refreshData}) => {

  const navigator= useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        setLoading(true);
        toast.success("Resume deleted successfully");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
        toast.error("Failed to delete resume");
      }
    );
  }

  return (
    <div>
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex items-center justify-center h-[380px] border-t-4 border-red-400 rounded-lg 
      hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer'
      style={{borderColor: resume?.themeColor}}>
            <img src='./src/assets/CV.png' style={{marginLeft: "20px"}} width="100px" height="100px"/>
      </div>
    </Link>
    <div className='border p-3 flex justify-between text-black' style={{background: resume?.themeColor}}>
      <h2 className='text-sm'>{resume.title}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger><MoreVertical className='h-4 w-4 cursor-pointer' /></DropdownMenuTrigger>
        <DropdownMenuContent>
        
          <DropdownMenuItem onClick={()=>navigator(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={()=> navigator("/my-resume/"+resume.documentId+"/view")}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={()=> navigator("/my-resume/"+resume.documentId+"/view")}>Download</DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setOpenAlert(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=> setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
            {loading ? <Loader2Icon className='animate-spin'/> : 'Delete'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </div>
  )
}

export default ResumeCardItem
