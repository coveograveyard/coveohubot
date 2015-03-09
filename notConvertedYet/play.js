var players = {};

var getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRockPaperScissor = function(choice) {
	switch (choice) {
		case 0:
			return "rock";
			break;
		case 1:
			return "paper";
			break;
		case 2:
			return "scissor";
			break;
		default:
			return "LAZOR";
	}
}

var getOutcome = function(playerChoice,botChoice) {
  var outcome = "";
  switch (playerChoice) {
    case "rock":
      if (botChoice == "paper") {
        outcome = "Lost";
      } else if (botChoice == "scissor") {
        outcome = "Win"
      }
      break;
    case "paper":
      if (botChoice == "scissor") {
        outcome = "Lost";
      } else if (botChoice == "rock") {
        outcome = "Win"
      }
      break;
    case "scissor":
      if (botChoice == "rock") {
        outcome = "Lost";
      } else if (botChoice == "paper") {
        outcome = "Win"
      }
      break;
    default :
      outcome = "Idiot";
      break;
  }
  return outcome;
}

var getResponse = function(outcome, botChoice) {
  var response = "";
  if(outcome == "Idiot") {
    response = "~~ Nope, not a valid choice ! It's rock paper scissor ~~"
  } else {
    response = "Coveo Bot choice is [" + botChoice + "] ! "
    if(outcome == "Win") {
      response += "You win !";
    } else if(outcome == "Lost") {
      response += "You lose !";
    } else {
      response += "It's a draw !";
    }
    response += " Your stats : " + JSON.stringify(players[hook.user_name]);
  }
  return response;
}

var initPlayer = function (hook){
	if(players[hook.user_name] == undefined){
		players[hook.user_name] = {
			lost: 0,
			won: 0,
			draw: 0,
			total: 0
		}
	}
}

var updatePlayer = function(hook, outcome) {
	players[hook.user_name].total ++;
	if(outcome == "Win") {
		players[hook.user_name].won ++;
	} else if (outcome == "Lost") {
		players[hook.user_name].lost ++;
	} else {
		players[hook.user_name].draw ++;
	}
}

var play = function(hook){
  initPlayer(hook);
  var botChoice = getRockPaperScissor(getRandomInt(0,2));//0 : Rock, 1 : Paper, 2 : Scissor
  var playerChoice = hook.command_text ? hook.command_text.toLowerCase() : "WTF";
  var outcome = getOutcome(playerChoice,botChoice);
  if(outcome != "Idiot"){
    updatePlayer(hook, outcome)
  };
  return getResponse(outcome, botChoice);
}

module.exports = {
  def: {
    exec : function (hook, callback) {
      callback(play(hook))
    },
    help : function(callback) {
      callback("Play rock paper scissor against CoveoBot. Usage !play @choice, where @choice in [rock,paper,scissor]")
    }
  }
}
