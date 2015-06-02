//Problem: We need a simple way to look at user's badge count and JavaScript points
//Solution: Use Node.js to connect to Treehouse's AP

var http = require("http");
//print out message
function printMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
	console.log(message);
}

//print out Error Messages
//
function printError(error){
	console.error(error.message);
}

//Connect to the API UR(http://teamtreehouse.com/username/yvesyuen)
function get(username){
var request = http.get("http://teamtreehouse.com/" + username + ".json",function(response){

	var body = ""; 

	//Read the data
	response.on("data",function(chunk){
		body += chunk;
	});

	response.on("end",function(){
		if(response.statusCode ===200){
		try{
				//Parse the data
		var profile = JSON.parse(body);
			//Print the data
		printMessage(username,profile.badges.length,profile.points.JavaScript);
		} catch(error){
			//Parse Error
			printError(error);
		}
	} else {
		//status Code
		printError({message: "There was an error getting the profile for "+ username + ". (" + http.STATUS_CODES[response.statusCode] +")"});
	}
});
});
//Connection 
request.on("error",printError);
}




module.exports.get = get;

