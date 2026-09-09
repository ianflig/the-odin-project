import { PersonalDetails } from "./components/PersonalDetails";

export function App() {
  return (
    <>
      <section className="grid min-h-screen grid-cols-[1fr_2fr]">
        <aside className="flex flex-col">
          <h1>CV MAKER</h1>
          <h2>BUILD YOUR PROFILE</h2>
          <PersonalDetails></PersonalDetails>
        </aside>
        <aside className="flex flex-col"></aside>
      </section>
    </>
  );
}
