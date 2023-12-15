import './App.css';
import Auth from './pages/Auth';

function App() {
  return (
    <div className="App">
      <div className="area" >
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
      <div className='context'>
        <Auth />
      </div>
    </div>
  );
}

export default App;
