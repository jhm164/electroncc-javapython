/**
 * Created on: 28 Oct 2018, Sun
 */

function download(picUrl, fileName) {
	// picUrl = "https://i.ytimg.com/vi/qlIFmv5Z5DU/maxresdefault.jpg";

	console.log("Downloading image from referred by " + picUrl);
	console.table(["MikTeX", "LaTeX", "BibTeX", "HTML", "Pdf"])
	// let downloadDir = "./src/assets/images/downloads/"
	let downloadDir = process.env.GEN_DOWNLOADS;
	let fullFilePath = [downloadDir, fileName].join(path.sep);

	request.get(picUrl)
	.on("error", (err) => {
		console.log("ERROR: " + err);
		alert("ERROR: " + err);
	})
	.pipe(fs.createWriteStream(fullFilePath));

	console.info('Saved as: ' + fullFilePath)
	console.log("Saved");
	alert("Saved");

	setTimeout(
		() => {
			let img = document.createElement("img");
			img.src = fullFilePath; // path is with respect to html file
			img.style = "width: 100%";
			document.getElementById("imgDiv").appendChild(img);

			getImagesList();
		}, 3000
	);
}
