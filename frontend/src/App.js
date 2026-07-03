import './App.css';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import MainComponent from './MainComponent';

function App() {
  return (
    <Router>
      <div>
        <header>
          <div>This is a multicontainer application.</div>
          <Link to="/">Go to home page</Link>
          <Link to="/otherpage">Go to other page</Link>
        </header>
        <div>
          <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/otherpage" element={<OtherPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
