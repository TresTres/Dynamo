 

function Magro(name,deadline,startDate,importance)
{
  //pertinent information about our magro
  this.name = name;
  this.deadline = deadline;
  this.startDate = startDate;
  this.importance = importance;
  //rank from 1 to 10
  //1 is the highest 
  this.finished = false;
  this.numTasks = 0;
  
  //each magro will have a list of task completions 
  //(think of git commit log)
  
  //start with empty tasklist
  this.taskList = [];

  //setter functions
  this.setName = function(name)
  {
    this.name = name;
  }
  
  this.setDeadline = function(deadline)
  {
    this.deadline = deadline;
  }
  //This will eventually cause a reordering or rebalance, idk how I want to do that yet. 
  //Am I going to create a tree object or a queue object?  
  this.setImportance = function(importance)
  {
    this.importance = importance;
  }

  //let's add a task
  this.doTask = function(message)
  {
    var task = {}
    task['message'] = message;
    task['number'] = this.numTasks+1; //start counting at one
    this.numTasks++;
    //when did we finish?
    var now = new Date();
    task['commitTime'] = now.toString();
    
    this.taskList.push(task);
  }

  //relate this magro to other magros
 // this.upper = null;
 // this.lower = null;
  
}


var now = new Date();
var deadline = new Date();
deadline.setHours(now.getHours()+1);

var sampleMagro = new Magro("Make my first magro",deadline.toString(), now.toString(), 1); 
