class People extends Spirit {
	constructor(imgs, type) {

		if (type < 1 || type > 8) {
			throw new Error('只有1~8角色')
		}
		let p = imgs.people[`p${type}`];
		//console.log(p);
		super({
			img: p.img,
			sx: p.frame.x,
			sy: p.frame.y,
			w: p.frame.w,
			h: p.frame.h,

			speed: Math.random()*1+0.5
		}) 

		this.sx_backUp = this.sx;
		this.type = type;    
		this.max_tick = 10;
		this.max_frame = 3;
	}

	draw(gd) {
		this.rotation -= 90;
		super.draw(gd);
		this.rotation += 90;
	}

}