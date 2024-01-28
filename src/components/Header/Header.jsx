import { MdFlight } from "react-icons/md";

export default function Header() {
  return (
    <header className="flex  flex-col items-center py-3 mt-7">
      <MdFlight className="text-5xl mr-2" />
      <h1 className="text-5xl mt-5">Flight Search</h1>
    </header>
  );
}
