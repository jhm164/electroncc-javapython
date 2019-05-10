/**************** downloadDirIsOk() ***************************************************/
function downloadDirIsOk(GEN_DOWNLOADS) {
		// Check if GEN_DOWNLOADS is valid or not
		try {
			if(!fs.lstatSync(GEN_DOWNLOADS).isDirectory()) {
				console.log("Bad");
				alert(`ERROR: It seems, path referenced by \"GEN_DOWNLOADS\"" doesn't represent a directory`)
				return false;
			} else {
				console.log(`Correct`)
				let username = getUserName();
				alert(`(WELCOME ${username}):- Path referenced by \"GEN_DOWNLOADS\": ${GEN_DOWNLOADS} is a valid path for a download directory in your system`);
				return true;
			}
		} catch (err) {
			let msg = `ERROR: ${err}`;
			console.log(msg);
			alert(msg);
			return false;
		}
}

/**************** setEnvPermanently() ***************************************************/
function setEnvPermanently(downloadDir) {
	/*
		- Here, we think that downloadDir is fine and represents a valid path in the system

		- https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js
		
		- https://social.technet.microsoft.com/Forums/windows/en-US/a5593733-a7b5-4079-a3ab-a1f9b29532f7/setx-command-error-access-tot-he-registry-path-is-denied?forum=w7itprogeneral
	*/

	const {spawnSync} = require("child_process");

	// setx  -m  GEN_DOWNLOADS  H:\temp\downloads
	var result = spawnSync('setx', ['-m', 'GEN_DOWNLOADS', downloadDir])

	// STDOUT
	var stdOut = result.stdout.toString();
	console.log(stdOut)

	// STDERR
	var stdErr =  result.stderr.toString();

	if(stdErr === '') {
		console.log('Successfully set environment variable');
		return true;
	} else {
		console.log(`ERROR: ${stdErr}`);
		alert(`${stdErr} Suggestion: Try to set this after opening the Terminal as an administrator`);
		return false;
	}
}

/**************** envVarIsSet() ***************************************************/
function envVarIsSet(envVarName) {
	console.log("Got " + envVarName)
	let GEN_DOWNLOADS = process.env[envVarName];

	console.log('' + GEN_DOWNLOADS)
	console.log(`${envVarName}: ` + GEN_DOWNLOADS)
	if(GEN_DOWNLOADS) {
		console.log("\'GEN_DOWNLOADS\' is SET, now checking for its validity");
		return downloadDirIsOk(GEN_DOWNLOADS); // true/false 
	} else { // If GEN_DOWNLOADS is not set

		let done = false;

		do {
			var ready = confirm("WARNING: \"GEN_DOWNLOADS\" ENVIRONMENT variable is not set (If set, it should represent the download folder for jpeg/jpg/png/gif/ico/svg/tif/tiff/bmp images)");
		
			if(ready) {
				var downloadDir = prompt("Enter path of download directory (for images)");
				
				if(downloadDir != null || downloadDir != "") {
					if(downloadDirIsOk(downloadDir)) {
						// SET THE ENVIRONMENT VARIABLE'S VALUE TO ENTERED PATH
						process.env.GEN_DOWNLOADS = downloadDir; // Only allowed for this session
						
						if(!setEnvPermanently(downloadDir)) {
							continue;
						};

						alert("Successfully SET the PATH (Let's go)");
						return true;
					}
				} else {
					alert('Download directory\'s path should not be blank (or you cancelled)')
					continue; // not necessary here
				}
			} else {
				// You do not wish to provide your download directory's path
				alert("You cancelled specifying the download directory (If you wish, set it manually)")
				done = true;
			}
		} 
		while(!done);

		return false;
	}
}

/**************** downloadPic() ***************************************************/
function downloadPic(ev) {
	ev.preventDefault();

	var picUrl = document.forms["form1"]["picUrl"].value;
	var fileName = document.forms["form1"]["fileName"].value;

	alert(picUrl);
	alert(fileName);

	if(envVarIsSet("GEN_DOWNLOADS")) { // Environment variable 'GEN_DOWNLOADS' is set
		console.log('Downloading, wait...')
		download(picUrl, fileName);
		alert("Saved");
	} else {
		// console.log('GEN_DOWNLOADS is not set')
		console.log("It seems you haven't set GEN_DOWNLOADS")
	}
}
