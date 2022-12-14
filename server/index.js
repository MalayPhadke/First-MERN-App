const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
const Friend = require('./models/friend')

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.wmmogv3.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true})

app.use(cors());
app.use(express.json());

//POST 
//Adding new Friend to list
app.post('/addFriend', async (req, res) => {
    const friend = new Friend(req.body);
    await friend.save();
    res.send("Friend added!");
})

//GET 
//Get complete friend list
app.get('/read', async (req, res) => {
    const result = await Friend.find({});
    res.send(result);
})

//PUT
//Update age of particular friend
app.put('/:id/update', async (req, res) => {
    const id = req.params.id;
    const newAge = Number(req.body.newAge);
    try {
        const newFriend = await Friend.findByIdAndUpdate(id, {age: newAge});
        res.send("Updated");
    }catch(e) {
        console.log(e);
    }
})

//DELETE
//Delete friend
app.delete('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const delFriend = await Friend.findByIdAndDelete(id);
    res.send("Deleted");
})

app.listen(3001, () => {
    console.log("Listening on port 3001")
})
