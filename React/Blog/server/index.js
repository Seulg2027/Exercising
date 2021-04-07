const express = require('express');
const mongoose = require('mongoose');
const config = require("./config/index");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
    // CORS = Cross Origin Resourse Sharing
    // 꼭 필요한 것,,,
const morgan = require("morgan");

const app = express();

// hpp 중복 이름 공격을 방어
// helmet 보안을 위해 설정해놓은 것,, 찾아보기
app.use(hpp());
app.use(helmet());


app.use(
    cors({
        orgin: true,
        credentials: true
    })
)

app.use(morgan("dev")); //통신에 대한 log를 보여준다. 개발하는 과정에서만 morgan 보여준다. backend랑 클라언트랑,,
app.use(express.json());
// body-parser 대신 사용
// post 통신 시 data를 주고받기 위해서 사용

const { MONGO_URI, PORT } = config;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(()=>{
    console.log(`mongodb connecting start`);
}).catch((err)=>{
    console.log(err);
});

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, ()=> {
    console.log(`Server started on ${PORT} port`);
});