const express = require('express');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


const admin = require("firebase-admin");
const serviceAccount = require("./configs/burj-al-uae-firebase-adminsdk-vg0ui-040a2ec0f1.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b8lgl.mongodb.net/burjAlArab?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
  const collection = client.db("burjAlArab").collection("booking");
  // perform actions on the collection object
   app.post('/addBooking',(req, res)=>{
        const newBooking = req.body;

        collection.insertOne(newBooking)
        .then(result=>{
            res.send(result.insertedCount > 0);
        })
        // console.log(newBooking)
   })

   app.get('/booking',(req, res)=>{
      // console.log(req.query.email)
      // console.log(req.headers.authorization);
      const bearer = req.headers.authorization;

      if(bearer && bearer.startsWith('Bearer ')){
        const idToken = bearer.split(' ')[1];
        // console.log({idToken})
        admin.auth().verifyIdToken(idToken)
          .then((decodedToken) => {

            const tokenEmail = decodedToken.email;
            // console.log(tokenEmail, req.query.email)
            if(tokenEmail == req.query.email){
              collection.find({email: req.query.email})
              .toArray((err, documents)=>{
                res.send(documents);
              })
            }
            else{
              res.status(401).send('un-authorize access!');
            }

          })
          .catch((error) => {
            // Handle error
            res.status(401).send('un-authorize access!');
          });
      }
      else{
        res.status(401).send('un-authorize access!');
      }
 
   })
  
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port)