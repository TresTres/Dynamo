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

DynamoSession.prototype.add = function(name, deadline, startDate, priority, description)
{
  newMagro = new Magro(name, deadline, startDate, priority, description);
  this.push(newMagro);
}

DynamoSession.prototype.push = function(newMagro)
{
 this.heap.push(newMagro);
 this._size++;
 this.filterUp(heap.length - 1); 
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

  this.findByName = function(name)
  {
    currentMagro = this.head;
    while(currentMagro != this.tail)
    {
      if(currentMagro.getName() === name)
      {
        console.log("Magro found");
        return currentMagro; //we found it here
      }
      else if(currentMagro.hasAlongside == true)
      {
        alongside = currentMagro.alongside;
        if(alongside.getName === name)
        {
          console.log("Magro found");
          return alongside; //we found it in its sibling
        }
      }
      currentMagro = currentMagro.lower;
    }
    //failure
    console.log("Magro not found");
    return null;
  }

  this.removeByName = function(name)
  {
    pointOfInterest = findByName(name);
    if(pointOfInterest == null)
    {
      console.log("Magro removal failed");
      return this.head;
    }
    else
    {
      upper = pointOfInterest.upper;
      lower = pointOfInterest.lower;
      
      
      if(upper == null && lower == null)
      {
        //one level
        if(pointOfInterest.hasAlongside())
        {
          //move the head and tail to the sibling
          alongside = pointOfInterest.Alongside();
          this.head  = alongside;
          this.tail = lower;
          this._size--;
          console.log("Magro removed");
          return this.head;
        }
        //otherwise we're deleting this thing
        this.head = null;
        this.tail = null;
        this._size--;
        console.log("Hierarchy cleared");
        return null;
      }
      else if(upper == null && lower != null)
      {
        //head
        if(pointOfInterest.hasAlongside())
        {
          //move the head to the sibling
          alongside = pointOfInterest.Alongside();
          lower.upper = alongside;
          alongside.alongside = null;
          this.head = alongside;
          this._size--;
          console.log("Magro removed");
          return this.head;
        }
        //otherwise just remove the head
        lower.upper = null;
        this.head = lower;
        this._size--;
        console.log("Magro removed");
        return this.head;
      }
      else if(upper != null && lower == null)
      {
        //tail
        if(pointOfInterest.hasAlongside())
        {
          //move the tail to the sibling
          alongside = pointOfInterest.Alongside();
          upper.lower = alongside;
          alongside.alongside = null;
          this.tail = alongside;
          this._size--;
          console.log("Magro removed");
          return this.head;
        }
        //otherwise just remove the head
        upper.lower = null;
        this.tail = upper;
        this._size--;
        console.log("Magro removed");
        return this.head;
      
     }
     else  //neither of them are null
     {
        if(pointOfInterest.hasAlongside())
        {
          //move the links to the sibling
          alongside = pointOfInterest.Alongside();
          upper.lower = alongside;
          lower.upper = alongside;
          alongside.alongside = null;
          this._size--;
          console.log("Magro removed");
          return this.head;
        }
        //otherwise just connect the links vertically
        upper.lower = lower;
        lower.upper = upper;
        this._size--;
        console.log("Magro removed");
        return this.head;
     }
   }
  }

}

var myDynamoSession = new DynamoSession();

function addToSession(taskName, deadline, priorityNum, description){
	var now = new Date();
	
	var itr = myDynamoSession.add(taskName, deadline, now, priorityNum, description);
  	
	//itr is at the head??
  	if(itr = myDynamoSession.head)
  	{
    	console.log("At head");
  	}	
	var newAgenda="";

	for(var i=0; i<myDynamoSession._size; i++)
	{
    console.log("hi");
		newAgenda+="<div class=\"event-container\">"+
						"<div class=\"date-container\""+
							"<h2 class=\"date\">"+itr.deadline.getDate()+"th</h2>"+
							"<h2 class=\"month\">"+getMonth(itr.deadline.getMonth())+"</h2>"+
						"</div>"+
						"<h1 class=\"title\">"+itr.name+"</h1>"+
						"<p class=\"description\">"+itr.description+"</p>"+
					"</div>"

    itr = itr.lower;
	}
	
	document.getElementById("tasks").innerHTML=newAgenda;
	
}

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



