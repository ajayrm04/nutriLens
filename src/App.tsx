import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AnalyzePage } from './components/AnalyzePage';
import { Chatbot } from './components/Chatbot';

function App() {
  const path = window.location.pathname;

  return (
    <header>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <Navbar />
      {path === '/analyze' ? <AnalyzePage /> : <HomePage />}
      <Chatbot />
    </div>
    </header>
  );
}

export default App;