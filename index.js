const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

const port = process.env.PORT || 3000;
const TOKEN = process.env.LINE_ACCESS_TOKEN;

// Reply with two static messages

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/webhook", (req, res) => {
  res.send("HTTP POST request sent to the webhook URL!");
  let reply_token = req.body.events[0].replyToken;
  reply(reply_token);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});

function reply(reply_token) {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 6GhvnaaBtEWipStWBjaC/Z8/PehPsK1SCHuN2QS+V7wM2hZEVxdJMDVIqjhBVENj1Q1SV1/BtVGE7JUBDY19ihpR1Sg6h+HpEKYuHtP7Ux3Qg2Gcx+yyt0H3H9ZlhYtQB1QlDokyXF9bQJh9uStMjwdB04t89/1O/w1cDnyilFU=",
  };

  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: "Hello",
      },
      {
        type: "text",
        text: "How are you?",
      },
    ],
  });

  request.post(
    {
      url: 'https://api.line.me/v2/bot/message/reply',
      headers: headers,
      body: body,
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
}
