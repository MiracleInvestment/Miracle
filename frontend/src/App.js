import { BrowserRouter, Route, Routes } from 'react-router-dom'; //
// import { Home, Login, Logout, MyPage } from './login';

// import { AuthProvider } from './login/components/AuthProvider';
// import Navbar from './login/components/NavBar';
import Home from './Home';
import Main from './Main';
import PastExam from './PastExam';
import DetailExam from './DetailExam';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/main" element={<Main />}/>
        <Route path="/callPastExam" element={<PastExam />} />
        <Route path="/detailExam" element={<DetailExam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
