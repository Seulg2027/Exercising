const express = require('express'); //1.express module
const bodyParser = require('body-parser'); //2. body-parser(post형식에 필요)
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs'); //3. fs 파일 읽기, 쓰기 형식에 필요
const mysql = require('mysql'); //4. mysql module

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});
connection.connect();


app.get('/api/customers', (req,res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, ()=>{console.log(`listening on port${port}`)});