import './App.css';
import Home from './components/Home'
import Form from './components/Form'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className = "App-body">
      <h1>
        WordlSolver
      </h1>
    <a href='/form'>Test Form</a>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
