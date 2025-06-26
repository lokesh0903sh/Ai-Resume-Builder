import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import GlobalApi from "./../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(
      (resp) => {
        setResumeInfo(resp.data.data);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-32">
          <h2 className="text-center text-2xl font-medium">
            {" "}
            Congrats! Your Ultimate AI generates Resume is ready !
          </h2>
          <p className="text-center text-gray-500">
            Now you are ready to download your resume and you can share unique
            resume url with your friends and family
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
        data={{
          text: "Hello Everyone, check out my new resume!",
          url: import.meta.env.VITE_BASE_URL + "my-resume/" + resumeId + "/view",
          title: resumeInfo?.firstName + " " + resumeInfo?.lastName + "'s Resume",
        }}
        onClick={() => console.log("shared successfully!")}
      >
            <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area">
        <ResumePreview/>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
