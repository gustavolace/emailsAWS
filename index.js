const express = require("express")
const app = express()

app.use(express.json());

app.listen(3333, () =>
  console.log(`Running on http://localhost:${3333}`)
);

app.get("/", (req,res) => {
    return res.json({message: "hello world"})
  console.log("hello world")
})
