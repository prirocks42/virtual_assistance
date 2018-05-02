import React from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

class TextEditor extends React.Component {
  render(){
    const modules={
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ]
      };
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
    return (
      <div >
                <ReactQuill onSelect={this.resizeImage} modules={modules} formats={formats} theme="snow" onChange={this.blog} value={'this.state.text'}/>

      </div>
    );
  }
}
export default TextEditor;
