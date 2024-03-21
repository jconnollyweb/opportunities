// const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const port = process.env.PORT || 3001

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: post_john_user,
  host: dpg-cnu57cu3e1ms7384llv0-a,
  database: post_john,
  password: dzsigc4N91gjCu2dZtG9AVr8PM1OASEb,
  port: 5432
});

pgClient.on("connect", client => {
  client
    .query(`CREATE TABLE IF NOT EXISTS values (
      id serial PRIMARY KEY,
      account TEXT, 
      sector TEXT[],
      engagement TEXT,
      startdate DATE,
      enddate DATE,
      channel TEXT[],
      owner TEXT,
      originator TEXT,
      role TEXT[],
      location TEXT,
      revenue INT,
      forecast TEXT[],
      notes TEXT,
      grade TEXT[]
      )
      `)
    .catch(err => console.log("PG ERROR", err));
});

//Express route definitions
app.get("/", (req, res) => {
  res.send("John server");
  res.send({ message: 'Server is up and running!' });
});

app.put("/values/:id", async (req, res) => {
  const { id } = req.params;
  const { forecast } = req.body;

  try {
    await pgClient.query(
      "UPDATE values SET forecast = $1 WHERE id = $2",
      [forecast, id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating forecast:", error);
    res.status(500).json({ error: "Failed to update forecast in the database." });
  }
});

// get the values
app.get("/values/all", async (req, res) => {
  try {
    const values = await pgClient.query("SELECT * FROM values");
    const jsonData = values.rows.map(row => ({
      id: row.id,
      account: row.account,
      sector: row.sector,
      engagement: row.engagement,
      startdate: row.startdate,
      enddate: row.enddate,
      channel: row.channel,
      owner: row.owner,
      originator: row.originator,
      role: row.role,
      location: row.location,
      revenue: row.revenue,
      forecast: row.forecast,
      notes: row.notes,
      grade: row.grade,

    }));
    res.json(jsonData);
  } catch (error) {
    console.error("Error fetching values:", error);
    res.status(500).json({ error: "Failed to fetch values from the database." });
    console.log('values', values)
  }
});


app.get("/api/roles", async (req, res) => {
  try {
    const roles = await pgClient.query("SELECT DISTINCT UNNEST(role) AS role FROM values");
    const uniqueRoles = roles.rows.map((row) => row.role);
    res.json(uniqueRoles);
  } catch (error) {
    console.error("Error fetching unique roles:", error.response.data);
    res.status(500).json({ error: "Failed to fetch unique roles from the database." });
  }
});


app.get("/values/:id", async (req, res) => {
  const { id } = req.params
 try {
  const values = await pgClient.query("SELECT * FROM values WHERE id = $1", [id])
  const jsonData = values.rows.map(row => ({
    id: row.id,
    account: row.account,
    sector: row.sector, 
    engagement: row.engagement,
    startdate: row.startdate,
    enddate: row.enddate,
    channel: row.channel,
    owner: row.owner,
    originator: row.originator,
    role: row.role,
    location: row.location,
    revenue: row.revenue,
    forecast: row.forecast,
    notes: row.notes,
    grade: row.grade,
  }))
  res.json(jsonData)
} catch (error) {
  console.error('error', error)
  res.status(500).json({ error: 'Internal server error'})
}
})


app.post("/values", async (req, res) => {
  const { account, sector, engagement, startdate, enddate, channel, owner, originator, role, location, revenue, forecast, notes, grade } = req.body
  if (!account || !sector || !engagement || !startdate || !enddate || !channel || !owner || !originator || !role || !location || !revenue || !forecast || !grade) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await pgClient.query(
      "INSERT INTO values(account, sector, engagement, startdate, enddate, channel, owner, originator, role, location, revenue, forecast, notes, grade) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
      [account, sector, engagement, startdate, enddate, channel, owner, originator, role, location, revenue, forecast, notes, grade]
    );

    res.json({ working: true });
  } catch (error) {
    console.error("Error inserting values:", error);
    res.status(500).json({ error: "Failed to insert values into the database." });
  }

});

app.listen(5000, err => {
  console.log("Listening");
});
