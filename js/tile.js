function Tile(col, row) {
    Phaser.Group.call(this, game);
    
    // store column and row
    this.col = col;
    this.row = row;
    
    // there is a mine in the tile and mines adjacents
    this.mine = false;
    this._adjacents = -1;
    this._flag = false;

    // get all neighbors
    this.diagonal = [
        {col:col-1, row:row-1}, {col:col-1, row:row+1},
        {col:col+1, row:row-1}, {col:col+1, row:row+1}
    ];
    this.straight = [
        {col:col-1, row:row}, {col:col, row:row-1},
        {col:col+1, row:row}, {col:col, row:row+1}
    ];
    this.neighbors = [].concat(this.diagonal, this.straight);
    
    // add the floor sprite
    this.floor = new Phaser.Sprite(game, 0, 0, 'tiles');
    this.floor.frame = 90;
    this.floor.anchor.set(0.5, 0.5);
    this.floor.tint = 0xaaaaaa;
    this.add(this.floor);
    
    // add the label
    var style = { font: 'bold 48px Arial', fill: '#000', align: 'center' };
    this.label = new Phaser.Text(game, 0, 0, '0', style);
    this.label.anchor.set(0.5, 0.5);
    this.label.visible = false;
    this.add(this.label)
}
Tile.prototype = Object.create(Phaser.Group.prototype);

Tile.prototype.isNeighbor = function(col, row) {
    if (this.col == col && this.row == row) {
        return true;
    }
    for (var i = 0; i < this.neighbors.length; i++) {
        if (this.neighbors[i].col == col && this.neighbors[i].row == row) {
            return true;
        }
    }
    return false;
}

Tile.prototype.show = function(col, row) {
    if (this.mine) {
        var mine = new Phaser.Sprite(game, 0, 0, 'tiles');
        mine.frame = 38;
        mine.anchor.set(0.5, 0.5);
        this.add(mine);
    }
}

Object.defineProperty(Tile.prototype, 'size', {
    set: function(value) {
        this.width = value;
        this.height = value;
    }
});

Object.defineProperty(Tile.prototype, 'flag', {
    get: function() { return this._flag; },
    set: function(value) {
        if (this._adjacents === -1) {
        this._flag = value;
        this.floor.tint = value ? 0xff4400 : 0xaaaaaa;
        }
    }
});

Object.defineProperty(Tile.prototype, 'adjacents', {
    get: function() { return this._adjacents; },
    set: function(value) {
        this._adjacents = value;
        this.label.text = value;
        this.label.visible = value > 0;
        if (value > -1) {
            this.floor.tint = 0xffffff;
        }
    }
});