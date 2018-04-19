import React from 'react';
import {Route,Link} from 'react-router-dom';

class Login extends React.Component {
  render(){
    console.log(this.props.match);
    return (
      <div >
     Login
      </div>
    );
  }
}
export default Login;
