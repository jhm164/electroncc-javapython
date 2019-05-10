var appMenu = new nw.Menu({type: "menubar"});

var fileSubMenu = new nw.Menu();
var editSubMenu = new nw.Menu();

fileSubMenu.append(new nw.MenuItem({label: "Open File"}));
fileSubMenu.append(new nw.MenuItem({label: "Open Folder"}));
fileSubMenu.append(new nw.MenuItem({type: "separator"}));
fileSubMenu.append(new nw.MenuItem({label: "Exit"}));

editSubMenu.append(new nw.MenuItem({label: "Undo"}));
editSubMenu.append(new nw.MenuItem({label: "Redo"}));
editSubMenu.append(new nw.MenuItem({type: "separator"}));
editSubMenu.append(new nw.MenuItem({label: "Cut"}));
editSubMenu.append(new nw.MenuItem({label: "Copy"}));
editSubMenu.append(new nw.MenuItem({label: "Paste"}));
editSubMenu.append(new nw.MenuItem({label: "Select all"}));

appMenu.append(new nw.MenuItem({
	label: "File",
	submenu: fileSubMenu
}));

appMenu.append(new nw.MenuItem({
	label: "Edit",
	submenu: editSubMenu
}));


appMenu.append(new nw.MenuItem({label: "View"}));

nw.Window.get().menu = appMenu;