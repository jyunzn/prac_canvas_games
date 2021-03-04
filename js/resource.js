// 加載圖片的函數
function loadResourc(path) {
	// 由於加載資源需要一點時間，所以可以考慮使用 Promise
	return new Promise((resolve, reject)=>{
		$.ajax({
			url: 'img/' + path,
			dataType: 'text',
			success(txt) {
				// 1.1 解析文件
				let json = eval('('+txt+')') 
				
				// 1.2 加載圖片
				let res = {};     // 存放加載資料
				let count = 0,    // 紀錄已加載數量
					total = 0;    // 紀錄資源總量
				for(let name in json) {
					total++
					let oImg = new Image();
					oImg.src = 'img/' + json[name].src;
					oImg.onload = function () {
						res[name] = {
							img: this,                // 該加載完的 imgObj
							frame: json[name].frame   // 該圖片的寬高座標資料
						}

						count++

						// 如果已加載數量跟總量相同，那表示加載完成
						if (total == count) {
							resolve(res);     // 搞定後就可以送 resolve 了
						}
					}
					oImg.onerror = function () {
						reject();
					}
				}

			},
			error(err) {
				reject(err);
			}
		})
	})
}



async function loadResources() {
	// 所有想加載的資料丟進來
	let source = {
		people: "people.json",
		bullet: "bullet.json",
		other: "other.json"
	}


	let imgs = {};  // 存放所有圖片資源
	try {
		for (let name in source) {
			imgs[name] = await loadResourc(source[name]);
			// console.log(await loadResourc(source[name]));
		}
		return imgs;
	} catch(e) {
		throw e;
	}

}

