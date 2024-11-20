import CreatedModeles from './Components/CreatedModeles/CreatedModeles';
import CreateModel from './Components/CreateModel/createModel'
import FullModules from './Components/FullModule/CreatedModeles';
import Login from './Components/login/Login';
import Main from './Components/Main/Main';
import PersonalAccount from './Components/PersonalAccount/PersonalAccount';
import PassedModule from './Components/PassedModule/CreatedModeles'
import Register from './Components/rigister/register';
import Test from './Components/Test/Test';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import ModuleOverview from './Components/ModuleOverview/ModuleOverview';
import Match from './Components/Match/Match';
import Cards from './Components/Cards/Cards';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/createdModeles/:role' element={<CreatedModeles />} />
          <Route path='/createModel/:role' element={<CreateModel/>}/>
          <Route path='/personalAccount/:role' element={<PersonalAccount/>}/>
          <Route path='/fullModules/:role' element={<FullModules/>}/>
          <Route path='/passedModule/:role' element={<PassedModule/>}/>
          <Route path='/moduleOverview/:role' element={<ModuleOverview/>}/>
          <Route path='/match' element={<Match/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/cards' element={<Cards/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
