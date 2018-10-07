
let promise = new Promise(function(resolve,reject){
	console.log("promise start");
	resolve();
	console.log("promise end");
});

console.log("after promise defined");

promise.then(function() {
  console.log('resolved');
});

console.log("end all");

/**
// output :
// promise start
// promise end
// after promise defined
// end all
// resolved
**/