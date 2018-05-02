import React from 'react';
import TextEditor from './textEditor';
class Blog extends React.Component {
  render(){
    console.log(this.props.match);

    return (
      <div >
      blog
      <TextEditor />
      </div>
    );
  }
}
export default Blog;
