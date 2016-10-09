/*
 * Hackathon Project HackNY Fall 2016
 * 
 * Dynamo.js is responsible for:
 * -managing the tree?
 */

function DynamoSession()
{

  this._size = 0;
  this.head = null;//highest (lowest in priority)
  this.tail = null; //lowest (highest in priority)
  
  this.add = function (otherName, otherDeadline,
                       otherStartDate, otherpriority)
  {
      var newMagro = Magro(otherName, otherDeadline,
                           otherStartDate, otherpriority);
      currentMagro = this.head;
      
      //empty
      if(currentMagro === null)
      {
        this.head = newMagro;
        this.tail = newMagro; 
        this._size++;
        console.log("Added first Magro");
        return newMagro;
      }
      //not empty
      else
      {   
        while(currentMagro != tail) //go down the list
       {
          switch(Magro.compare(currentMagro, newMagro))
              {
                case -1:
                  console.log("should insert lower");
                  currentMagro = currentMagro.lower; //go lower
                  break;

                case 0:
                  console.log("equal priority");
                  if(currentMagro.alongside == null)
                  {
                    newMagro.alongside = currentMagro; //add this at the same level
                    currentMagro.alongside = newMagro;
                    this._size++;
                    return newMagro;
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
                  newmagro.upper = upper; //attach the top
                  currentMagro.upper = newMagro; //reciprocrate from bottom
                  upper.lower = newMagro; //reciprocate from top
                  console.log("inserted new Magro");
                  this._size++;
                  return newMagro;
                  break;
                default:
                  console.log("Error: what the heck did you do?");
                  return null;
              }
        }
        //hit end of the hierarchy
        //currentMagro.lower = null
        newMagro.upper = currentMagro;
        newMagro.lower = currentMagro.lower;
        currentMagro.lower = newMagro;
        tail = newMagro;
        this._size++;
        console.log("Added a new tail");
        return newMagro;
      }            
  }

}
