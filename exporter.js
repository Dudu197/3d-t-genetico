exports.toJson = (object, path) => {
	const fs = require('fs');
	let jsonContent = JSON.stringify(object);
	fs.writeFile(path, jsonContent, 'utf8', function (err) {
	    if (err) {
	        console.log("An error occured while writing JSON Object to File.");
	        return console.log(err);
	    }
	 
	    console.log("JSON file has been saved.");
	});
}