var greetingButton = document.getElementById("greeting");
var hungerMeter = document.getElementById("HungerMeter");
var battlesMeter = document.getElementById("battlesMeter");
var tiredMeter = document.getElementById("tiredMeter");

var petImage = document.getElementsByTagName("img")[0];
var body = document.getElementsByTagName("body")[0];
var lightsOff = function () {
	body.setAttribute('background-color', "black");
};

var nightTime = false;

var day = true;

var agumon = {
	name: "",
	hunger: 5,
	hitPoints: 10,
	battlesWon: 0,
	tired: Math.min(5, 10),
	alive: true,
	battleAdvantage: 0,
	type: "agumon",
	greeting: function(){
		alert("aGuMoN is best digimon");
	}
};

//if your pet dies, there's no bringing him back
var gameOver = function() {
	if (agumon.alive === false || agumon.hitPoints <= 0) {
		alert("Your pet has died. Sad!")
		petImage.removeAttribute("class");
		petImage.setAttribute("class", "no-movement")
		petImage.src = "imgs/skull.png"
	}
};

hungerMeter.innerText = agumon.hunger
hitPointsMeter.innerText = agumon.hitPoints;
battlesMeter.innerText = agumon.battlesWon;
tiredMeter.innerText = agumon.tired;

greetingButton.addEventListener("click", function(){
	agumon.greeting();
});

//Hitting the submit button makes the pet's name equal to whatever was typed in
var nameButton = document.getElementById("Name-Box");
nameButton.addEventListener("click", function(){
	var name = document.getElementById("petName").value;
	agumon.name = name;
	console.log(agumon.name);
});

//This function creates a new item in the activity log
var newActivityMessage = function (message) {
	var newMessage = document.createElement("li");
	var defaultLi = document.getElementById("default-message");
	newMessage.innerText = message;
	activityFeed.prepend(newMessage);

};

var activityFeed = document.getElementById("activityFeed");

//Pressing the feed button decreases his hunger by 1
var feedButton = document.getElementById("feedButton");
feedButton.addEventListener("click", function() {
	if (agumon.hunger < 10  && agumon.alive === true) {
	agumon.hunger++;
	hungerMeter.innerText = agumon.hunger;
	} else if(agumon.alive === false) {
		newActivityMessage("You can't feed a dead Digimon bro")
	} else {
		newActivityMessage(agumon.name + " can't eat anymore")
	}
});

//Pressing the sleep button turns the lights off and lets your little guy sleep
var sleepButton = document.getElementById("sleepButton");
sleepButton.addEventListener("click", function() {
	if (agumon.tired < 10 && !body.hasAttribute("class")) {
		sleepButton.innerText = "Wake up";
		nightTime = true;
		body.setAttribute("class", "nightTime");
	} else if (agumon.tired >= 10 && nightTime === true) {
		newActivityMessage(agumon.name + " can't sleep anymore")
		sleepButton.innerText = "Sleep";
		body.removeAttribute("class");
		nightTime = false;
	} else {
		sleepButton.innerText = "Sleep";
		nightTime === false;
		body.removeAttribute("class");
	}
});

// 	if (agumon.tired < 10 && !body.hasAttribute("class")) {
// 		agumon.tired++
// 		tiredMeter.innerText = agumon.tired;
// 		sleepButton.innerText = "Wake up";
// 		day === false;
// 		body.setAttribute("class", "nightTime");
// 	} else if (agumon.tired >= 10 ) {
// 		newActivityMessage(agumon.name + " can't sleep anymore.")
// 		body.removeAttribute("class");
// 	} else if (body.hasAttribute("class")) {
// 		sleepButton.innerText = "Sleep";
// 		day === true;
// 		body.removeAttribute("class");
// 	}

// });

var batttleButton = document.getElementById("battleButton");

//Pressing the battle button sends your pet into a fight. You're a terrible parent. If your pet wins enough it will change form.
battleButton.addEventListener("click", function() {
	var result = Math.random() + agumon.battleAdvantage;
	if (agumon.hitPoints >= 1) {
		if (result < .25) {
			newActivityMessage("A stunning victory! No damage taken")
			agumon.battlesWon++;
		} else if (result > .25 && result < .50) {
			newActivityMessage("A win! But not without cost. Your pet took 1 damage.")
			agumon.hitPoints--;
			agumon.battlesWon++;
		} else if (result > .50 && result < .75) {
			newActivityMessage("A narrow defeat. Your pet took 2 damage.")
			agumon.hitPoints -= 2;
		} else {
			newActivityMessage("A horrible loss. Your pet was badly hurt and took 3 damage.");
			agumon.hitPoints -= 3;
		};
		hitPointsMeter.innerText = agumon.hitPoints;
		battlesMeter.innerText = agumon.battlesWon;
		healing();
		gameOver();
		if (agumon.type === "agumon" && agumon.battlesWon >= 4) {
			petImage.src = "imgs/geogreymon.gif-c200";
			agumon.battleAdvantage = -.2;
			agumon.type = "greymon";
			newActivityMessage("Oh damn. Your pet got stronger and evolved into Greymon. Hope you didn't like how cute he was before.")
		};
		if (agumon.type === "greymon" && agumon.battlesWon >= 8) {
			petImage.src = "imgs/metal_greymon_gif_by_lunahydreigon-d5lwiln.gif";
			agumon.type = "MetalGreymon";
			agumon.battleAdvantage = -.5;
			newActivityMessage("You just can't help yourself can you? Your Greymon evolved into Metal Greymon.")
		};
	} else {
		newActivityMessage("Your pet is dead. He can't fight.")
		agumon.alive = false;
		gameOver();
	}
}
);

//This timer causes hunger to slowly tick down
var hungerTimer = setInterval(function(){startTime()},15000);
function startTime()
{
  if(agumon.hunger <= 0) {
    clearInterval(hungerTimer);
    agumon.alive = false;
    gameOver();
  } else {
    agumon.hunger--;
    hungerMeter.innerText = agumon.hunger;
  }  
};


//This timer causes tired to slowly tick down
var tiredTimer = setInterval(function(){tiredTime()},5000);
function tiredTime()
{
  if(agumon.tired <= 0) {
    clearInterval(tiredTimer);
    agumon.alive = false;
    gameOver();
  } else if (nightTime === true && agumon.tired < 10) {
  	if (agumon.tired + 4 > 10) {
  	agumon.tired++
  	} else {
  	agumon.tired = agumon.tired += 4;
  	}
  	tiredMeter.innerText = agumon.tired;
  	} else if (nightTime === true && agumon.tired >= 10) {
  		agumon.tried = 10;
  		tiredMeter.innerText = agumon.tired;
  		newActivityMessage("Your pet can't sleep anymore, wake him up!")
  	} else {
    agumon.tired--;
    tiredMeter.innerText = agumon.tired;
  }  
};



//This timer lets your pet slowly heal up

var healing = function () {
	var healTimer=setInterval(function(){healTime()},15000);

	function healTime()
	{
	  if(agumon.hitPoints == 10) {
	    clearInterval(healTimer);
	  } else {
	    agumon.hitPoints++;
	    hitPointsMeter.innerText = agumon.hitPoints;
	  }
	};
};
