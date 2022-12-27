const fs = require('fs');

const readstream = fs.createReadStream('./docs/blog1.txt')

const writestream = fs.createWriteStream('./docs/blog2.txt')

readstream.on('data', (chunk)=>{
    console.log('===NEW CHUNK===');
    console.log(chunk.toString());
    writestream.write('\nNEW BITS OF DATA\n');
    writestream.write(chunk);
});

//piping
readstream.pipe(writestream);




