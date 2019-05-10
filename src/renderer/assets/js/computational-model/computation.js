const $ =require('jquery');
const {c, cpp, node, python, java} = require('compile-run');
var fs =require('fs');

$('#run').on('click',()=>{
//alert('cliked')
});

//alert('here')
$('#compilecode').on('click',()=>{
    var code= $('#codearea').val();

    let resultPromise = cpp.runFile(__dirname+'/basiccode/demo.c', {});
    resultPromise
        .then(result => {
            $('#resultdisplay').text(result['stdout']);
            if(result['stderr']!=''){
            $('#resultdisplay').text(result['stderr']);
            }
            console.log(result);//result object
        })
        .catch(err => {
            $('#resultdisplay').text(err);
            console.log(err);
        });


 })


    $('a[href = "#c"]').click(function(){
        fs.readFile(__dirname+'/basiccode/demo.c',(err,res)=>{
            if(err) throw err;
            $('#codearea').text(res.toString());
        });
   
 }); 
 
$('#codearea').change(()=>{
$('#compilecode').attr("disabled", true);	
});

$('#save').click(()=>{
    var type = window.location.hash.substr(1);
    //alert(type);
    if(type=='c'){
    var code= $('#codearea').val();
    //console.log(code);
    fs.writeFile(__dirname+'/basiccode/demo.c',code,(err,res)=>{
if(err) throw err;
    });
}else if(type=='c++'){

    var code= $('#codearea').val();
   // console.log(code);
    fs.writeFile(__dirname+'/basiccode/demo.cpp',code,(err,res)=>{
if(err) throw err;
    });

}else if(type=='java'){
    var code= $('#codearea').val();
   // console.log(code);
    fs.writeFile(__dirname+'/basiccode/demo.java',code,(err,res)=>{
if(err) throw err;
    });
}else if(type=='py'){
    var code= $('#codearea').val();
   // console.log(code);
    fs.writeFile(__dirname+'/basiccode/demo.py',code,(err,res)=>{
if(err) throw err;
    });
}
    
    $('#compilecode').attr("disabled", false);	


    });
    

 $('a[href = "#c++"]').click(function(){
    fs.readFile(__dirname+'/basiccode/demo.cpp',(err,res)=>{
        if(err) throw err;
        $('#codearea').text(res.toString());
    });

}); 
 
$('a[href = "#java"]').click(function(){
    fs.readFile(__dirname+'/basiccode/demo.java',(err,res)=>{
        if(err) throw err;
        $('#codearea').text(res.toString());
    });

});


$('a[href = "#py"]').click(function(){
    fs.readFile(__dirname+'/basiccode/demo.py',(err,res)=>{
        if(err) throw err;
        $('#codearea').text(res.toString());
    });

}); 
