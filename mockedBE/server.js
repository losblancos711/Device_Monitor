const appliances = require("./api/v1/appliances.json");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 9000;

app.use(cors());

app.get("/api/v1/appliances", (req, res) => {
  const deviceStatus = req.query.devicestatus;
  const downloadStatus = req.query.downloadstatus;
  if (deviceStatus) {
    const filtered = appliances.filter(
      (a) => a?.deviceStatus.toLowerCase() === deviceStatus.toLowerCase()
    );
    if (filtered.length) {
      res.send(filtered);
    } else {
      res.send(500);
    }
  } else if (downloadStatus) {
    const filtered = appliances.filter(
      (a) => a?.downloadStatus.toLowerCase() === downloadStatus.toLowerCase()
    );
    if (filtered.length) {
      res.send(filtered);
    } else {
      res.send(500);
    }
  } else {
    if (appliances?.length) {
      res.send(appliances);
      res.send(200);
    } else {
      res.send(500);
    }
  }
});

app.get("/api/v1/appliances/:id/info", (req, res) => {
  const applianceId = req.params.id;
  const appliance = appliances?.find(
    (appliance) => appliance?.id == applianceId
  );
  if (appliance) {
    res.send(appliance);
  } else {
    res.send(appliance);
  }
});

app.listen(port, () => {
  console.log(`Mock server is running on port ${port}`);
});
