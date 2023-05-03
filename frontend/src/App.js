import './App.css';
import Home from './components/Home'
import Info from './components/Info'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <div className='App-header'>
        Wordle Solver
      </div>
      <div>
      </div>
      <div className="App-body">
        <Info />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
