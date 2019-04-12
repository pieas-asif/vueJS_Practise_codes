var app = new Vue({
  el: '#app',
  data () {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: []
    }
  },
  methods: {
    startGame: function() {
      this.playerHealth = 100,
      this.monsterHealth = 100,
      this.gameIsRunning = true,
      this.turns = []
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10)
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
      this.checkWin();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20)
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits Monster hard for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
      this.checkWin();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for 10"
      });
      this.monsterAttack();
      this.checkWin();
    },
    giveUp: function() {
      this.playerHealth = 0;
      this.checkWin();
    },
    calculateDamage: function(min, max) {
        return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        if (confirm("You Win. New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        if (confirm("You Lost. New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return false;
      }
    },
    monsterAttack: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits Player for " + damage
      });
    }
  }
});
