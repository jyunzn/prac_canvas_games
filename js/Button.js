class Button extends Spirit {
	constructor(data, data_down) {
		super({
			img: data.img,
			sx: data.frame.x,
			sy: data.frame.y,
			w: data.frame.w,
			h: data.frame.h
		});
		this.data = data;
		this.data_down = data_down;
	};

	_check(x,y) {
		let posX = this.x - this.dw/2;
		let posY = this.y - this.dh/2;
		// console.log(y, posY, posY + this.h);
		if (
				posX <= x && x < posX + this.w &&
				posY <= y && y < posY + this.h
			)
			return true;
		else 
			return false;
	}

	checkDown(x,y) {
		if (this._check(x,y)) {
			this.img = this.data_down.img;
			this.sx = this.data_down.frame.x;
			this.sy = this.data_down.frame.y;
			this.w = this.data_down.frame.w;
			this.h = this.data_down.frame.h;

			return true;
		} 
		else
			return false;
	}

	checkUp(x,y) {
		this.img = this.data.img;
		this.sx = this.data.frame.x;
		this.sy = this.data.frame.y;
		this.w = this.data.frame.w;
		this.h = this.data.frame.h;
	}

}