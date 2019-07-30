// var todo = ["", ];

// var command  = prompt("What you wanna do ?");


// while(command !== "quit") {
// 	if(command === "list") {
// 		console.log("***************");
// 		todo.forEach(function(todo ,i , arr) {
// 			console.log(i+ " : " + todo);
// 		});
// 		console.log("***************");
// 	} else if(command === "new") {
// 		var newitem = prompt("Add new Item to the list.");
// 		if(newitem !== "") 
// 			todo.push(newitem);
// 		console.log(newitem + " is Added to the list");
// 	} else if(command === "delete") {
// 		var index = prompt("Enter the index of todo item to remove");
// 		console.log(todo[index] + " removed successfully");
// 		todo.splice(index, 1);
// 	}
// 	command  = prompt("What you wanna do ?"); 	
// }

document.body.background = "white";
var but = document.getElementsByTagName("button")[0];

but.addEventListener("click" , function () {
	
	document.body.classList.toggle("change");
});
