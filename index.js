const express = require('express');
let fs = require('fs');
const app = express();

const port = 5000;

app.use(function (req, res, next){
    let addr = req.url
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
          console.log(err);
          
        } else {
          console.log('Added to log.');
          next()
        }
      });
})

app.get('/', (req, res)=> res.sendFile(__dirname + '/index.html'))
app.get('/documentation', (req, res)=> res.sendFile(__dirname + '/documentation.html'))
app.get('*', (req, res)=> res.sendFile(__dirname + '/404.html'))





app.listen(port, ()=> console.log(`app available on port http://localhost:${port}`))