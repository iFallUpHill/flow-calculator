import InputForm from './components/InputForm';
import { Input, StyledInput } from './components/Inputs';
import GCodePreview from './components/GCodePreview';
import GCodeDownload from './components/GCodeDownload';
import { useStore } from './stores/store';

function App() {
  const fileName = useStore((state) => state.fileName);
  const setFileName = useStore((state) => state.setFileName);

  return (
  <div className="flex">
    <aside className="h-screen sticky top-0 w-96">
      <div className="m-8">
        <h1 className="text-3xl mb-2 font-bold">Flow Test Generator</h1>
        <h2 className="text-xl mb-2 font-bold">GCode Preview</h2>
        <div className="h-80">
          <GCodePreview />
          <StyledInput type="text" value={fileName} label="File Name (Optional)" handleChange={(e) => setFileName(e.target.value)} />
          <GCodeDownload />
        </div>
      </div>
    </aside>
    <main>
      <div className="m-8">
        <h2 className="text-xl mb-2 font-bold">Settings</h2>
        <InputForm />
      </div>
    </main>
  </div>
  );
}

export default App;
