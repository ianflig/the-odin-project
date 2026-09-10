import { InputBox } from "./InputBox.jsx";

export function PersonalDetails({ fn, defaultData }) {
  function handleChange(e) {
    const { name, value } = e.target;
    fn((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-ink text-xs font-semibold tracking-[0.18em] uppercase">
        Personal details
      </h3>
      <div className="grid grid-cols-[1fr_1fr] gap-3">
        <InputBox label="Full name">
          <input
            type="text"
            value={defaultData.fullName}
            name="fullName"
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Professional title">
          <input
            type="text"
            value={defaultData.professionalTitle}
            name="professionalTitle"
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Email">
          <input
            type="text"
            value={defaultData.email}
            name="email"
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Phone">
          <input
            type="text"
            value={defaultData.phone}
            name="phone"
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Location">
          <input
            type="text"
            value={defaultData.location}
            name="location"
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Website">
          <input
            type="text"
            value={defaultData.website}
            name="website"
            onChange={handleChange}
          />
        </InputBox>
      </div>
    </section>
  );
}
