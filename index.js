const express = require("express");
const webpush = require("web-push");
const cors = require("cors");

// const express=require('express')
const path = require("path");
const app = express();
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello word 2");
});
const apiKeys = {
  publicKey:
    "BPxrjOWE46yXQaJbQ4_YjYly1beyOYnOj9fEZaLvwY4wUKiXVZcjtl0jG1AkbHEzmwy2SGraHlc2yDk4UmJOQSM",
  privateKey: "XeXHlVl4YE2yp-hAU7bdf061_ovTkFgqZzVF021OTqA",
};
webpush.setVapidDetails(
  "mailto:somy.gh1989@gmail.com",
  apiKeys.publicKey,
  apiKeys.privateKey
);

//subscrib Rute
app.post("/subscribe", (req, res) => {
  //Get pushSubscribscription object
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Push Test" });
  //pass object inti sendNotification
  subscription.forEach((element) => {
    console.log(element);
  });
  return;
  webpush
    .sendNotification(subscription, payload)
    .then(function (result) {
      console.log("result", result);
    })
    .catch((err) => console.log("err", err));
});

const port = 5000;
app.listen(port, () => {
  console.log("server running on port 5000");
});
