/*
 * Hackathon Project HackNY Fall 2016
 * 
 * Dynamo.js is responsible for:
 * -managing the tree?
 */

var DynamoSession = function()
{

  this._size = 0;
  this.head = null;//highest (lowest in priority)
  this.tail = null; //lowest (highest in priority)
  
  this.add = function (otherName, otherDeadline,
                       otherStartDate, otherpriority)
  {
      newMagro = new Magro(otherName, otherDeadline,
                           otherStartDate, otherpriority);
      currentMagro = this.head;
      
      //empty
      if(currentMagro === null)
      {
        this.head = newMagro;
        this.tail = newMagro; 
        this._size++;
        console.log("Added first Magro");
        return this.head;
      }
      //not empty
      else
      {   
        while(currentMagro != null) //go down the list
       {
          switch(Magro.compare(currentMagro, newMagro))
              {
                case -1:
                  console.log("should insert lower");
                  currentMagro = currentMagro.lower; //go lower
                  break;

                case 0:
                  console.log("equal priority");
                  if(currentMagro.hasAlongside() == false)
                  {
                    newMagro.alongside = currentMagro; //add this at the same level
                    newMagro.upper = currentMagro.upper;
                    newMagro.lower = currentMagro.lower;
                    //non reciprocated by upper and lower
                    currentMagro.alongside = newMagro;
                    this._size++;
                    return this.head;
                  }
                  else
                  {
                    console.log("No more than 2 tasks can have same priority!");
                    //quick fix
                    newMagro.setPriority(newMagro.priority - 1);
                    currentMagro = currentMagro.lower; //go lower
                  }
                  break;
                case 1:
                  console.log("should insert higher");
                  //already sorted in descending order, attach higher
                  upper = currentMagro.upper; //previous
                  newMagro.lower = currentMagro; //attach the bottom
                  newMagro.upper = upper; //attach the top
                  currentMagro.upper = newMagro; //reciprocrate from bottom
                  if(upper == null) //adding head
                  {
                    this.head = newMagro;
                    this._size++;
                    console.log("Added a new head");
                    return this.head;
                  }
                  upper.lower = newMagro; //reciprocate from top
                  console.log("Added a new Magro");
                  this._size++;
                  return this.head;
                  break;
                default:
                  console.log("Error: what the heck did you do?");
                  return null;
              }
        }
        //hit end of the hierarchy
        console.log("Hit end of hierarchy");
        currentMagro = this.tail;
        newMagro.upper = currentMagro;
        newMagro.lower = null;
        currentMagro.lower = newMagro;
        tail = newMagro;
        this._size++;
        console.log("Added a new tail");
        return this.head;
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

function addToSession(taskName, deadline, priorityNum){
	var now = new Date();
	
	var itr = myDynamoSession.add(taskName, deadline, now, priorityNum);
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
							"<h2 class=\"month\">"+itr.deadline.getMonth()+"</h2>"+
						"</div>"+
						"<h1 class=\"title\">"+itr.name+"</h1>"+
						"<p class=\"description\">test</p>"+
					"</div>"

    itr = itr.lower;
	}
	
	document.getElementById("tasks").innerHTML=newAgenda;
	
}



