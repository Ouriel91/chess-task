const express = require("express")
const app = express()

app.use(express.static('../client'));

//logic functions:

//offsets array (of arrays) that in any cells the knight can move
const offsets = [
    [2,1], [1,2], [-1,2], [-2,1],
    [-2,-1], [-1,-2], [1,-2],[2,-1]
]

//function that parse the given id (from client) and checks 
//where the knight can move (x and y is row and column)
//in the end the function returns array of allowed cells
function getpositions(id){
    let res = [];
    let pos = id.split('_');
    let xLastPos = parseInt(pos[0]);
    let yLastPos = parseInt(pos[1]);

    for(let i = 0 ; i < offsets.length ; i++){

        let xNewPos = xLastPos + offsets[i][0];

        if(xNewPos >= 1 && xNewPos <= 8 ){
            let yNewPos = yLastPos + offsets[i][1];

            if(yNewPos >= 1 && yNewPos <= 8){
                
                res.push(xNewPos+"_"+yNewPos);
            }
        }
    }
    return res;
}

//get request to server that gets id from client 
//get positions of allowed cells of knight move from this id from getpositions function
//return response json object (to client) with allowed cells array
app.get("/positions", (req, res) => {

    const currentPosition = req.query.currentPosition;
    let positions = getpositions(currentPosition);
    res.json({ 
        pos: positions
    });     
});

app.listen(3000, () => {
    console.log('listen on 3000')
})