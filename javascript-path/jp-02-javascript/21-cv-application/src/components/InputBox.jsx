export function InputBox({ label, children }) {
  return (
    <>
      <div className="flex flex-col">
        <label>{label}</label>
        {children}
      </div>
    </>
  );
}
