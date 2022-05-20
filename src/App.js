import InputForm from './components/InputForm';
import GCodePreview from './components/GCodePreview';
import GCodeDownload from './components/GCodeDownload';

function App() {
  return (
  <div className="flex">
    <aside className="h-screen sticky top-0 w-96">
      <div className="m-8">
        <h1 className="text-3xl mb-2 font-bold">Flow Test Generator</h1>
        <h2 className="text-xl mb-2 font-bold">GCode Preview</h2>
        <div className="h-80">
          <GCodePreview />
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
