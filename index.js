const express = require("express")
const {Server} = require("socket.io")
const http  = require("http")
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let gameBoard = ["" , "" , "" , "" , "" , "" , "" , "" , ""];
let currentPlayer = "X"

io.on("connection" , socket=>{
    console.log("Connected",socket.id)
    socket.on("gameBoard" , gameBoard=>{
        io.emit("gameBoard" , gameBoard)
    })
    socket.on('move', cellIndex => {
        if (gameBoard[cellIndex] === '' && currentPlayer === 'X') {
          gameBoard[cellIndex] = 'X';
          currentPlayer = 'O';
        } else if (gameBoard[cellIndex] === '' && currentPlayer === 'O') {
          gameBoard[cellIndex] = 'O';
          currentPlayer = 'X';
        }
        console.log(gameBoard)
        io.emit('updateBoard', gameBoard );
      });

    socket.on("reset"  ,()=>{
      gameBoard = ["" , "" , "" , "" , "" , "" , "" , "" , ""];
       currentPlayer = "X"
      io.emit('updateBoard', gameBoard );
    })

})
app.use(express.static("./public"))

app.get("/" ,(req,res)=>{
    return res.sendFile("index.html")
})


server.listen(3000 , ()=>{
    console.log("Server started")
})