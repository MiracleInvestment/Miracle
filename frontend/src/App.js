import { BrowserRouter, Route, Routes } from 'react-router-dom'; //
// import { Home, Login, Logout, MyPage } from './login';

// import { AuthProvider } from './login/components/AuthProvider';
// import Navbar from './login/components/NavBar';
import Home from './scrollanimation/Home';
import Main from './Main';
import PastExam from './examinfo/PastExam';
import DetailExam from './examinfo/DetailExam';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/main" element={<Main />}/>
        <Route path="/callPastExam" element={<PastExam />} />
        <Route path="/detailExam/:id" element={<DetailExam />} />
        <Route path="/detailExam" element={<DetailExam />} />
        <Route path="/scoring" element={<Scoring />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
