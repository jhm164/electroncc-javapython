let options = {
	selector: "#imgDiv",
	trigger: "right",
	items: {
		hide2: {
			name: "Hide",
			callback: function(key, opt) {
				try{
					$(this).css("display", "none");
					let id = $(this).attr("id");
					alert("Clicked on " + key + " (element removal) " + id);
					console.log(opt);
				} catch(err) {
					alert(`ERROR: ${err}`);
				}
			}
		},
		sort: {
			name: "Sort",
			callback: function(key, opt) {
				try{
					// console.log(JSON.stringify(opt))
					alert("Clicked on " + $(this));
					console.log(opt);
				} catch(err) {
					alert("ERROR: " + err);
					console.log(err);
				}
			}
		}
	}
}
$.contextMenu(options);
