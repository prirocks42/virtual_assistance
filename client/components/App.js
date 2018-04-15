import React from 'react';
import LoginSignup from './LoginSignup/LoginSignup';
import SearchAlexa from './SearchAlexa';
import SideMenu from './SideMenu';
import './App.css';
class App extends React.Component {
  render(){


    return (
      <div >
      <div className="header">
      <SearchAlexa/>
      </div>
      <div className="middleContent">
        <div className="sideMenu">
          <SideMenu />
        </div>
          <div className="content">
          {this.props.children}
          </div>
      </div>
      <div className="footer"></div>
      	
      </div>
    );
  }
}
export default App;
