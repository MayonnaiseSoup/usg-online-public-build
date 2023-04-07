express = require("express");
app = express();
const PORT = process.env.PORT || 3000

let scores = {};

app.use(express.json())
app.use(express.static("public"));

app.post("/newPlayer", (req, res) => {
    const name = req.body.name;

    if (name in scores) {
        res.status(400)
        res.json({ msg: "Error: User already exists!"})
    } else {
        scores[name] = 0;
        res.json({ msg: "Success! Check console!" })
        console.log(scores)
    }
    

    
})

app.delete("/delPlayer", (req, res) => {
    const name = req.body.name;

    delete scores[name];

    res.json({ "msg": "Deleted User" })
})

app.get("/listScores", (req, res) => {
    const sortedKeys = Object.keys(scores).sort(function(a, b) {
        return scores[b] - scores[a];
    });
    
    const sortedObj = {};
    for (const key of sortedKeys) {
      sortedObj[key] = scores[key];
    }
    
    const jsonString = JSON.stringify(sortedObj);
    
    obj = JSON.parse(jsonString)
    
    res.json(obj)
})

app.put("/updateScore", (req, res) => {
    const name = req.body.name;
    const number = req.body.value;

    scores[name] = number

    res.json({ "msg": "Success!" })
})



console.log("Your server has started on: " + PORT)
app.listen(PORT)