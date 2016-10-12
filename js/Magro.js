/*
  Magro implementation - Hackathon Project HackNY fall 2016
 *
 * Magro.js is responsible for:
 * -managing incoming macro-task data
 * -making data readable and accessible
 * -linking the macro-tasks together by rank of priority
 */
var Magro = function(name,deadline,startDate,priority, description)
{
  //pertinent information about our magro
  var name = name;//string
  var deadline = deadline;//Date object
  var startDate = startDate;//Date object
  var priority = priority;//number from 1 to 10, but the range can be more
  var description = description; //string
   
  var finished = false; //new macro-tasks are not done
   
  
  //relate this magro to other magros
  var upper = null;
  var lower = null;
  
  //each magro will have a list of task completions 
  //(think of git commit log)
  
  //start with empty tasklist
  var taskList = [];
  var numTasks = 0; 

  //helper functions
  this.setName = function(n)
  {
    name = n;
  }
  
  this.setDeadline = function(d)
  {
    deadline = d;
  }
  
  this.setPriority = function(p)
  {
    priority = p;
    //run a reorder check in the DynamoSession class
  }
  
  this.setDescription = function(descrip)
  {
    description = descrip;
  }

  this.getName = function()
  {
    return name.toString();
  }

  this.getDeadline = function()
  {
    return deadline.toString();
  }
//////////All hail the mighty key/////////////
  this.getpriority = function()
  {
    return priority; //don't need string
  }
//////////////////////////////////////////////
  this.getStartDate = function()
  {
    return startDate.toString();
  }

  this.getNumTasks = function()
  {
    return taskList.length;
  }

  this.getDescription = function()
  {
    return description;
  }

  //getTaskList returns an array of strings
  this.getTaskList = function()
  {
    if(taskList.length == 0)
    {
      return "No tasks written.";
    }

    var taskStrings = "";
    for (var i = 0; i < taskList.length; i++)
    {
      for(var field in taskList[i])
      {
        taskStrings += field + ": " + taskList[i][field] + "\n";
      }
     taskStrings += "-----------------------------------------\n"; 
    }
    return taskStrings;
  }

///////////////////////////////////////DO SOME SHIT

  //let's add a task
  this.doTask = function(message)
  {
    var task = {}
    
    numTasks++;
    task['number'] = numTasks; //start counting at one
    

    task['message'] = message;    
    
    //when did we finish this task?
    var now = new Date();
    task['commitTime'] = now.toString();
    
    taskList.push(task);
    return "Task added!";
  }


  //finishing the Magro
  this.finish = function()
  {
    if(numTasks === 0)
    {
      finished = false;
      return "You haven't completed any tasks toward finishing this.\nIf you don't want to do this task/made it on mistake, delete it instead.";
    }
    finished = true;
    return "You're all done!";
    
    //record the completion in the DynamoSession class
  }

  //comparision function - static-ish??
  compare = function(Magro1, Magro2)
  {
    priority1 = Magro1.getpriority();
    priority2 = Magro2.getpriority();

    if(priority1 === priority2)
    {
      return 0;//1st and 2nd Magros have equal priority
    }

    else if(priority1 > priority2)
    {
      return 1;//2nd Magro is lower on the hierarchy (higher priority)
    }
    else
    {
      return -1; //1st Magro is lower on the hierarchy (higher priority)
    }
  }

//end of class definition
}



//TEST CODE//

var now = new Date();
var deadline = new Date();

deadline.setHours(now.getHours()+1);


var sampleMagro = new Magro("Make my first magro",deadline, now, 1);
var sampleMagro2 = new Magro("GET DAT PAPER", deadline, now, 2);
sampleMagro.doTask("Started");
sampleMagro.doTask("From");
sampleMagro.doTask("The Bottom");

console.log(sampleMagro.getTaskList());










