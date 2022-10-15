import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/Navigation/Navigation.js';
import Home from './routes/Home/Home.js';
import SignIn from './routes/SignIn/SignIn.js';

const App = () => {
  return ( 
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />}/>
        <Route path='/sign-in' element={<SignIn />}/>
      </Route>
    </Routes>
  )
};

export default App;
