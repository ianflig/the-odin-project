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
    <div className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto grid max-w-[2600px] grid-cols-1 lg:grid-cols-[minmax(320px,380px)_1fr]">
        <aside className="border-line flex flex-col gap-7 border-r bg-white px-6 py-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <header>
            <h1 className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              CV MAKER
            </h1>
            <h2 className="text-ink mt-1 text-2xl font-bold">
              Build your profile
            </h2>
          </header>
          <PersonalDetails defaultData={data} fn={setData}></PersonalDetails>
          <ProfessionalSummary
            defaultData={data}
            fn={setData}
          ></ProfessionalSummary>
          <Skills defaultData={data} fn={setData}></Skills>
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-ink text-xs font-semibold tracking-[0.18em] uppercase">
                Experience
              </h3>
              <button
                className="text-accent bg-accent/10 hover:bg-accent/20 cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition"
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
            <div
              className="flex flex-col gap-3"
              data-section="experience"
              onClick={handleRemove}
            >
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
          </section>
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-ink text-xs font-semibold tracking-[0.18em] uppercase">
                Education
              </h3>
              <button
                className="text-accent bg-accent/10 hover:bg-accent/20 cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition"
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
            <div
              className="flex flex-col gap-3"
              data-section="education"
              onClick={handleRemove}
            >
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
          </section>
        </aside>
        <main className="px-4 py-8 lg:px-10">
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
            experience={data.experience}
            education={data.education}
          ></CVPaper>
        </main>
      </div>
    </div>
  );
}
