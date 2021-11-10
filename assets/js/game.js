/* GAME FUNCTIONS*/

//function to generated a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// fight function to check if player wants to fight or skip
var fightOrSkip = function() {
     // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // validate prompt answer
    if (promptFight === "" || promptFight === null) {
      window.alert("You need to provide a valid answer! Please try again.");
      //use return to call it again and stop the rest of the fxn from running
      return fightOrSKip();
    }   
      
    //convert promptFight to all lowercase so we can check with less options
    promptFight = promptFight.toLowerCase();

    if promptFight === "skip" {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true) leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
       //stop while() loop using break, and enter next fight

       // return true if player wants to leave.
       return true;
    }
  }
  return false;
};

// fight function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function(enemy) {
  //keep trach of who goes first
  var isPlayerTurn = ture;

  //randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0 {
    if (isPlayerTurn) {
      //ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if ture, leave fight by breaking loop
        break;
      }
 
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    
    //remove enemy's health by subtracting the amount we set in the damage variable
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + 
      " attacked " + 
      enemy.name + 
      " . " + 
      enemy.name + 
      " now has " + 
      enemy.health + 
      " health remaining."
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
    //player gets attack first
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    // remove enemy's health by subtracting the amount we set in the damage variable
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
        
      enemy.name + 
      " attacked " + 
      playerInfo.name + 
      ". " + 
      playerInfo.name + 
      " now has " + 
      playerInfo.health + 
      " health remaining."
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
  //reset player stats
  playerInfo.reset();

  //fight each enemy robot by looping over them and fighting one at a time
  for (var i =0; i < enemyInfo.length; i++) {
    //if player still alive keep fighting next enemy
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0
      window.alert('Welcome to Robot Gladiators! Round ' + (i+1));
      debugger;

      //pick new enemy to fight based on the index of the enemyInfo array
      var pickedEnemyObj = enemyInfo[i];

      //set health for picked enemy
      pickedEnemyObj.health = randomNumber(40, 60);
      
      //pass the pickedEnemyObj object variable's value into the fight fxn
      fight(pickedEnemyObj);

      //if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length -1){
        //ask if player wants to use the store b4 next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
      
        //if yes take them to the store() fxn
        if (storeConfirm) {
          shop();
        }
      }
    }
    //if player is not alive, break out of the loop and let endGame fxn run
    else {
      window.alert("you have lost your robot in battle! Game over!");
      break;
    }
  }

  //after loop ends, either out of player.health or enemies to fight so run the endGame fxn
  endGame();
};
  
//function to end the entire game
var endGame= function() {
  window.alert("The game has now ended. Let's see how you did!");
  
  // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  }   else {
    window.alert("You've lost your robot in battle.");
  }  

  //ask player if they'd like to play agian 
    var playAgainConfirm = window.confirm("would you like to play agian?");

  if (playAgainConfirm) {
    startGame();
  } else {
      window.alert("Thank you for playing Robot Gladiators!  Come back soon!");
  }   
};

// go to shop function btw battles function
var shop = function() {
  //ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
   'Would you like to REFILL your health, UPGRADE your attack or LEAVE the store?  Please enter one "REFILL", "UPGRADE", or "LEAVE to make a choice.'
  );
 
 // use switch case to carry out action
 switch (shopOptionPrompt) {
  case 'REFILL':
  case 'refill':
    playerInfo.refillHealth();
    break;
  case 'UPGRADE':
  case 'upgrade':
    playerInfo.upgradeAttack();
    break;
  case 'LEAVE':
  case 'leave':
    window.alert('Leaving the store.');

    // do nothing, so function will end
    break;
  default:
    window.alert('You did not pick a valid option. Try again.');

    // call shop() again to force player to pick a valid option
    shop();
    break;
}
};

/* END GAME INFORMATION / VARIABLES */

/* GAME INFO / VARIABLES */

//player info
var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's Health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money-= 7;
    }
    else {
      window.alert("You don't have enought money!");
    }
  }
};

// enemy information
var enemyInfo = [
  {
    name: 'Roborto',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Amy Android',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Robo Trumble',
    attack: randomNumber(10, 14)
  }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

/* END GAME INFO/VARIABLES

/*RUN GAME */
 startGame();

