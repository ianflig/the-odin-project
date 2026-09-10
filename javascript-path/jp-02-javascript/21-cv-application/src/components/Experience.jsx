import { InputBox } from "./InputBox";

export function Experience({ data, fn, id }) {
  function handleChange(e) {
    const { name, value } = e.target;
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
            value={data?.company || "Company"}
            name="company"
            onChange={handleChange}
          />
        </InputBox>
      </div>
    </>
  );
}
