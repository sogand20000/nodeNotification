const express = require("express");
const app = express();
const cors = require("cors");
const webpush = require("web-push");
//const { createClient } = require("@supabase/supabase-js");
const port = 3004;
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
const subDatabase = [];
// const supabase = createClient(
//   "https://fvilglklgsllkcpzasaa.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2aWxnbGtsZ3NsbGtjcHphc2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2Mjc3NzgsImV4cCI6MTk5MDIwMzc3OH0.5A_E3MTPnHRU47kAG0EfOZnSTM-j6ewu6Euv_kmG-l8"
// );

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello word 1");
});
const items = [];
// async function getItem() {
//   return await supabase.from("subscribes").select("*");
// }

// app.get("/send-notification", (req, res) => {
//   var items = getItem();
//   // console.log(items[0]);
//   //webpush.sendNotification("item1", "somayeh");
// });
app.get("/send-notification", async (req, res) => {
  // return await supabase
  //   .from("subscribes")
  //   .select("*")
  //   .then(function (subscripstions) {
  //     //console.log(subscripstions.data[0].data);
  //     var pushConfig = {
  //       endpoint: subscripstions.data[0].data.endpoint,
  //       keys: subscripstions.data[0].data.keys, //{
  //       //auth: subscripstions.data[0].data.keys.auth,
  //       //p256dh: subscripstions.data[0].data.keys.p256dh,
  //       //},
  //    };
  // console.log(pushConfig);
  const b = {
    endpoint:
      "https://fcm.googleapis.com/fcm/send/c26CjN6tvNw:APA91bGZ8TnaQUxVfxUOWzAVY7roiGIRmkK7coxetYZ67aIB0p2x0yzXLXU10Aeil3flArQg34-8BD_Iox4kB9U7rG1qFemqzr2ha00LOBYi0egEptAt1Q97CLLwpptiBYyOLxskhrGq",
    expirationTime: null,
    keys: {
      p256dh:
        "BFr61RpP16hDdBkJ89sB78MMQK33N2olXYGlTRRkrFlCxYzjkiTlPQZnw8xSnbLVWsBASsXGv_rHRTViwHhjt7w",
      auth: "h9nKR2RtmZ9EH_1W9GK48w",
    },
  };

  // subscripstions.data.forEach(function (sub) {
  var pushConfig = {
    endpoint: b.endpoint,
    keys: b.keys,
  };
  // console.log(pushConfig);
  // return;
  //  console.log(pushConfig);

  webpush
    .sendNotification(
      pushConfig,
      JSON.stringify({ title: "New Post", content: "New Post added !" })
    )
    .then(function (result) {
      console.log("result", result);
    })
    .catch(function (err) {
      console.log("err", err);
    });
  //});
  res.json({ statue: "Success" });
  //  });
});
app.listen(port, () => {
  console.log("server running on port 30004!");
});

// supabase
// .from("subscripstion")
// .select("*")
// .then(function (subscripstions) {
//   subscripstions
//     .forEach(function (sub) {
//       var options = {
//         endpoint: sub.endpoint,
//         keys: sub.json,
//       };
//       console.log(options);
//       // serviceWorkerRegistration.pushManager.subscribe(options);
//     })
//     .cache(function (err) {
//       console.log();
//     });
//   // const options = {
//   //   userVisibleOnly: true,
//   //   keys:{
//   //     auth:
//   //   }
//   //applicationServerKey,
//   //};
// });
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};
