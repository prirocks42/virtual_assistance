import React from 'react';
import LoginSignup from './LoginSignup/LoginSignup';
import SearchAlexa from './SearchAlexa';
import SideMenu from './SideMenu';
import ToDo from './ToDo';
import {Route,Link} from 'react-router-dom';

import './App.css';
class App extends React.Component {
  render(){
    console.log(this.props.match);

    return (
      <div >
      <div className="header">
      <SearchAlexa/>
      </div>
      <div className="middleContent">
        <div className="sideMenu">
          <SideMenu/>
        </div>
          <div className="content" style={{ padding:'10px' }}>
          <Route path={`${this.props.match.url}todo`} exact component={ToDo}  />
          </div>
      </div>
      <div className="footer"></div>
      </div>
    );
  }
}
export default App;
