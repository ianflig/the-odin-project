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
    <div className="border-line flex flex-col gap-3 rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-ink text-sm font-semibold">Education</h4>
        <button
          className="cursor-pointer rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100"
          id={id}
        >
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
          value={data?.details}
          name="details"
          onChange={handleChange}
        />
      </InputBox>
    </div>
  );
}

export function Education({ edu }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-ink font-semibold">{edu.level || "Your level"}</h3>
        <span className="text-muted shrink-0 text-sm">
          {edu.period || "Your period"}
        </span>
      </div>
      <p className="text-sm">{edu.school || "Your school"}</p>
      {edu.details && (
        <p className="text-muted mt-1 text-sm leading-relaxed">{edu.details}</p>
      )}
    </div>
  );
}
