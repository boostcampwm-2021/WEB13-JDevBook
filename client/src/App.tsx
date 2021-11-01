import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';

const App = () => {

  return (
    <div>
      <Route exact path='/' component={LoginPage} />
    </div>
  )
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           JDevBook의 위대한 시작
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
