import { InputBox } from "./InputBox";

export function Experience({ data, fn, id }) {
  function handleChange(e, name) {
    fn((prev) => ({ ...prev, [name]: e.target.value }));
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h4>Role</h4>
          <button className="cursor-pointer" key={id} id={id}>
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
