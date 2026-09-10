import { Experience } from "./Experience";
import { Education } from "./Education";

export function CVPaper({
  fullName,
  professionalTitle,
  email,
  phone,
  location,
  website,
  professionalSummary,
  skills,
  experience,
  education,
}) {
  const skillsArr = skills
    ?.split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <article className="border-line mx-auto w-full max-w-3xl rounded-2xl border bg-white p-6 shadow-lg sm:p-10">
      <header className="border-line flex flex-wrap items-start justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-ink text-4xl font-bold tracking-tight">
            {fullName}
          </h1>
          <p className="mt-1">{professionalTitle}</p>
        </div>
        <ul className="text-muted text-sm sm:text-right">
          <li>{email}</li>
          <li>{phone}</li>
          <li>{location}</li>
          <li>{website}</li>
        </ul>
      </header>

      <section className="mt-7">
        <h2 className="text-ink border-line mb-3 border-b pb-1 text-xs font-semibold tracking-[0.18em] uppercase">
          Profile
        </h2>
        <p className="text-sm leading-relaxed">{professionalSummary}</p>
      </section>

      <section className="mt-7">
        <h2 className="text-ink border-line mb-3 border-b pb-1 text-xs font-semibold tracking-[0.18em] uppercase">
          Experience
        </h2>
        <div className="flex flex-col gap-5">
          {experience.map((e) => (
            <Experience exp={e} key={e.id}></Experience>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-ink border-line mb-3 border-b pb-1 text-xs font-semibold tracking-[0.18em] uppercase">
          Education
        </h2>
        <div className="flex flex-col gap-5">
          {education.map((e) => (
            <Education edu={e} key={e.id}></Education>
          ))}
        </div>
      </section>

      <section className="mt-7">
        <h2 className="text-ink border-line mb-3 border-b pb-1 text-xs font-semibold tracking-[0.18em] uppercase">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-2">
          {skillsArr.map((skill, index) => (
            <li
              key={index}
              className="text-accent bg-accent/10 rounded-full px-3 py-1 text-xs font-medium"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
