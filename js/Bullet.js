class Bullet extends Spirit {
	constructor(imgs, type) {
		if (type>5 || type<1) {
			throw new Error('子彈類型錯誤，只有1~5種') 
		}
		let img = imgs.bullet[`bullet${type}`];

		super({
			img: img.img,
			sx: img.frame.x,
			sy: img.frame.y,
			w: img.frame.w,
			h: img.frame.h
		});

		this.type = type; 
		this.speed = 6;
	}
	// 如果圖沒有畫其他方向，要馬改圖，要馬旋轉圖的方向
	
	draw(gd) {
		this.rotation -= 90; // 畫的時候把圖旋轉九十度
		super.draw(gd);
		this.rotation += 90; // 畫完轉回來
	}
}