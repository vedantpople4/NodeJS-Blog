const fs = require('fs');

//read file

fs.readFile('./docs/blog1.txt', (err, data)=>{
    if(err){
        console.log(err);
    }
    console.log(data.toString());
});
console.log('last line');

//writing files
fs.writeFile('./docs/blog1.txt', 'HELLO WORLD!' ,() =>{
    console.log('file has been written');
});

//working with directories
if(!fs.existsSync('./assets')){
fs.mkdir('./assets', (err)=>{
    if(err){
        console.log(err)
    }
    console.log('folder created');
});
} else {
    fs.rmdir('./assets', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder deleted');
    });
}


//deleting files

if(fs.existsSync('./docs/delete.txt')) {
    fs.unlink('./docs/delete.txt', (err) => {
        if(err){
            console.log(err);
        }
        console.log('File deleted');
    });
} else {
    console.log('')
}
