import React from 'react';
import Copo1 from './Copo1';
import './App.css';
class App extends React.Component {
  	data = () => {
  		return (<div>Hi</div>);
  	}
  render(){


    return (
      <div className="bgColorGreen">
      	<button>Butto</button>
        <Copo1/>
        <h1 className="heading"> Rana</h1>
      </div>
    );
  }
}
export default App;
