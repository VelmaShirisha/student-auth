import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Student from './pages/Student';
import Dean from './pages/Dean';
import SlotBooking from './pages/SlotBooking';
import SessionDetails from './pages/SessionDetails';

import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/student' />
        </Route>
        <Route path='/student' exact>
         <Student />
        </Route>
        <Route path='/dean'>
         <Dean />
        </Route>
        <Route path='/slot'>
          <SlotBooking />
        </Route>
        <Route path='/session'>
          <SessionDetails />
        </Route>
      </Switch>
    </Layout>

  );
}

export default App;
