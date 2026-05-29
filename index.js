const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors");
const app = express()

dotenv.config();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
PORT = process.env.PORT

app.get('/', (req,res)=>{
    res.send("server is running fine!")
})

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})