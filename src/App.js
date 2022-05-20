import InputForm from './components/InputForm';
import GCodePreview from './components/GCodePreview';

function App() {
  return (
    <div className="m-8">
      <h1 className="text-3xl mb-2 font-bold">
        ExtrusionSystemBenchmark.js
      </h1>
      <InputForm />
      <GCodePreview />
    </div>
  );
}

export default App;
