import React from 'react';

class ToDo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            date:'',
            time:'',
            showAddTask:false,
            tasks:[{title:'Na'}]
        }
    }

    addTime = (e)=>{
        this.setState({
            time:e.target.value
        });
    }
    addDate = (e)=>{
        this.setState({
            date:e.target.value
        });
    }

    addTitle = (e)=>{
        this.setState({
            title:e.target.value
        });
    }

    verifyData = () => {
        const data = this.state;
        if(data.title && data.date && data.time){
            return true;
        } else 
        return false;
    }

    addTask = () => {
        const task = {
            title:this.state.title,
            date:this.state.date,
            time:this.state.time,
            pending:false,
            upcoming:true,
            completed:false
        };
        let tasks= this.state.tasks;
        tasks.push(task);

        if(this.verifyData() === true){
            this.setState({
                tasks:tasks,
                showAddTask:false
            });

        } else{
        }
    }

    showAddTask = () => {
        return (<div style={{zIndex:'100',width:'30%',height:'200px',marginLeft:'350px',marginTop:'100px',border:'2px solid black',position:'fixed',backgroundColor:'#d6d4f7'}}>
            <input  style={{display:'block'}} type="text" onChange={this.addTitle} required placeholder="Title" />
            <input style={{display:'block'}} type="time" onChange={this.addTime} required />
            <input style={{display:'block'}} type="date" onChange={this.addDate} required />
            <button onClick={this.addTask}>Add</button>
        </div>);
    }

    showTasks = (type) => {
        console.log(this.state.tasks);
        return this.state.tasks.map((task,index)=>{
            return <li style={{display:'inline'}}>{task.title}</li>
        })
    }
    
  render(){
    return (
      <div >
        <center><button onClick={()=>{this.setState({title:'',date:'',time:'',showAddTask:!this.state.showAddTask})}}>Add Task</button></center>
        {this.state.showAddTask === true ? this.showAddTask() : null }
        <div className="upcomingTasks" style={{ height:'100px',overflowY:'scroll'}}>
            {this.showTasks('upcomingTasks')}
        </div>
        <hr/>
        <div className="pendingTasks"></div>
        <hr/>
        <div className="recentlyFinishedTasks"></div>
      </div>
    );
  }
}
export default ToDo;
