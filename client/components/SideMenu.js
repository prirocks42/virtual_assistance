import React from 'react';
import {Link} from 'react-router';
class SideMenu extends React.Component {
  render(){


    return (
      <div className="SideMenu">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog"> Blog</Link>
            </li>
            <li><Link to="/todo">Todo</Link></li>

        </ul>
      </div>
    );
  }
}
export default SideMenu;
