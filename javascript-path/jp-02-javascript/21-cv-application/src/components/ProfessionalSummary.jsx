import { InputBox } from "./InputBox";

export function ProfessionalSummary({ defaultData, fn }) {
  return (
    <>
      <h3>Professional summary</h3>
      <InputBox label="Summary">
        <textarea
          className="border border-black"
          name="professionalSummary"
          value={defaultData.professionalSummary}
          onChange={(e) => {
            fn((prev) => ({ ...prev, professionalSummary: e.target.value }));
          }}
        ></textarea>
      </InputBox>
    </>
  );
}
