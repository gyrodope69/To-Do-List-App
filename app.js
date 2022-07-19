const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");   // we are inlcuding date module so that we can use that

const app = express();
let items = ["Buy some food", "Buys eegs", "Have food"];
let worksItems = [];

app.set("view engine", "ejs");       // This tells to use EJS as new engine

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));     // Every statuc thing is added in public and we said exress to include the file "public"

app.get("/", function (req, res) {
 
  let day = date.getDay();   // This is the date module that is manually create by us which returns formatted date
  res.render("list", { kindOfDay: day, newListItems: items });  // .render is  a meathos for EJS renders list.ejs and changes values of kindOfDay
});

app.post("/", function (req, res) {
  let item = req.body.newItems;
  if (req.body.list === "Work List") {
    worksItems.push(item);                     // This let item fetch whatever we submit through from inpu
    res.redirect("/work");
  } else {
    items.push(item);                          // The item got push into the items arrat
    res.redirect("/");                         // This redirect to the home root(get meathod)
  }
});

app.get("/work", function (req, res) {
  res.render("list", { kindOfDay: "Work List", newListItems: worksItems });
});


app.listen(3000, function () {
  console.log("Server running at http://localhost:3000");
});
