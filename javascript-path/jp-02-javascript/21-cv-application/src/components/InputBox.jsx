export function InputBox({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-muted text-xs font-medium">{label}</label>
      {children}
    </div>
  );
}
