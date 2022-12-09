const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const line = require("@line/bot-sdk");
const port = process.env.PORT || 4000
const config = {
  channelAccessToken:
    "6GhvnaaBtEWipStWBjaC/Z8/PehPsK1SCHuN2QS+V7wM2hZEVxdJMDVIqjhBVENj1Q1SV1/BtVGE7JUBDY19ihpR1Sg6h+HpEKYuHtP7Ux3Qg2Gcx+yyt0H3H9ZlhYtQB1QlDokyXF9bQJh9uStMjwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "8637822f5e4b6fc5b3f6edb6e35619cf",
};

new line.Client(config);
line.middleware(config);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text,
  });
}

app.listen(port, () => {
  console.log("start server at port 3000");
});
