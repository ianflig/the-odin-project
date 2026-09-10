import { InputBox } from "./InputBox";

export function Skills({ defaultData, fn }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-ink text-xs font-semibold tracking-[0.18em] uppercase">
        Skills
      </h3>
      <InputBox label="Use commas to separate skills">
        <textarea
          name="skills"
          value={defaultData.skills}
          onChange={(e) => {
            fn((prev) => ({ ...prev, skills: e.target.value }));
          }}
        ></textarea>
      </InputBox>
    </section>
  );
}
