/**
 * Created on: 12 Dec 2018, Thu
 */

const {spawn} = require("child_process");
const fs = require("fs");
const path = require("path");

function getSplittedNames(fileName) {
	/**
	 * .gitignore
	 * A.txt, B.mp4, C.ext.docx
	 */

	console.log(fileName, "...");

	let splittedNames = {};
	if(fileName.charAt(0) === ".") {
		// .gitignore, .user-setttings etc.

		/*
			> [3, 0,4, 5, 5].slice(-1)[1]
			undefined
			>
			> [3, 0,4, 5, 5].slice(-1)[1]? 67: 78
			78
			>
			> [3, 0,4, 5, 5].slice(-1)[0]? 67: 78
			67
			>
			> fileName = ".git"
			'.git'
			>
			>  fileName.slice(1).split(".").slice(-1)
			[ 'git' ]
			>
			>  fileName.slice(1).split(".").slice(-1)[0]
			'git'
			>
		*/
		splittedNames["baseName"] = "";
 		splittedNames["extension"] = fileName.slice(1).split(".").slice(-1)[0];
	} else {
		// If file name does not starts with '.' => A.txt, B.png, D.jpeg, E.docx etc.
		let arr = fileName.split(".");
		splittedNames["baseName"] = arr[0]; // A.txt, B.docx => A, B

		if(arr.length == 1) {
			// myTxt, A etc.

			/*
				> a = [2, 3, 4, 5, 10, 6, 4, 1]
				[ 2, 3, 4, 5, 10, 6, 4, 1 ]
				> a.slice(-1)
				[ 1 ]
				>
			*/
			splittedNames["extension"] = "noExtension"; 
		} else {
			// A.jpg, B.docx => jpg, docx
			splittedNames["extension"] = arr.slice(-1)[0]; 
		}
	}

	return splittedNames;
}


