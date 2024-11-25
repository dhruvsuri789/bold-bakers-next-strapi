import { BeatLoader } from "react-spinners";

function loading() {
  return (
    <main className="flex items-center justify-center min-h-[60vh]">
      <BeatLoader color="#DC2626" />
    </main>
  );
}

export default loading;
