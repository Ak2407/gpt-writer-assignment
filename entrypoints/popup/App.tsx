import "../../assets/tailwind.css";
import "./App.css";

function App() {
  return (
    <div className="bg-white p-6">
      <div className="flex flex-col gap-4 text-slate-800 items-center justify-center ">
        <h1 className="text-2xl">Assigment submission by Akshit Gupta</h1>
        <a
          className="text-slate-500 underline text-lg"
          href="https://github.com/Ak2407/gpt-writer-assignment"
          target="_blank"
        >
          github submission link
        </a>

        <a
          className="text-slate-500 underline text-lg"
          href="https://github.com/user-attachments/assets/4da11951-47c2-449c-877b-5cf321e8a586"
          target="_blank"
        >
          video for demo
        </a>
        <div className="flex gap-4 items-center justify-center">
          <a
            className="text-slate-500 underline text-lg"
            href="https://github.com/Ak2407"
            target="_blank"
          >
            Github
          </a>
          <a
            className="text-slate-500 underline text-lg"
            href="https://www.akshit.app/"
            target="_blank"
          >
            Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
