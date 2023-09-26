const finalLog = require("./logs_result.json");

const DURATION_IN_MS = 15000;
const ALERT_DURATION = 15000;
const ENVIRONMENT = "production";

function getDurationMessage(durationInMs) {
  const displayAlert = durationInMs > ALERT_DURATION ? `🚨🚨🚨🚨🚨🚨` : "";
  return `${(durationInMs / 1000).toFixed(2)} seconds ${displayAlert}`;
}

console.log("Full log length:", finalLog.length, "entries");
finalLog.forEach((log) => {
  if (
    log.lambdaDurationInMs > DURATION_IN_MS &&
    log.environment === ENVIRONMENT
  ) {
    console.log(`
        PathName: ${log.requestPath}
        Function: ${log.function}
        RequestPath: ${log.requestPath}
        RequestMethod: ${log.requestMethod}
        RequestId: ${log.requestId}
        responseStatusCode: ${
          log.responseStatusCode === 504
            ? `${log.responseStatusCode} 🚨🚨🚨🚨🚨🚨`
            : `${log.responseStatusCode}`
        }
        VercelCache: ${log.vercelCache}
        Environment: ${log.environment}
        Host: ${log.host}
        Duration: ${getDurationMessage(log.lambdaDurationInMs)}
        TimestampInMs: ${log.timestampInMs}
        Time: ${new Date(log.timestampInMs)}
      `);
  }
});
