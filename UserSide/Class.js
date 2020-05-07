
class settlement {
    constructor(id, settName, settType, settRes, pp, ores, food, wood) {
        this.id = id;
        this.settName = settName;
        this.settType = settType;
        this.settRes = settRes;
        this.pp = pp;
        this.ores = ores;
        this.food = food;
        this.wood = wood;
    }       
}


class tile {
    constructor(x, y, s, c, st, t, id, settlement) {
      this.x = x;
      this.y = y;
      this.s = s;
      this.c = c;
      this.st = st;
      this.t = t;
      this.id = id;
      this.settlement = settlement;
    }

    draw_tile() {
      push();
      fill(this.c);
      stroke(this.st);
      square(this.x, this.y, this.s);
      text(this.t, this.x + this.s / 2, this.y + this.s / 2);
      pop();
    }

    click_tile(posx, posy) {
      if ((posx > this.x & posx < this.x + this.s) & (posy > this.y & posy < this.y + this.s)) {
        return true;
      }
    }

    get_id() {
      return this.id;
    }

    set_settlement(settlement){
    	this.settlement=settlement;
    }
    set_color(c){
	this.c = c;
    }
}
