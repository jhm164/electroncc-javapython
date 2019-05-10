function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function getDimesionValue(what) {
    var extraMessage = "";
    let everythingIsOkay = true;

    while(everythingIsOkay) { 
      	var value = prompt("Enter number of " + what + extraMessage);
       
        if(value === null) {
            let answer = confirm("It cancelled the operation (Press OK to continue)");
            
            if(answer) {
                extraMessage = " (again)"
                continue;
            } else {
                everythingIsOkay = false; // Confirmation cancelled
            }
        } else {
            if(/^\d+$/.test(value)) {
                value = Number(value);
                break;
            } else {
                extraMessage = " (The entered one does not seem like an integer)";
                continue;
            }
        }
    }

    if(everythingIsOkay) {
        return value;
    }

    return null;
}


function getTableDimesions() {
    let rows = getDimesionValue("rows");
    if(rows === null) {
        return null;
    }

    // Here rows is a valid integer >= 1
    let columns = getDimesionValue("columns");
    if(columns == null ) {
        return null;
    }

    // Here rows and columns both have been evaluated as valid integers >= 1
    return {
        "rows": rows,
        "columns": columns
    };
}


function drop(ev) {
    ev.preventDefault();
    // var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));

    let dimesions = getTableDimesions();

	if(dimesions !== null) {
        let {rows, columns} = dimesions;

        // Creating dynamic code for table based on the value of rows and columns
        // Finally append the table as new child of body element

        let newTable = "<table width='100%' style='resize: both; overflow: auto;'>\n"; 

        for(let row = 0; row < rows; ++row) {
            newTable += "\t<tr>\n";

            for(let column = 0; column < columns; ++column) {
                newTable += "\t\t<td contenteditable='true'></td>\n"
            }

            newTable += "\t</tr>\n";
        }

        newTable += "</table>\n";

        console.log(newTable);
        $("#div2").append(newTable); // Appended table

        console.log("Done!!!")
    } else {
        alert("Noting (no table) will be added");
    }
}
