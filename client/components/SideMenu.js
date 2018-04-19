import React from 'react';
import ToDo from './ToDo';
import { Route,Link } from 'react-router-dom';
import './SideMenu.css';
class SideMenu extends React.Component {
  render(){


    return (
      <div className="SideMenu">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog"> Blog</Link>
            </li>
            <li><Link to="todo">Todo</Link></li>

        </ul>
      </div>
    );
  }
}
export default SideMenu;
