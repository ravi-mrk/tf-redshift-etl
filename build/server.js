"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Overide default config to use desired profile. There are multiple ways how to do that.
// Check https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
_awsSdk2.default.config = new _awsSdk2.default.Config({
  credentials: new _awsSdk.SharedIniFileCredentials({
    profile: "my-default"
  }),
  // Event with correct config file with region for profile, this still seems to be needed explicitly.
  region: "us-west-2"
});
const firehoseClient = new _awsSdk.Firehose();

const app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

app.post("/data", async (req, res, next) => {
  try {
    // For production, putRecordBatch should be more efficient.
    await firehoseClient.putRecord({
      Record: {
        Data: JSON.stringify(_extends({
          timestamp: new Date()
        }, req.body))
      },
      DeliveryStreamName: "test_pipeline_firehose"
    }).promise();

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIuanMiXSwibmFtZXMiOlsiQVdTIiwiY29uZmlnIiwiQ29uZmlnIiwiY3JlZGVudGlhbHMiLCJTaGFyZWRJbmlGaWxlQ3JlZGVudGlhbHMiLCJwcm9maWxlIiwicmVnaW9uIiwiZmlyZWhvc2VDbGllbnQiLCJGaXJlaG9zZSIsImFwcCIsInVzZSIsImJvZHlQYXJzZXIiLCJqc29uIiwicG9zdCIsInJlcSIsInJlcyIsIm5leHQiLCJwdXRSZWNvcmQiLCJSZWNvcmQiLCJEYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInRpbWVzdGFtcCIsIkRhdGUiLCJib2R5IiwiRGVsaXZlcnlTdHJlYW1OYW1lIiwicHJvbWlzZSIsInNlbmRTdGF0dXMiLCJlcnIiLCJwb3J0IiwicHJvY2VzcyIsImVudiIsIlBPUlQiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBO0FBQ0FBLGlCQUFJQyxNQUFKLEdBQWEsSUFBSUQsaUJBQUlFLE1BQVIsQ0FBZTtBQUMxQkMsZUFBYSxJQUFJQyxnQ0FBSixDQUE2QjtBQUN4Q0MsYUFBUztBQUQrQixHQUE3QixDQURhO0FBSTFCO0FBQ0FDLFVBQVE7QUFMa0IsQ0FBZixDQUFiO0FBT0EsTUFBTUMsaUJBQWlCLElBQUlDLGdCQUFKLEVBQXZCOztBQUVBLE1BQU1DLE1BQU0sd0JBQVo7O0FBRUFBLElBQUlDLEdBQUosQ0FBUUMscUJBQVdDLElBQVgsRUFBUjs7QUFFQUgsSUFBSUksSUFBSixDQUFTLE9BQVQsRUFBa0IsT0FBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxJQUFqQixLQUEwQjtBQUMxQyxNQUFJO0FBQ0Y7QUFDQSxVQUFNVCxlQUNIVSxTQURHLENBQ087QUFDVEMsY0FBUTtBQUNOQyxjQUFNQyxLQUFLQyxTQUFMO0FBQ0pDLHFCQUFXLElBQUlDLElBQUo7QUFEUCxXQUVEVCxJQUFJVSxJQUZIO0FBREEsT0FEQztBQU9UQywwQkFBb0I7QUFQWCxLQURQLEVBVUhDLE9BVkcsRUFBTjs7QUFZQVgsUUFBSVksVUFBSixDQUFlLEdBQWY7QUFDRCxHQWZELENBZUUsT0FBT0MsR0FBUCxFQUFZO0FBQ1paLFNBQUtZLEdBQUw7QUFDRDtBQUNGLENBbkJEOztBQXFCQSxJQUFJQyxPQUFPQyxRQUFRQyxHQUFSLENBQVlDLElBQVosSUFBb0IsSUFBL0I7QUFDQXZCLElBQUl3QixNQUFKLENBQVdKLElBQVgsRUFBaUIsWUFBVztBQUMxQkssVUFBUUMsR0FBUixDQUFZLDhCQUE4Qk4sSUFBMUM7QUFDRCxDQUZEIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCBBV1MsIHsgU2hhcmVkSW5pRmlsZUNyZWRlbnRpYWxzLCBGaXJlaG9zZSB9IGZyb20gXCJhd3Mtc2RrXCI7XG5cbi8vIE92ZXJpZGUgZGVmYXVsdCBjb25maWcgdG8gdXNlIGRlc2lyZWQgcHJvZmlsZS4gVGhlcmUgYXJlIG11bHRpcGxlIHdheXMgaG93IHRvIGRvIHRoYXQuXG4vLyBDaGVjayBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vc2RrLWZvci1qYXZhc2NyaXB0L3YyL2RldmVsb3Blci1ndWlkZS9sb2FkaW5nLW5vZGUtY3JlZGVudGlhbHMtc2hhcmVkLmh0bWxcbkFXUy5jb25maWcgPSBuZXcgQVdTLkNvbmZpZyh7XG4gIGNyZWRlbnRpYWxzOiBuZXcgU2hhcmVkSW5pRmlsZUNyZWRlbnRpYWxzKHtcbiAgICBwcm9maWxlOiBcIm15LWRlZmF1bHRcIlxuICB9KSxcbiAgLy8gRXZlbnQgd2l0aCBjb3JyZWN0IGNvbmZpZyBmaWxlIHdpdGggcmVnaW9uIGZvciBwcm9maWxlLCB0aGlzIHN0aWxsIHNlZW1zIHRvIGJlIG5lZWRlZCBleHBsaWNpdGx5LlxuICByZWdpb246IFwidXMtd2VzdC0yXCJcbn0pO1xuY29uc3QgZmlyZWhvc2VDbGllbnQgPSBuZXcgRmlyZWhvc2UoKTtcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuYXBwLnBvc3QoXCIvZGF0YVwiLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgdHJ5IHtcbiAgICAvLyBGb3IgcHJvZHVjdGlvbiwgcHV0UmVjb3JkQmF0Y2ggc2hvdWxkIGJlIG1vcmUgZWZmaWNpZW50LlxuICAgIGF3YWl0IGZpcmVob3NlQ2xpZW50XG4gICAgICAucHV0UmVjb3JkKHtcbiAgICAgICAgUmVjb3JkOiB7XG4gICAgICAgICAgRGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgLi4ucmVxLmJvZHlcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBEZWxpdmVyeVN0cmVhbU5hbWU6IFwidGVzdF9waXBlbGluZV9maXJlaG9zZVwiXG4gICAgICB9KVxuICAgICAgLnByb21pc2UoKTtcblxuICAgIHJlcy5zZW5kU3RhdHVzKDIwMCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIG5leHQoZXJyKTtcbiAgfVxufSk7XG5cbmxldCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuYXBwLmxpc3Rlbihwb3J0LCBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coXCJTZXJ2ZXIgbGlzdGVuaW5nIG9uIHBvcnQgXCIgKyBwb3J0KTtcbn0pO1xuIl19