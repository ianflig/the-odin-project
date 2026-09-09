import { InputBox } from "./InputBox";

export function Skills({ defaultData, fn }) {
  return (
    <>
      <h3>Skills</h3>
      <InputBox label="Use commas to separate skills">
        <textarea
          name="skills"
          className="border border-black"
          value={defaultData.skills}
          onChange={(e) => {
            fn((prev) => ({ ...prev, skills: e.target.value }));
          }}
        ></textarea>
      </InputBox>
    </>
  );
}
