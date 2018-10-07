let workPath = __dirname;
let path = require('path');
let fs = require("fs");
let exec = require('child_process').exec;

const md5 = "md5 -q ";
const shasum = "shasum ";
const crc32 = "crc32 ";
// md5 文件绝对地址
// shasum 文件绝对地址
// crc32 文件绝对地址

let apkPath = path.resolve(__dirname,"..");
let cdnPath = path.resolve(__dirname,"../cdn");
var output = {}; // 输出

let main = function(){
	createOutputDir(function(){
		console.log("创建cdn目录成功");
		// traverseDir(apkPath,renameFile);
		traverseDir(cdnPath,getMd5);
		// traverseDir(cdnPath,getShasum);
    	// traverseDir(cdnPath,getCrc32);

    	// todo 
    	// setTimeout(function(){
    	// 	console.log(output);
    	// 	outputParam(cdnPath+"/output.txt",JSON.stringify(output,4));
    	// },3000)
	});
}

// 输出到文件
let outputParam = function(file,data){
	console.log("outputParam = "+data);
	fs.writeFile(file,data,function(err){
		if(err){
			return console.error(err);
		}
		console.log('写入文件成功');
	});	
}

// 创建输出目录
let createOutputDir = function(callback){
	fs.mkdir(cdnPath, callback);
}

// 遍历目录
let traverseDir = function(path,callback){
	fs.readdir(path,function(err, files){
   		if (err) {
       		return console.error(err);
   		}
   		files.forEach(callback);
	});
}

let reg = RegExp(".apk");
// 检查文件
let checkFile = function(file){
	// let arr = file.split("-");
	// if (arr.length == 6) {
	// 	return true;
	// }

	// return false;

	return reg.test(file);
}

// 重命名文件 
// hongxiu-xx-10000xx-xxxxx-release.apk -> HXReader-1000xx.apk等
let renameFile = function(file){
		if (!checkFile(file)) {
			return;
		}

		let apkName = getApkName(code);
		let newPath = cdnPath+"/"+apkName;
		console.log("code = "+ code+",newPath = "+newPath);
		fs.rename(file, newPath, function(err){
			console.log(err);
		});
}

// 获取apk命名，命名规则
let getApkName = function(code){
	let apkName;
	switch(code){
		case "1000000":
			apkName = "HXReader-update.apk";
			break;
		case "1000012":
			apkName = "HXReader.apk";
			break;
		default:
			apkName = "HXReader-" + code + ".apk";
			break;
		}
	return apkName;
}

// 获取md5
let getMd5 = function(file){
	if (!checkFile(file)) {
		return;
	}
	exec(md5 + file, function(err,stdout,stderr){
    	if(err) {
        	console.log('md5 error:'+stderr);
    	} else {
    		// 去掉换行
    		let md = stdout.slice(0,stdout.length-1);
        	console.log(md);

        	putOutput(file,"md5",md)
    	}
	});
}

// 获取shasum
let getShasum = function(file){
	if (!checkFile(file)) {
		return;
	}
	exec(shasum + file,function(err,stdout,stderr){
    	if(err) {
        	console.log('shasum error:'+stderr);
    	} else {
    		let sha = stdout.split(" ")[0];
        	console.log(sha);

        	putOutput(file,"shasum",sha)
    	}
	});
}

// 获取Crc32
let getCrc32 = function(file){
	if (!checkFile(file)) {
		return;
	}
	exec(crc32 + file,function(err,stdout,stderr){
    	if(err) {
        	console.log('shasum error:'+stderr);
    	} else {
    		// 去掉换行
    		let crc32 = stdout.slice(0,stdout.length-1);
        	console.log(crc32);

        	putOutput(file,"crc32",crc32)
    	}
	});	
}

let putOutput = function(key,property,value){
	        if (output[key]) {
        		output[key][property] = value;
        	}else {
        		let result = new Object();
        		result[property] = value;
        		output[key] = result;
        	}
}

console.log("Start!");

main();

console.log("End!");