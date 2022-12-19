const express = require('express'),
      morgan = require('morgan'),
      fs     = require('fs')


      const app = express();
      const port = 5000;

// require your built in module
 

    

// invoking middleware 

app.use(morgan('common'));
app.use(express.static('public'))

app.get('/', (req, res)=> {
  res.send('<h1>Welcome to to the Movie-Api </h1> <a href="/documentation.html"> Documentation </a>')

})
app.get('/movies', (req, res)=>{
  fs.readFile('db.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return
    }
    const movies = JSON.parse(data)
   
    res.status(200)
       .json({
        success : true,
        data    : movies
    })
  }); 

})

app.use((err, req, res, next) => {
  const {statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  console.log(err.message);
  res.status(statusCode).json({ 
  success: false,
  message: err.message
  
})
})



app.listen(port, ()=> console.log(`App available on port http://localhost:${port}`))