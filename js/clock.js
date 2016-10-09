function startTime(elementID, elementID2) {	
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById(elementID).innerHTML = h + ":" + m + ":" + s;
    displayDate(elementID2);
	
	var t = setTimeout(function(){startTime(elementID,elementID2)}, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function displayDate(elementID){

	var today = new Date();
	var date = today.getDate();
	var day = today.getDay();
	var month = today.getMonth();

	var dayOfWeek;
	var MonthOfYear;
	switch(day)
	{
		case 0:{
			dayOfWeek = "Sunday";
			break;
		}
		case 1:{
			dayOfWeek = "Monday";
			break;
		}
		case 2:{
			dayOfWeek = "Tuesday";
			break;
		}
		case 3:{
			dayOfWeek = "Wednesday";
			break;
		}
		case 4:{
			dayOfWeek = "Thursday";
			break;
		}
		case 5:{
			dayOfWeek = "Friday";
			break;
		}
		case 6:{
			dayOfWeek = "Satday";
			break;
		}
	}

	switch(month)
	{
		case 0:{
			monthOfYear = "JAN";
			break;
		}
		case 1:{
			monthOfYear = "FEB";
			break;
		}
		case 2:{
			monthOfYear = "MAR";
			break;
		}
		case 3:{
			monthOfYear = "APR";
			break;
		}
		case 4:{
			monthOfYear = "MAY";
			break;
		}
		case 5:{
			monthOfYear = "JUN";
			break;
		}
		case 6:{
			monthOfYear = "JUL";
			break;
		}
		case 7:{
			monthOfYear = "AUG";
			break;
		}
		case 8:{
			monthOfYear = "SEP";
			break;
		}
		case 9:{
			monthOfYear = "OCT";
			break;
		}
		case 10:{
			monthOfYear = "NOV";
			break;
		}
		case 11:{
			monthOfYear = "DEC";
			break;
		}
	}
	

	document.getElementById(elementID).innerHTML = dayOfWeek +", "+ monthOfYear + " " + date;
}
