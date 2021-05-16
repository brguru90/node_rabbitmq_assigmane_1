const express = require("express");
const connectDB = require("./config/db")
const cors = require('cors')
const app = express();
var compression = require('compression')
var bodyParser = require('body-parser');
const rabbit=require("./send")
global.rabbit=new rabbit()
global.rabbit.init()
console.log(global.rabbit)

var amqp = require('amqplib/callback_api');

//connect DB
connectDB()


app.use(compression())
app.use(express.json({
  limit: '50mb',
  extended: false
}))
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(cors())
const port = process.env.PORT || 8888;


// app.use('/', express.static('./client/build'))

app.use('/', require("./routes/apis.js"));


  try {
    app.listen(port, () => {
      console.log(`App started running at ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
