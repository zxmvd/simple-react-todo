import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import './App.css';
import  { extractPoint } from './extractHelper'


export default class App extends Component {
  state = Object.assign({
      newTask: '',
      newPoint: 0,
      tasks: [],
      showEditForm: false,
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

  editItem=(e)=>{
    e.preventDefault()
    this.setState({showEditForm:true})
    console.log('edit')

  }

  handleEdit=(e)=>{
    e.preventDefault()
    console.log('handle edit')
  }

  // editForm =(i)=>{
  //   return (
  //     <form onSubmit={()=>this.handleEdit(i)} style={{display: this.state.showEditForm? 'display':'none'}}>
  //           <TextField
  //               id="newTask"
  //               label="Name"
  //               value={this.state.newTask}
  //               required
  //               onChange={this.handleChange('newTask')}
  //             />
  //             <button type='submit'>New</button>
  //     </form>
  //   )
  // }




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
                    <ListItemText primary={`${task.points} Points Importance`}/>
                    <form onSubmit={()=>this.handleEdit(i)} style={{display: this.state.showEditForm? 'display':'none'}}>
            <TextField
                id="newTask"
                label="Name"
                value={this.state.newTask}
                required
                onChange={this.handleChange('newTask')}
              />
              <button type='submit'>New</button>
      </form>
                      <IconButton
                        aria-label="Edit Importance"
                        onClick={(e)=>this.editItem(e,i)}
                      >
                        <EditIcon />
                      </IconButton>
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
