var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10
};

var enemyInfo = [
  {
    name: "Roborto" ,
    attack: 12
  },
  {
    name: "Amy Android" ,
    attack: 13
  },
  {
    name: "Robo Trumble",
    attack: 14
  }
];



// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = playerInfo.money - 10;
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    enemy.health = enemy.health - playerInfo.attack;
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    playerInfo.health = playerInfo.health - enemy.attack;
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};
//randomNumber()
//function to start a new game
var startGame = function() {
  for ( var i = 0; i < enemyInfo.length; i++){
  //reset player stats
  playerInfo.health = 100;
  playerInfo.attack = 10;
  playerInfo.money = 10;
}
  for (var i = 0; i < enemy.name.length; i++) {
      // if player is still alive, keep fighting
   if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemy.name array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight
      enemy.health = 50;

        // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);
    }
    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }
  //play again
  startGame();
};

//start the game when the page loads
startGame();

//function to end the entire game
var endGame= function() {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
    }  
}

//ask player if they'd like to play agian 
var playAgainConfirm = window.confirm("would you like to play agian?");

if (playAgainConfirm) {
  //restart game
  startGame();
} else {
  window.alert("Thank you for playing Robot Gladiators!  Come back soon!");
}

