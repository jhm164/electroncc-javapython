/**
 * Created on: 29 Oct 2018, Mon
 */

// const fs = require("fs"); // Alredy declared

// Path should be with respect to index.js
function getImagesList(){
	if(envVarIsSet("GEN_DOWNLOADS")) {
		let downloadDir = process.env.GEN_DOWNLOADS;

		fs.readdir(downloadDir, (err, files) => {
			if(err) {
				console.log(`ERROR: ${err}`);
			} else {
				console.log(files);
				console.log(typeof files, Object.prototype.toString.call(files).slice(8, -1));
				
				// let br = document.createElement("br");
				// setTimeout(() => {
					let div = document.getElementById("filesList");
					try {
						/* => div.empty is not a function */
						// div.empty(); // To updated once we downloaded image
						$("#filesList").empty();
						console.log("Elements emptied");
					} catch(err) {
						console.warn(`ERROR: ${err}`);
					}
					
					/* div.empty(); is to remove the below problem
					   as 1-5 got added after existing elements (1-4) once image is downloaded

						1 - Dev-Pro.png
						2 - Electron.png
						3 - pushin.jpg
						4 - Web-info.jpg
						1 - Dev-Pro.png
						2 - Electron.png
						3 - pushin.jpg
						4 - Web-info.jpg
						5 - Web.png
					*/

					for(let index in files) {
						console.log(typeof index)
						console.log("Creating element (new1) ", index + 1);
						let index2 = parseInt(index) + 1;
						let text = document.createTextNode(`${index2} - ${files[index]}`)
						
						console.log("Text node created");
						let p = document.createElement("p").appendChild(text);
					
						console.log("p node created");
						div.appendChild(p);
						// p.style.color = "maroon";
						div.appendChild(document.createElement("br"));
						
						console.log(`Element appended`);
					}
				// }, 3000);
			}
		});
	} else { // If body closed (else starts)
		console.log("Environment variable \'GEN_DOWNLOADS\' is not set")
	}
}

getImagesList();