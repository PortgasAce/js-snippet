// 获取apk目录的文件，求md5值
const MD5 = "md5 -q ";

let workPath = __dirname;
let path = require('path');
let fs = require("fs");
let exec = require('child_process').exec;

let apkPath = path.resolve(__dirname,"./apk");

let getAllFiles = function(path){
	return new Promise(function(resolve,reject){
		fs.readdir(path,function(err, files){
   			if (err) {
       			return reject(err);
   			}
   			resolve(files)
		});
	});
}

let filterApk = function(file){
	let arr = file.split("-");
	if (arr.length != 5) {
		return false;
	}
	return true;
}

let getMd5 = function(file){
	return new Promise(function(resolve,reject){
	exec(MD5 + file, function(err,stdout,stderr){
    	if(err) {
    		reject(stderr);
    	} else {
    		// 去掉换行
    		let md5 = stdout.slice(0,stdout.length-1);
        	console.log(md5);
        	resolve(md5);
    	}
	});
	});
}

let main = async function(){
	// 获取apk目录下所有文件
	let files = await getAllFiles(apkPath);
	// 过滤有效文件
	let apks = files.filter(filterApk);
	console.log(apks);
	// 求有效文件的md5值存入md5Arr
	let md5Arr = [];
	for (var i = 0; i < apks.length; i++) {
		let md5 = await getMd5(path.resolve(apkPath,apks[i]));
		md5Arr.push(md5);
	}
	console.log("md5 = " + md5Arr);
}

main();