import React from 'react';
import LoginSignup from './LoginSignup/LoginSignup';
class SearchAlexa extends React.Component {
  render(){

    return (
      <div style={{width:'100%' }}>
      <center><input style={{width:'50%' }} type="text" placeholder="Ask me anything" /></center>
      </div>
    );
  }
}
export default SearchAlexa;
