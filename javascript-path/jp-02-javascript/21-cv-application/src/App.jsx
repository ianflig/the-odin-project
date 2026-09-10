import { PersonalDetails } from "./components/PersonalDetails";
import { ProfessionalSummary } from "./components/ProfessionalSummary";
import { ExperienceBox } from "./components/Experience";
import { EducationBox } from "./components/Education";
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
    education: [
      {
        id: crypto.randomUUID(),
        level: "O' Level",
        school: "Mtshabezi High School",
        period: "2018 — 2021",
        details:
          "Passed 8 subjects including Mathematics, English Language, and Physical Science.",
      },
    ],
  });

  function createBox(section, newItem) {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: crypto.randomUUID(), ...newItem }],
    }));
  }

  function handleRemove(e) {
    const id = e.target.closest("[id]").id;
    const section = e.currentTarget.dataset.section;
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((e) => e.id != id),
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
            <button
              className="cursor-pointer"
              onClick={() => {
                createBox("experience", {
                  company: "",
                  role: "",
                  period: "",
                  location: "",
                  accomplishments: [],
                });
              }}
            >
              Add
            </button>
          </div>
          <div data-section="experience" onClick={handleRemove}>
            {data?.experience?.map((ele) => {
              return (
                <ExperienceBox
                  data={ele}
                  key={ele.id}
                  id={ele.id}
                  fn={setData}
                ></ExperienceBox>
              );
            })}
          </div>
          <div className="flex justify-between">
            <h1>Education</h1>
            <button
              className="cursor-pointer"
              onClick={() => {
                createBox("education", {
                  level: "",
                  school: "",
                  period: "",
                  details: "",
                });
              }}
            >
              Add
            </button>
          </div>
          <div data-section="education" onClick={handleRemove}>
            {data?.education?.map((ele) => {
              return (
                <EducationBox
                  key={ele.id}
                  id={ele.id}
                  data={ele}
                  fn={setData}
                ></EducationBox>
              );
            })}
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
