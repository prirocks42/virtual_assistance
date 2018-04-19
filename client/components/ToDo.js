import React from 'react';
import axios from 'axios';
import deleteImg from  '../images/delete.png';
import taskImg from '../images/task.jpeg';
import doneImg from '../images/done.png';
import './Card.css';

var months = ['Jan','Feb','Mar','April','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];

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
            deadlineDate:this.state.date,
            deadlineTime:this.state.time,
            pending:false,
            completed:true,
            links:[]
        };
        let tasks= this.state.tasks;
        tasks.push(task);

        if(this.verifyData() === true){
            axios.post('/api/task',{
                task:task
            }).then(response=>{
                if(response.status === 200){
                    this.fetchTasks();
                }
            })

        } else{
        }
    }

    hideAddTask = () => {
        this.setState({
            showAddTask:false
        });
    }    

    showAddTask = () => {
        return (<div style={{zIndex:'100',width:'30%',height:'200px',marginLeft:'350px',marginTop:'100px',border:'2px solid black',position:'fixed',backgroundColor:'#d6d4f7'}}>
            <input  style={{display:'block'}} type="text" onChange={this.addTitle} required placeholder="Title" />
            <input style={{display:'block'}} type="time" onChange={this.addTime} required />
            <input style={{display:'block'}} type="date" onChange={this.addDate} required />
            <center><button onClick={this.addTask}>Add</button><button onClick={this.hideAddTask}>Close</button></center>
        </div>);
    }


    taskCompleted = (id) => {
        // axios.get(`/api/task?id=${id}`)
        // .then(result=>{

        // })
    }

    getDate = (date) => {
        var d = new Date(date);

        return `${d.getDate()} - ${months[d.getMonth()]} - ${d.getFullYear()}`; 
    }

    getTime = (date,time) => {
        var d = new Date(`${date} ${time}`);

        return `${d.getHours()} - ${d.getMinutes()} - ${d.getSeconds()}`; 
    }
    showTasks = (type) => {
        if(type === "upcomingTasks") {

            const currentDate = new Date();
            const tasks = []; 
            this.state.tasks.forEach((value,index)=>{
                const date = new Date(`${value.deadlineDate} ${value.deadlineTime}`); 
                 date > currentDate ? tasks.push(value) : null 
            })
            tasks.sort((a,b)=> a.deadlineDate > b.deadlineDate? true:false);
            return tasks.map((task,index)=>{
                return <div key={index} className="Card" > 
                        <span style={{textAlign:'left',paddingLeft:'5px'}}>
                            <span  style={{fontSize:'1em'}}><img src={taskImg} style={{width:'40px'}}  />{task.title}</span>
                        </span>
                        <span style={{textAlign:'left',paddingLeft:'5px'}}><br/>Deadline Date: {this.getDate(task.deadlineDate)}</span>
                        <span style={{textAlign:'left',paddingLeft:'5px'}}><br/>Deadline Time: {this.getTime(task.deadlineDate,task.deadlineTime)}</span>
                        <span><center><img src={doneImg} onClick={()=>{this.taskCompleted(task['_id'])}} style={{width:'40px',marginRight:'15px' }} /><img onClick={()=>{this.deleteTask(task['_id'])}} src={deleteImg} style={{width:'40px' }} /></center></span>
                </div>
            })
        } else if (type === "pendingTasks") {

            const currentDate = new Date();
            const tasks = []; 
            this.state.tasks.forEach((value,index)=>{
                const datei = new Date(`${value.deadlineDate} ${value.deadlineTime}`); 
                  datei < currentDate ? tasks.push(value) : null 
            })

            tasks.sort((a,b)=> a.deadlineDate < b.deadlineDate? true:false);
            return tasks.map((task,index)=>{
                return <div key={index} className="Card" > 
                        <span style={{textAlign:'left',paddingLeft:'5px'}}>
                            <span  style={{fontSize:'1em'}}><img src={taskImg} style={{width:'40px'}}  />{task.title}</span>
                        </span>
                        <span style={{textAlign:'left',paddingLeft:'5px'}}><br/>Deadline Date: {this.getDate(task.deadlineDate)}</span>
                        <span style={{textAlign:'left',paddingLeft:'5px'}}><br/>Deadline Time: {this.getTime(task.deadlineDate,task.deadlineTime)}</span>
                        <span><center><img src={doneImg} onClick={()=>{this.taskCompleted(task['_id'])}} style={{width:'40px',marginRight:'15px' }} /><img onClick={()=>{this.deleteTask(task['_id'])}} src={deleteImg} style={{width:'40px' }} /></center></span>
                </div>
            })

        } else if (type === "recentlyFinishedTasks") {

            const currentDate = new Date();
            const tasks = []; 
            this.state.tasks.forEach((value,index)=>{
                const date = new Date(`${value.deadlineDate} ${value.deadlineTime}`); 
                return  date <= currentDate  && value.completed == true ? tasks.push(value) : null 
            })
            return tasks.map((task,index)=>{
                return <div key={index} className="Card" > 
                        <span style={{textAlign:'left',paddingLeft:'5px'}}>
                            <span  style={{fontSize:'1em'}}><img src={taskImg} style={{width:'40px'}}  />{task.title}</span>
                        </span>
                        <span style={{textAlign:'left',paddingLeft:'5px'}}><br/>Deadline Date: {this.getDate(task.deadlineDate)}</span>
                        <span style={{textAlign:'left',paddingLeft:'5px'}}><br/>Deadline Time: {this.getTime(task.deadlineDate,task.deadlineTime)}</span>
                        <span><center><img src={doneImg} onClick={()=>{this.taskCompleted(task['_id'])}} style={{width:'40px',marginRight:'15px' }} /><img onClick={()=>{this.deleteTask(task['_id'])}} src={deleteImg} style={{width:'40px' }} /></center></span>
                </div>
            })

        }
    }

    fetchTasks = () => {
        axios.get('/api/tasks')
        .then(tasks=>{
           if(tasks.status === 200 && tasks.data.status === 200){
               this.setState({
                   tasks:tasks.data.result
               });
           }
        });
    }
    componentDidMount = ()=>{
       this.fetchTasks();
    }
    
  render(){
    return (
      <div >
        <center><button onClick={()=>{this.setState({title:'',date:'',time:'',showAddTask:!this.state.showAddTask})}}>Add Task</button></center>
        {this.state.showAddTask === true ? this.showAddTask() : null }
        <hr/> 
        <h3>Upcoming Tasks</h3>
        <div className="upcomingTasks" style={{ height:'400px',width:'100%',overflowX:'scroll'}}>
            <center>{this.showTasks('upcomingTasks')}</center>
        </div>
        <hr/>
        <h3>Pending Tasks</h3>
        <div className="pendingTasks" className="upcomingTasks" style={{ height:'400px',width:'100%',overflowX:'scroll'}}>
            <center>{this.showTasks('pendingTasks')}</center>
        </div>
        <hr/>
        <h3>Recently Finished Tasks</h3>
        <div className="recentlyFinishedTasks" className="upcomingTasks" style={{ height:'400px',width:'100%',overflowX:'scroll'}}></div>
      </div>
    );
  }
}
export default ToDo;
