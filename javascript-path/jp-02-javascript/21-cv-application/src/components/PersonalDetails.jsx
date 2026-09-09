import { InputBox } from "./InputBox.jsx";

export function PersonalDetails() {
  let inputClassName = "border border-black";

  return (
    <>
      <h3>PERSONAL DETAILS</h3>
      <div className="grid grid-cols-[1fr_1fr] gap-2">
        <InputBox label="Full name">
          <input type="text" className={inputClassName} />
        </InputBox>
        <InputBox label="Professional title">
          <input type="text" className={inputClassName} />
        </InputBox>
        <InputBox label="Email">
          <input type="text" className={inputClassName} />
        </InputBox>
        <InputBox label="Phone">
          <input type="text" className={inputClassName} />
        </InputBox>
        <InputBox label="Location">
          <input type="text" className={inputClassName} />
        </InputBox>
        <InputBox label="Website">
          <input type="text" className={inputClassName} />
        </InputBox>
      </div>
    </>
  );
}
