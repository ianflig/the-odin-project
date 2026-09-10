import { InputBox } from "./InputBox";

export function EducationBox({ data, id, fn }) {
  function handleChange(e) {
    const { name, value } = e.target;

    fn((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [name]: value } : edu,
      ),
    }));
  }

  return (
    <>
      <div className="flex justify-between">
        <h1>Education</h1>
        <button className="cursor-pointer" id={id}>
          Remove
        </button>
      </div>
      <InputBox label="Level">
        <input
          type="text"
          value={data?.level}
          name="level"
          onChange={handleChange}
        />
      </InputBox>
      <InputBox label="School / Institution">
        <input
          type="text"
          value={data?.school}
          name="school"
          onChange={handleChange}
        />
      </InputBox>
      <InputBox label="Period">
        <input
          type="text"
          value={data?.period}
          name="period"
          onChange={handleChange}
        />
      </InputBox>
      <InputBox label="Information / Details">
        <textarea
          type="text"
          value={data?.details}
          name="details"
          onChange={handleChange}
        />
      </InputBox>
    </>
  );
}

export function Education() {}
