 

function Magro(name,deadline,startDate,importance)
{
  this.name = name;
  this.deadline = deadline;
  this.startDate = startDate;
  this.importance = importance;
  this.finished = false;
  
  
  this.taskList = [];
  this.numTasks = this.tasklist.length;
}

var sampleMagro = new Magro("Make my first magro", 
