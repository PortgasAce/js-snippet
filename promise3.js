let promise1 = new Promise(function(resolve,reject){
	setTimeout(() => console.log("timeout end"), 1000);
	resolve("promise1 result");
})

let promise2 = new Promise(function(resolve,reject){
	setTimeout(() => resolve(promise1) , 1000);
})


promise2.then( result => console.log(result))
		.catch( error => console.log(error))

/**
output: 
timeout end 1
promise1 result
**/