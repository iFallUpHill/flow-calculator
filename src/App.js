import InputForm from './components/InputForm';
import { StyledInput } from './components/Inputs';
import GCodePreview from './components/GCodePreview';
import GCodeDownload from './components/GCodeDownload';
import Credits from './components/Credits';
import { useStore } from './stores/store';

function App() {
  const fileName = useStore((state) => state.fileName);
  const setFileName = useStore((state) => state.setFileName);

  return (
  <div className="flex bg-slate-50">
    <aside className="h-screen sticky top-0 w-96 bg-white drop-shadow">
      <div className="m-8">
        <h1 className="text-3xl mb-2 font-bold">Flow Test Generator</h1>
        <section>
          <h2 className="text-xl mb-2 font-bold">GCode Preview</h2>
          <GCodePreview />
        </section>
        
        <section className="mt-4">
          <StyledInput type="text" value={fileName} label="File Name (Optional)" handleChange={(e) => setFileName(e.target.value)} />
          <GCodeDownload />
        </section>

        <section className="mt-4">
          <Credits />
        </section>
      </div>
    </aside>
    <main>
      <div className="m-8">
        <InputForm />
      </div>
    </main>
  </div>
  );
}

export default App;
