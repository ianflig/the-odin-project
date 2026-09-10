import { InputBox } from "./InputBox";

export function ExperienceBox({ data, fn, id }) {
  function handleChange(e) {
    let { name, value } = e.target;

    name === "accomplishments" ? (value = value.split("\n")) : undefined;

    fn((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [name]: value } : exp,
      ),
    }));
  }

  return (
    <div className="border-line flex flex-col gap-3 rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-ink text-sm font-semibold">Role</h4>
        <button
          className="cursor-pointer rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100"
          id={id}
        >
          Remove
        </button>
      </div>
      <InputBox label="Company">
        <input
          type="text"
          value={data?.company}
          name="company"
          onChange={handleChange}
        />
      </InputBox>
      <InputBox label="Role">
        <input
          type="text"
          value={data?.role}
          name="role"
          onChange={handleChange}
        />
      </InputBox>
      <div className="grid grid-cols-[1fr_1fr] gap-3">
        <InputBox label="Period">
          <input
            type="text"
            value={data?.period}
            name="period"
            onChange={handleChange}
          />
        </InputBox>
        <InputBox label="Location">
          <input
            type="text"
            value={data?.location}
            name="location"
            onChange={handleChange}
          />
        </InputBox>
      </div>
      <InputBox label="Accomplishments">
        <textarea
          value={data?.accomplishments?.join("\n")}
          name="accomplishments"
          onChange={handleChange}
        />
      </InputBox>
    </div>
  );
}

export function Experience({ exp }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-ink font-semibold">{exp.role || "Your role"}</h3>
        <span className="text-muted shrink-0 text-sm">
          {exp.period || "Your period"}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm">{exp.company || "Your company"}</p>
        <span className="text-muted shrink-0 text-sm">
          {exp.location || "Your location"}
        </span>
      </div>
      <ul className="marker:text-accent mt-2 list-disc pl-5 text-sm leading-relaxed">
        {exp.accomplishments.filter(Boolean).map((e, index) => {
          return <li key={index}>{e}</li>;
        })}
      </ul>
    </div>
  );
}
