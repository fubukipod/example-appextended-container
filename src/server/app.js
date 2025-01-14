const express = require("express");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const PORT = 3000;
const STATIC_ASSETS_PATH = path.resolve(__dirname, '../../static');

const app = express();

app.use(express.json());

app.use("/static", express.static(STATIC_ASSETS_PATH));

app.get("/api/system-info", (req, res) => {
  const osPlatform = os.platform();
  const osRelease = os.release();
  const nodeVersion = process.version;

  exec('npm -v', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing npm version: ${error}`);
      return res.status(500).json({ error: "Failed to retrieve npm version" });
    }

    const npmVersion = stdout.trim();

    res.json({
      os: `${osPlatform} ${osRelease}`,
      nodeVersion,
      npmVersion
    });
  });
});

app.get("/", (request, response) => {
  response.send(`
<!DOCTYPE html>
<html>
  <body>
    <div id="container"></div>
    <script src="/static/bundle.js"></script>
  </body>
</html>
  `);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}.\n\nLoad it in your browser at http://localhost:${PORT}`));
