import React from 'react';
import axios from 'axios';
import deleteImg from  '../images/rubbish-bin.png';
import taskImg from '../images/task.jpeg';
import doneImg from '../images/tick-inside-circle.png';
import './App.css';


import './Card.css';

var months = ['Jan','Feb','Mar','April','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];

class ToDo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            date:'',
            time:'',
            links:[],
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
            completed:false,
            links:this.state.links
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

    addLinks = (e) => {
        this.setState({
            links:e.target.value
        });
    }

    showAddTask = () => {
        
        return (<div className="modalAddTask" style={{zIndex:'100',width:'30%',height:'200px',opacity:'0.9',backgroundColor:'#303030',marginLeft:'350px',marginTop:'100px',border:'0.5px solid black',position:'fixed'}}>
            <form>
                <input  style={{display:'block'}} type="text" onChange={this.addTitle} required placeholder="Title" />
                <input style={{display:'block'}} type="time" onChange={this.addTime} required />
                <input style={{display:'block'}} type="date" onChange={this.addDate} required />
                <input placeholder="Enter any links for task." style={{display:'block'}} type="text" onChange={this.addLinks} required />

            </form>
            <center><button className="buttonMedium" style={{ width:'100px'}} onClick={this.addTask}>Add</button><button className="buttonMedium" style={{ width:'100px'}} onClick={this.hideAddTask}>Close</button></center>
        </div>);
    }


    taskCompleted = (task) => {
        delete task["_id"];
        console.log(task);
        axios.put(`/api/task`,{task:task})
        .then(result=>{
            if(result.status === 200 ){
                this.fetchTasks();
            }
        })
    }

    deleteTask = (task) => {
        const title=task.title;
        axios.put('/api/task?title='+title,{},{data:{title:title}})
        .then(result=>{
            if(result.status === 200 ){
                this.fetchTasks();
            }
        })
    }

    getDate = (date) => {
        var d = new Date(date);

        //return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`; 
        return "2 days to go"
    }

    getTime = (date,time) => {
        var d = new Date(`${date} ${time}`);

        return `${d.getHours()}:${d.getMinutes()}:  ${d.getSeconds()}`; 
    }

    displayTaskCard = (task,index) => {
        return <div key={index} className="Card" > 
                <div>
                    <button className="buttonSmall"><img src={doneImg} onClick={()=>{this.taskCompleted(task)}} className="icon" /></button>
                </div>
                <div>
                    {task.title}
                </div>
                <div>
                    <span style={{textAlign:'right',paddingLeft:'5px'}}>{this.getDate(task.deadlineDate)}</span>
                </div>
                <div>
                    <span><button className="buttonSmall"><img onClick={()=>{this.deleteTask(task)}} src={deleteImg} className="icon" /></button></span>
                </div>
            </div>
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
                return this.displayTaskCard(task,index);
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
                return this.displayTaskCard(task,index)
            })

        } else if (type === "recentlyFinishedTasks") {

            const currentDate = new Date();
            const tasks = []; 
            this.state.tasks.forEach((value,index)=>{
                const date = new Date(`${value.deadlineDate} ${value.deadlineTime}`); 
                return  date <= currentDate  && value.completed == true ? tasks.push(value) : null 
            })
            return tasks.map((task,index)=>{
                return this.displayTaskCard(task,index);
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
        console.log(this.state);
       this.fetchTasks();
    }

    blog = (value)=>{
        if(value){
            console.log(value);
        }
    }

    resizeImage = (e) => {
        console.log(e);
    }
    
  render(){
    
    return (
      <div >
        {this.state.showAddTask === true ? this.showAddTask() : null }
        <div>
        <button className="buttonSmall" onClick={()=>{this.setState({title:'',date:'',time:'',showAddTask:!this.state.showAddTask})}}>Add Task</button>

            </div>
        <div className="todoContent">
            <br/>
            <div className="upcomingTasks" >
                <h3>Upcoming</h3>
                    {this.showTasks('upcomingTasks')}
            </div>
            
            <div className="todoSideMenu">
                <div className="pendingTasks" className="upcomingTasks" style={{ height:'auto',width:'100%'}}>
                    <h3>Pending</h3>
                    <center>{this.showTasks('pendingTasks')}</center>
                </div>
                <hr/>
                
                <div className="recentlyFinishedTasks" className="upcomingTasks" style={{ height:'auto',overflowY:'scroll'}}>
                    <h3>Recently Finished</h3>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
export default ToDo;
