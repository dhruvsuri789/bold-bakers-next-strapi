import { BeatLoader } from "react-spinners";

function loading() {
  return (
    <main className="absolute inset-0 flex items-center justify-center">
      <BeatLoader color="#DC2626" />
    </main>
  );
}

export default loading;
