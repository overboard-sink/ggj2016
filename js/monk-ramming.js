var MonkRamming = function MonkRamming(game, x, y, demon) {
  MonkBase.call(this, game, x, y, 'monk', 0, demon);
  
  this.chaseSpeed = 100;
  this.rammingDistance = 300;
  this.rammingSpeed = 400;

  this.stalling = false;
  this.ramming = false;
  this.cooling = false;
};

MonkRamming.prototype = Object.create(MonkBase.prototype);

MonkRamming.prototype.constructor = MonkRamming;

MonkRamming.prototype.update = function update() {
  MonkBase.prototype.update.call(this);
  
  //Our monk dive attacks the demon
  if (!this.ramming && !this.stalling && !this.cooling) {
    
    if (this.game.physics.arcade.distanceBetween(this, this.demon) < this.rammingDistance) {
      
      var _this = this;
      this.game.time.events.add(500, function () {
        _this.ramming = true;
        _this.stalling = false;

        this.game.physics.arcade.moveToXY(this, this.rammingDirection.x, this.rammingDirection.y, this.rammingSpeed);

        _this.game.time.events.add(750, function () {
          _this.ramming = false;
          _this.cooling = true;
          _this.game.time.events.add(1500, function () {            
            _this.cooling = false;
          }, _this);
        }, _this);
      }, this);

      this.rammingDirection = { x: this.demon.x, y: this.demon.y }
      this.stalling = true;
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    }
  }

  if (!this.ramming && !this.stalling) {
    this.game.physics.arcade.moveToXY(this, this.demon.x, this.demon.y, this.chaseSpeed);
  }

};

