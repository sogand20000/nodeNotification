const express = require("express");
const app = express();
const webpush = require("web-push");
const cors = require("cors");

const port = 3005;

const apiKeys = {
  publicKey:
    "BEc2zG6CoCTTgT-Mv0YgzX6TSjG5RsX-L2P6TlXob4_lTzVn1WOUBS4c0vvYLsBrpG1IhURlAydHdQSkhk9cUH8",
  privateKey: "hbGIiOYuGSYCC4pPx_ewvwhDzhZwXVQ3zQTflblxGAg",
};

webpush.setVapidDetails(
  "mailto:Somy.gh1989@gmail.com",
  apiKeys.publicKey,
  apiKeys.privateKey
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const subDatabse = [];

app.post("/save-subscription", (req, res) => {
  subDatabse.push(req.body);
  res.json({ status: "Success", message: "Subscription saved!" });
});

app.get("/send-notification", (req, res) => {
  const notificationPayload = {
    title: "New Message",
    body: "You have a new message",
    icon: "download.png",
    // sound: "notification.mp3",
  };
  //JSON.stringify(notificationPayload)
  webpush.sendNotification(subDatabse[0], "hi somayeh");

  //console.log(subDatabse[0]);
  // webpush.sendNotification(subDatabse[0], "ccc");
  res.json({ statue: "Success", message: "Message sent to push service" });
});

app.listen(port, () => {
  console.log("Server running on port 3000!");
});