function getChildren(
	fileOrDirPath, 
	options = {
		iconPath: "../assets/images/icons/"
	}
) {
	/**
	 * A RECURSIVE FUNCTION
	 *
	 * that will give an object consisting list of directories and files
	 * in a hierarchical form
	 *
	 */

	let directoryTreeObj = {};

	if(!fs.existsSync(fileOrDirPath)) {
		console.log("Path: " + fileOrDirPath + " does not exist")
		return null;
	}

	// console.log("Got => " + fileOrDirPath);
	let contents = fs.readdirSync(fileOrDirPath);

	/*
		>
		> const fs = require("fs")
		undefined
		>
		> t = fs.lstatSync("C:\\Users")
		Stats {
		  dev: 2798105787,
		  mode: 16676,
		  nlink: 1,
		  uid: 0,
		  gid: 0,
		  rdev: 0,
		  blksize: undefined,
		  ino: 2533274791604032,
		  size: 0,
		  blocks: undefined,
		  atimeMs: 1527918096340.4111,
		  mtimeMs: 1527918096340.4111,
		  ctimeMs: 1538294250596,
		  birthtimeMs: 1523480673738.1653,
		  atime: 2018-06-02T05:41:36.340Z,
		  mtime: 2018-06-02T05:41:36.340Z,
		  ctime: 2018-09-30T07:57:30.596Z,
		  birthtime: 2018-04-11T21:04:33.738Z }
		>
		> t.isDirectory()
		true
		>
		> t.isFile()
		false
		>
	*/

	/*
		H:\RishikeshAgrawani\Projects\GenWork\Docs>tree . /f
		Folder PATH listing for volume New Volume
		Volume serial number is C867-828E
		H:\RISHIKESHAGRAWANI\PROJECTS\GENWORK\DOCS
		│   DIVI-BUILDER.md
		│   libraries.md
		│   NW-or-Electron-or-Any.md
		│   TAMIM-SIR-MESSAGES.md
		│
		├───Installers
		└───Planning-for-generator-modules
		    │   computational_code.md
		    │   table.md
		    │
		    └───Discussions
		            Timeline.md
	*/

	let dirs = [];
	let files = [];

	for(let content of contents) {		
		/*
			> const path = require("path")
			undefined
			> path.sep
			'\\'
			>
		*/

		/* 'C:\\Users\\rishi' + '\\' + 'Profile.md' */
		let fullPath = fileOrDirPath + path.sep + content; 

		const stats = fs.lstatSync(fullPath);

		if(stats.isDirectory()) {
			/**
			 * If content is a directory then again 
			 * try to find its children recursively
			 */

			/*
				>
				> id = 8
				8
				>
				> {id}
				{ id: 8 }
				>
				> {"ok": 3, id}
				{ ok: 3, id: 8 }
				>
			*/

			// console.log("Dir : " + fullPath);
			let children = getChildren(fullPath); // Recursive call
			// console.log(children);

			dirs.push({
				"name": content,
				"fullPath": fullPath,
				"children": {
					"dirs": children.children.dirs,
					"files": children.children.files
				}
			})
		} else {
			// console.log("File: " + fullPath);

			files.push({
				"name": content,
				"fullPath": fullPath,
				"icon": options.iconPath? options.iconPath + getSplittedNames(content).extension + ".svg" : 
						"../assets/images/icons/" + getSplittedNames(content).extension + ".svg"
			});
		}
	} // Loop ends here


	directoryTreeObj["children"] = {};
	directoryTreeObj["children"]["files"] = files;
	directoryTreeObj["children"]["dirs"] = dirs;

	/* Printing the directory tree */
	console.log(directoryTreeObj);

	return directoryTreeObj;

	/* End of getChildren() */

	/**
		===============
		   JSON FORM  
		===============

        {
            "children": {
                "files": [
                    {
                        "name": "DIVI-BUILDER.md",
                        "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\DIVI-BUILDER.md",
                        "icon": "../assets/images/icons/md.svg"
                    },
                    {
                        "name": "libraries.docx",
                        "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\libraries.docx",
                        "icon": "../assets/images/icons/docx.svg"
                    },
                    {
                        "name": "NW-or-Electron-or-Any.txt",
                        "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\NW-or-Electron-or-Any.txt",
                        "icon": "../assets/images/icons/txt.svg"
                    },
                    {
                        "name": "TAMIM-SIR-MESSAGES.md",
                        "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\TAMIM-SIR-MESSAGES.md",
                        "icon": "../assets/images/icons/md.svg"
                    }
                ],
                "dirs": [
                    {
                        "name": "Installers",
                        "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\Installers",
                        "children": {
                            "dirs": [],
                            "files": []
                        }
                    },
                    {
                        "name": "Planning-for-generator-modules",
                        "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\Planning-for-generator-modules",
                        "children": {
                            "dirs": [
                                {
                                    "name": "Discussions",
                                    "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\Planning-for-generator-modules\\Discussions",
                                    "children": {
                                        "dirs": [],
                                        "files": [
                                            {
                                                "name": "Timeline.md",
                                                "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\Planning-for-generator-modules\\Discussions\\Timeline.md",
                                                "icon": "../assets/images/icons/md.svg"
                                            }
                                        ]
                                    }
                                }
                            ],
                            "files": [
                                {
                                    "name": "computational_code",
                                    "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\Planning-for-generator-modules\\computational_code",
                                    "icon": "../assets/images/icons/noExtension.svg"
                                },
                                {
                                    "name": "table.md",
                                    "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs\\Planning-for-generator-modules\\table.md",
                                    "icon": "../assets/images/icons/md.svg"
                                }
                            ]
                        }
                    }
                ]
            },
            "fullPath": "H:\\RishikeshAgrawani\\Projects\\GenWork\\Docs",
            "name": "Docs",
            "icon": {
                "close": "../assets/images/icons/dirClosed.svg",
                "open": "../assets/images/icons/dirOpened.svg"
            }
        }
	*/
}
