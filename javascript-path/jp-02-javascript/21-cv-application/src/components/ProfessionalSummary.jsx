import { InputBox } from "./InputBox";

export function ProfessionalSummary({ defaultData, fn }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-ink text-xs font-semibold tracking-[0.18em] uppercase">
        Professional summary
      </h3>
      <InputBox label="Summary">
        <textarea
          name="professionalSummary"
          value={defaultData.professionalSummary}
          onChange={(e) => {
            fn((prev) => ({ ...prev, professionalSummary: e.target.value }));
          }}
        ></textarea>
      </InputBox>
    </section>
  );
}
