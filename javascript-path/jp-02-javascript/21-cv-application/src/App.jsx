import { PersonalDetails } from "./components/PersonalDetails";
import { ProfessionalSummary } from "./components/ProfessionalSummary";
import { Experience } from "./components/Experience";
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
    experience: [
      {
        id: crypto.randomUUID(),
        company: "Northstar Labs",
        role: "Senior Software Developer",
        period: "2022 — Present",
        location: "Remote",
        accomplishments: [
          "Led redesign of the onboarding flow, reducing drop-off by 28% in the first quarter.",
          "Built a scalable design system adopted across 4 product squads.",
          "Partnered with engineering and marketing to launch feature releases on schedule.",
        ],
      },
    ],
  });

  function createBox() {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: crypto.randomUUID(),
          company: "Your company",
          role: "Your role",
          period: "Your period",
          location: "Your location",
          accomplishments: [],
        },
      ],
    }));
  }

  function handleRemove(e) {
    const id = e.target.closest("[id]").id;
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id != id),
    }));
  }

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
          <div className="flex justify-between">
            <h1>Experience</h1>
            <button className="cursor-pointer" onClick={createBox}>
              Add
            </button>
          </div>
          <div onClick={handleRemove}>
            {data.experience
              ? data.experience.map((ele) => {
                  return (
                    <Experience
                      data={ele}
                      key={ele.id}
                      id={ele.id}
                      fn={setData}
                    ></Experience>
                  );
                })
              : undefined}
          </div>
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
            experience={data.experience || "Your experience"}
          ></CVPaper>
        </aside>
      </section>
    </>
  );
}
