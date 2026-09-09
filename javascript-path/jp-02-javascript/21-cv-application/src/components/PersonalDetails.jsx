import { InputBox } from "./InputBox.jsx";

export function PersonalDetails({ fn, defaultData }) {
  let inputClassName = "border border-black";

  function handleChange(e) {
    const { name, value } = e.target;
    fn((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <h3>PERSONAL DETAILS</h3>
      <div className="grid grid-cols-[1fr_1fr] gap-2">
        <InputBox label="Full name">
          <input
            type="text"
            value={defaultData.fullName}
            className={inputClassName}
            name="fullName"
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Professional title">
          <input
            type="text"
            value={defaultData.professionalTitle}
            name="professionalTitle"
            className={inputClassName}
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Email">
          <input
            type="text"
            value={defaultData.email}
            name="email"
            className={inputClassName}
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Phone">
          <input
            type="text"
            value={defaultData.phone}
            name="phone"
            className={inputClassName}
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Location">
          <input
            type="text"
            value={defaultData.location}
            name="location"
            className={inputClassName}
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Website">
          <input
            type="text"
            value={defaultData.website}
            name="website"
            className={inputClassName}
            onChange={handleChange}
          />
        </InputBox>
      </div>
    </>
  );
}
