import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import './App.css';
import  { extractPoint } from './extractHelper'
import EditPoint from './EditPoint'


export default class App extends Component {
  state = Object.assign({
      newTask: '',
      newPoint: 0,
      tasks: [],
  }, this.props.initialState);

  componentWillUpdate = this.props.onState || undefined;

  handleChange = key => event => {
    this.setState({ [key]: event.target.value });
  };


  handleSubmit = event => {
    event.preventDefault();
    if(extractPoint(this.state.newTask)){
      const { name:extractedTask, points:extractedPoint} = extractPoint(this.state.newTask);
      const newTasks = [
        ...this.state.tasks,
        { name: extractedTask, points: extractedPoint }
      ].sort((a, b)=>b.points-a.points);
      this.setState({ tasks: newTasks, newTask: '', newPoint:0 });
    } else {
      const newTasks = [
        ...this.state.tasks,
        { name: this.state.newTask, points: this.state.newPoint }
      ].sort((a, b)=>b.points-a.points);
      this.setState({ tasks: newTasks, newTask: '', newPoint:0 });
    }
  };

  deleteItem = index => event => {
    const newTasks = [...this.state.tasks];
    newTasks.splice(index, 1);
    this.setState({
      tasks: newTasks,
    });
  };

  handleEdit = (i, p)=>{
    console.log(i,p)
    let newTasks = this.state.tasks.map((task, index)=>(
      index===i?
      {...task, points:+p}
      : task
    ))
    this.setState({tasks:newTasks})

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TODO</h1>
        </header>
        <form onSubmit={this.handleSubmit} id="addtask">
          <TextField
            id="newTask"
            label="Name"
            value={this.state.newTask}
            required
            onChange={this.handleChange('newTask')}
          />
          <TextField
            id="point"
            label="Point"
            type="number"
            value={this.state.newPoint}
            onChange={this.handleChange('newPoint')}
          />
          <Button type="submit" aria-label="Add" color="primary">
            <AddIcon /> Add
          </Button>
        </form>
        <Grid container spacing={10}>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={6}>
            <List component="nav">
              {this.state.tasks.map((task, i) =>
                <div key={i} className={task.points>10? "critical":"normal"}>
                  <ListItem button>
                    <ListItemText primary={task.name} />
                    <EditPoint handleEdit={this.handleEdit} points={task.points} index={i}/>
                    <ListItemText primary={`${task.points} Points Importance`} />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Delete"
                        onClick={this.deleteItem(i)}
                      >
                      <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              )}
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}
