const express = requre('express')

const app =  express();
const port = process.env.PORT || 1337;

app.listen(port, ()=> {
    console.log("Goto http://localhost:$(port)");
})