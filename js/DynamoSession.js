/*
 * Hackathon Project HackNY Fall 2016
 * 
 * Dynamo.js is responsible for:
 * The Priority Queue
 */

var DynamoSession = function()
{

  this._size = 1;
  this.heap = [null]; //"empty", but we reserve position 0
}

//adding a new Magro to the session
DynamoSession.prototype.add = function(name, deadline, priority, description)
{
  startDate = new Date();
  newMagro = new Magro(name, deadline, startDate, priority, description);
  this.push(newMagro);
}

//add a new Magro to heap and sort
DynamoSession.prototype.push = function(newMagro)
{
 this.heap.push(newMagro);
 this._size++;
 this.filterUp(heap.length - 1);
}

//remove the Magro with lowest priority value
DynamoSession.prototype.pop = function()
{
  if(this._size < 2)
  {
    return "Cannot pop from an empty heap."
  }
  var targetMagro = this.heap[1];
  this.heap[1] = this.heap.pop(heap.length - 1);
  this.filterDown(1);
  return targetMagro;
}

DynamoSession.prototype.filterUp = function(magroID)
{
  while(magroID/2 > 0)//don't touch array position 0
  {
    var flag = Magro.compare(this.heap[magroID], this.heap[magroID/2]);
    /*Magro.compare(child, parent)
     *0 -> child and parent same priority
     *1 -> parent has lower priority than child **Desired
     *-1-> child has lower priority than parent
     */
    if(flag > -1)
    {
      break;
    }
    //simple switch
    temp = this.heap[magroID/2];
    this.heap[magroID/2] = this.heap[magroID];
    this.heap[magroID] = temp;

    magroID = magroID/2;
  }
}

DynamoSession.prototype.filterDown = function(magroID)
{
  while(2*magroID < this.heap.length)
  {
    //look at the farthest position first
    if(this.heap[2*magroID + 1] != null)
    {
      var childID = 2*magroID + 1;
    }
    else
    {
      var childID = 2*magroID;
    }

    var flag = Magro.compare(this.heap[magroID], this.heap[childID]);
    /*Magro.compare(parent, child)
     *0 -> parent and child same priority
     *1 -> child has lower priority than parent
     *-1-> parent has lower priority than child **Desired
     */
    if(flag < 1)
    {
      break;
    }
    //simple switch
    temp = this.heap[childID];
    this.heap[childID] = this.heap[magroID];
    this.heap[magroID] = temp;

    magroID = childID;
  }
}

DynamoSession.prototype.findByName = function(name)
{
  function checkName(name1, name)
  {
    return name1 === name;
  }
  var foundMagro = heap.find(checkName);
  if(!foundMagro) //falsey value
  {
    return "Specified Magro was not found";
  }
  else
  {
    return foundMagro;
  }
}


var myDynamoSession = new DynamoSession();
var newAgenda = "";

for(var i=1; i < myDynamoSession._size - 1; i++)
{
  itr = myDynamoSession.heap[i];
  console.log("hi we're at Magro#" + i);
  newAgenda+=
  "<div class=\"event-container\">"+
  "<div class=\"date-container\""+
  "<h2 class=\"date\">"+itr.deadline.getDate()+"th</h2>"+
  "<h2 class=\"month\">"+getMonth(itr.deadline.getMonth())+"</h2>"+
  "</div>"+
  "<h1 class=\"title\">"+itr.name+"</h1>"+
  "<p class=\"description\">"+itr.description+"</p>"+
  "</div>"
}

document.getElementById("tasks").innerHTML=newAgenda;



function getMonth(monthNum)
{
	switch(monthNum)
	{
		case 0:
		{
			return "JAN"
			break;
		}
		case 1:
		{
			return "FEB"
			break;
		}
		case 2:
		{
			return "MAR"
			break;
		}
		case 3:
		{
			return "APR"
			break;
		}
		case 4:
		{
			return "MAY"
			break;
		}
		case 5:
		{
			return "JUN"
			break;
		}
		case 6:
		{
			return "JUL"
			break;
		}
		case 7:
		{
			return "AUG"
			break;
		}
		case 8:
		{
			return "SEP"
			break;
		}
		case 9:
		{
			return "OCT"
			break;
		}
		case 10:
		{
			return "NOV"
			break;
		}
		case 11:
		{
			return "DEC"
			break;
		}
	}
}



