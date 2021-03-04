// 幾乎所有遊戲框架都會將自己最基礎的構建稱為 Spirit


class Spirit {
	constructor(options) {
		this.img = options.img;

		this.sx = options.sx || 0;
		this.sy = options.sy || 0;

		this.x = options.x || 0;
		this.y = options.y || 0;

		this.w = options.w || this.img.width;
		this.h = options.h || this.img.height;

		this.dw = options.dw || this.w;
		this.dh = options.dh || this.h;

		this.rotation = options.rotation || 0;
		this.scaleX = options.scaleX || 1;		
		this.scaleY = options.scaleY || 1;


		this.speed = options.speed || 0; 

		this.tick = 0;
		this.max_tick = 0;


		// 幀數
		this.frame = 0;
		this.max_frame = 0; // 最大幀數
	};


	draw(gd) {
		gd.save();
		gd.translate(this.x, this.y);
		gd.rotate(this.rotation * Math.PI / 180);
		gd.scale(this.scaleX, this.scaleY);

		
		gd.drawImage(
			this.img,
			this.sx, this.sy, this.w, this.h,
			-this.dw/2, -this.dh/2, this.dw, this.dh
		)
		gd.restore();
	};



	move() {
		let speed_x = this.speed * Math.sin(this.rotation*Math.PI/180);
		let speed_y = this.speed * Math.cos(this.rotation*Math.PI/180);
		this.x += speed_x;
		this.y -= speed_y;  // 砲彈是往上飛的，所以改成 -=
	}

	// 換圖	
	setFrame(frame) {
		this.sx = frame * this.w + this.sx_backUp;
		
		
	}
	
	// 跳幀
	nextFrame() {
		
		this.tick++ 
		// console.log(this.frame);

		if (this.tick == this.max_tick) { // 達到換幀時間片段時
			this.tick = 0;                // 重置 tick
			this.frame++;                 // 跳幀
			if (this.frame==this.max_frame) {
				this.frame = 0;            // 等於最大幀時重置
			}
			this.setFrame(this.frame);     // 換圖

		}
	}


	outOfCanvas (w,h) {
		if (
				this.x < -100    ||
				this.x > w + 100 ||
				this.y < -100    ||
				this.y > h + 100
			)
			return true
		else
			return false
	}


	collTest(target) {
		let r1 = Math.min(this.w, this.h)/2;
		let r2 = Math.min(target.w, target.h)/2;

		let dis = Math.sqrt(Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2));

		return dis <= (r1+r2);


	}


};