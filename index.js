const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001
const bodyParser = require("body-parser");
const dbConnect = require("./config/mongo")
const {CORS_URL} = process.env
const morgan = require("morgan")


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', CORS_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use("/api", require("./routes"))
app.use(express.json())
app.use(jsonParser)
app.use(urlencodedParser)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`listening on port ${port}!`))

dbConnect()