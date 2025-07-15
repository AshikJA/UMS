const express = require("express");
const app = express();
require("dotenv").config({ quiet: true });

const userRoute = require("./Routes/userRoute");
const adminRoute = require("./Routes/adminRoute");
const  db  = require("./db/db");


const PORT = 3000 || process.env.PORT


//for user routes
app.use("/", userRoute);

//for admin routes
app.use("/admin", adminRoute);

//for MonogoDB
db()

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
