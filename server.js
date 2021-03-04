let http = require(`http`);
let urllib = require(`url`);
let fs = require(`fs`);

http.createServer((req, res)=> {
	let {pathname, qurey} = urllib.parse(req.url);
	pathname = pathname.substr(1);
	fs.readFile(pathname, (err, data)=>{
		if (err) {
			res.writeHeader(404);
			res.write(`NOT Found`);
			res.end();
		} else {
			res.write(data);
			res.end();
		}
	})

}).listen(5566);
