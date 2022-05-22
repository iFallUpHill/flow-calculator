import InputForm from './components/InputForm';
import GCodePreview from './components/GCodePreview';
import GCodeDownload from './components/GCodeDownload';
import Credits from './components/Credits';

function App() {


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
