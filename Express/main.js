const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let users = [
    {id : 0, name: "huzaifa" , email : "abc@gmail.com"},
    {id : 1, name: "ahmed" , email : "abc@gmail.com"},
    {id : 2, name: "ali" , email : "abc@gmail.com"}
]
app.post('/api/addUser', (req, res, next)=>{
    const {name, email}=req.body;
    let createUser = {
        name: name,
        email: email
    }
    users.push(createUser);
    if (!name || !email) {
       res.status(400).json({status : "cant add new user"}) 
    }
    res.status(200).json({status : "ok", createUser}); 
})
app.get('/users' , (req, res, next)=>{
    res.status(200).json(users);
})
app.get('/users/:id', (req, res, next)=>{
    const id = req.params.id;
    const identifiedUser = users.find(u => u.id == id);
    if (identifiedUser) {
        res.status(200).json({message: "user fetched successfully" , identifiedUser});
    }
    else{
        res.status(400).json({message : "user not found"})
    }
})
app.patch('/updateUser/:id', (req, res, next)=>{
    const id = req.params.id;
    const {name,  email} = req.body;
    const isUserPresent = users.find(u => u.id == id);
    if (isUserPresent) {
        const index = users.findIndex(u => u.id == id);
        users [index] = {id: id, name : name, email: email};
        res.status(200).json({msg: "user is present, updated user is attached", data: {name:name, email: email}});
    } else {
        res.status(400).json({msg: "user not found"});
    }
})
app.delete('/users/:id', (req, res, next)=>{
    const id = req.params.id;
    const isUserPresent = users.find(u => u.id == id);
    if (isUserPresent) {
        const deleteUser = users.filter(u => u.id != id);
        users = deleteUser;
        res.status(200).json({msg: "user deleted successfully"});
    } else {
        res.status(400).json({msg: "could not delete the user, user doesnt exists"});
    }
})
app.listen(8003, ()=>{
    console.log("Port running on 8003");
})