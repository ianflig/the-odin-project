import { PersonalDetails } from "./components/PersonalDetails";
import { ProfessionalSummary } from "./components/ProfessionalSummary";
import { Skills } from "./components/Skills";
import { CVPaper } from "./components/CVPaper";
import { useState } from "react";

export function App() {
  const [data, setData] = useState({
    fullName: "Sandy",
    professionalTitle: "Software Developer",
    email: "lorem@email.com",
    phone: "+54 1323473284",
    location: "Buenos Aires, Argentina",
    website: "lorem.dev",
    professionalSummary:
      "Software developer with 5 year of experience creating intuitive digital experiences for SaaS and consumer products. Skilled in design systems, UX strategy, and cross-functional collaboration.",
    skills:
      "JavaScript, React, Node.js, Express, MongoDB, SQL, Git, Docker, AWS",
  });
  return (
    <>
      <section className="grid min-h-screen grid-cols-[1fr_2fr]">
        <aside className="flex flex-col">
          <h1>CV MAKER</h1>
          <h2>BUILD YOUR PROFILE</h2>
          <PersonalDetails defaultData={data} fn={setData}></PersonalDetails>
          <ProfessionalSummary
            defaultData={data}
            fn={setData}
          ></ProfessionalSummary>
          <Skills defaultData={data} fn={setData}></Skills>
        </aside>
        <aside className="flex flex-col items-center">
          <CVPaper
            fullName={data.fullName || "Your Name"}
            professionalTitle={
              data.professionalTitle || "Your Professional Title"
            }
            email={data.email || "Your email"}
            phone={data.phone || "Your phone"}
            location={data.location || "Your location"}
            website={data.website || "Your website"}
            professionalSummary={
              data.professionalSummary || "Your professional summary"
            }
            skills={data.skills || "Your skills"}
          ></CVPaper>
        </aside>
      </section>
    </>
  );
}
