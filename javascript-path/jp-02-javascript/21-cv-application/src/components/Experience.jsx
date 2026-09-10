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
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h4>Role</h4>
          <button className="cursor-pointer" id={id}>
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
        <div className="flex">
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
            type="text"
            value={data?.accomplishments?.join("\n")}
            name="accomplishments"
            onChange={handleChange}
          />
        </InputBox>
      </div>
    </>
  );
}

export function Experience({ exp }) {
  return (
    <>
      <div className="flex justify-between">
        <h2>{exp.role || "Your role"}</h2>
        <span>{exp.period || "Your period"}</span>
      </div>
      <div className="flex justify-between">
        <h4>{exp.company || "Your Company"}</h4>
        <span>{exp.location || "Your location"}</span>
      </div>
      <ul>
        {exp.accomplishments.map((e, index) => {
          return <li key={index}>{e}</li>;
        })}
      </ul>
    </>
  );
}
