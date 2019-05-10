function getUserName() {
	let username = os.userInfo().username;
	console.log("USERNAME: ", username);
	if(username === '' || username === undefined) {
		username = "User"
	} 

	return username;
}