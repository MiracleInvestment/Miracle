import { BrowserRouter, Route, Routes } from 'react-router-dom'; //
// import { Home, Login, Logout, MyPage } from './login';

// import { AuthProvider } from './login/components/AuthProvider';
// import Navbar from './login/components/NavBar';
import Main from './Home';

// const links = [
//   { href: '/my', title: 'Go to My Page' },
//   { href: '/login', title: 'Go to login' },
//   { href: '/', title: 'Go to index' },
// ];

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
