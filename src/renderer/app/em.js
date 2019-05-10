// function allowDrop() <=> stop the default behavior
function allowDrop(ev) {
    ev.preventDefault();
}

// functions drag(ev) <=> Once drag starts
function drag(ev) {
    console.log("ev", Object.keys(ev));
    console.log("ev.target", Object.keys(ev.target))
    ev.dataTransfer.setData("text", ev.target.id);
}

// function drop(ev) <=> Once drop event occurs
function drop(ev) {
    ev.preventDefault();
    // var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
    console.log("Okay")
    let ems = document.getElementsByClassName('em');
    console.log(ems);

    for(let i=0; i < ems.length; ++i) {
    	console.log('Processing')
    	ems[i].style.display = "block";
    }
    console.log("Displayed email sending form")
}
