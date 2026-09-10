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
}) {
  const skillsArr = skills?.split(",");

  return (
    <>
      <div className="flex max-w-3/4 flex-col content-center justify-center">
        <span>Name: {fullName}</span>
        <span>Professional Title: {professionalTitle}</span>
        <span>Email: {email}</span>
        <span>Phone: {phone}</span>
        <span>Location: {location}</span>
        <span>Website: {website}</span>
        <span>Profile: {professionalSummary}</span>
        <span>Experience: {experience.map((e) => e.company)}</span>
        <span>Skills:</span>
        <span>{skillsArr.map((e) => e)}</span>
      </div>
    </>
  );
}
