import React from 'react';
import ToDo from './ToDo';
import { Route,Link } from 'react-router-dom';
import homeImg from '../images/house.png';
import blogImg from '../images/blogger.png';
import taskImg from '../images/clipboard.png';
import './SideMenu.css';
import './App.css';
class SideMenu extends React.Component {
  render(){


    return (
      <div className="SideMenu">
        <ul>
            <li><img className="iconMedium" src={homeImg} /><Link to="/">Home</Link></li>
            <li><img className="iconMedium" src={blogImg} /><Link to="/blog">Blog</Link></li>
            <li><img className="iconMedium" src={taskImg} /><Link to="todo">Todo</Link></li>

        </ul>
      </div>
    );
  }
}
export default SideMenu;
