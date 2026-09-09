export function CVPaper({
  fullName,
  professionalTitle,
  email,
  phone,
  location,
  website,
  professionalSummary,
}) {
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
      </div>
    </>
  );
}
