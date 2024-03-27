require("dotenv").config();
const express = require("express")
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000
const { Sequelize, DataTypes } = require("sequelize");
app.use(express.json())
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

  app.put("/values/:id", async (req, res) => {
    const { id } = req.params;
    const { forecast } = req.body;
  
    try {
      // Find the value by its id
      const value = await post.findByPk(id);
      if (!value) {
        return res.status(404).json({ error: 'Value not found' });
      }
  
      // Update the forecast value
      value.forecast = forecast;
      await value.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating forecast:", error);
      res.status(500).json({ error: "Failed to update forecast in the database." });
    }
  });

  const post = sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    engagement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    channel: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    revenue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    forecast: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  });

  app.post("/values", async (req, res) => {
    const { account, sector, engagement, startdate, enddate, channel, owner, originator, role, location, revenue, forecast, notes, grade } = req.body;
    try {
      const newPost = await post.create({ account, sector, engagement, startdate, enddate, channel, owner, originator, role, location, revenue, forecast, notes, grade });
      res.json(newPost);
    } catch (err) {
      console.log(err);
    }
  });

  // test database

  app.get("/values/all", async (req, res) => {
    try {
      const allPosts = await post.findAll();
      res.json(allPosts);
    } catch (err) {
      console.log(err);
      console.log(allPosts)
    }
  });

  app.get("/values/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const value = await post.findByPk(id); // Find a value by its primary key (id)
      if (!value) {
        return res.status(404).json({ error: 'Value not found' });
      }
      // Map the retrieved value to match the desired response format
      const jsonData = {
        id: value.id,
        account: value.account,
        sector: value.sector, 
        engagement: value.engagement,
        startdate: value.startdate,
        enddate: value.enddate,
        channel: value.channel,
        owner: value.owner,
        originator: value.originator,
        role: value.role,
        location: value.location,
        revenue: value.revenue,
        forecast: value.forecast,
        notes: value.notes,
        grade: value.grade,
      };
      res.json(jsonData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// // const keys = require("./keys");

// // Express Application setup
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// // const port = process.env.PORT || 3001

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Postgres client setup
// const { Pool } = require("pg");
// const pgClient = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT
// });



// pgClient.on("connect", client => {
//   client
//     .query(`CREATE TABLE IF NOT EXISTS values (
//       id serial PRIMARY KEY,
//       account TEXT, 
//       sector TEXT[],
//       engagement TEXT,
//       startdate DATE,
//       enddate DATE,
//       channel TEXT[],
//       owner TEXT,
//       originator TEXT,
//       role TEXT[],
//       location TEXT,
//       revenue INT,
//       forecast TEXT[],
//       notes TEXT,
//       grade TEXT[]
//       )
//       `)
//     .catch(err => console.log("PG ERROR", err));
// });

// //Express route definitions
// app.get("/", (req, res) => {
//   res.send("John server");
//   res.send({ message: 'Server is up and running!' });
// });

// app.put("/values/:id", async (req, res) => {
//   const { id } = req.params;
//   const { forecast } = req.body;

//   try {
//     await pgClient.query(
//       "UPDATE values SET forecast = $1 WHERE id = $2",
//       [forecast, id]
//     );

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Error updating forecast:", error);
//     res.status(500).json({ error: "Failed to update forecast in the database." });
//   }
// });

// // get the values
// app.get("/values/all", async (req, res) => {
//   try {
//     const values = await pgClient.query("SELECT * FROM values");
//     const jsonData = values.rows.map(row => ({
//       id: row.id,
//       account: row.account,
//       sector: row.sector,
//       engagement: row.engagement,
//       startdate: row.startdate,
//       enddate: row.enddate,
//       channel: row.channel,
//       owner: row.owner,
//       originator: row.originator,
//       role: row.role,
//       location: row.location,
//       revenue: row.revenue,
//       forecast: row.forecast,
//       notes: row.notes,
//       grade: row.grade,

//     }));
//     res.json(jsonData);
//   } catch (error) {
//     console.error("Error fetching values:", error);
//     res.status(500).json({ error: "Failed to fetch values from the database." });
//     console.log('values', values)
//   }
// });


// app.get("/api/roles", async (req, res) => {
//   try {
//     const roles = await pgClient.query("SELECT DISTINCT UNNEST(role) AS role FROM values");
//     const uniqueRoles = roles.rows.map((row) => row.role);
//     res.json(uniqueRoles);
//   } catch (error) {
//     console.error("Error fetching unique roles:", error.response.data);
//     res.status(500).json({ error: "Failed to fetch unique roles from the database." });
//   }
// });


// app.get("/values/:id", async (req, res) => {
//   const { id } = req.params
//  try {
//   const values = await pgClient.query("SELECT * FROM values WHERE id = $1", [id])
//   const jsonData = values.rows.map(row => ({
//     id: row.id,
//     account: row.account,
//     sector: row.sector, 
//     engagement: row.engagement,
//     startdate: row.startdate,
//     enddate: row.enddate,
//     channel: row.channel,
//     owner: row.owner,
//     originator: row.originator,
//     role: row.role,
//     location: row.location,
//     revenue: row.revenue,
//     forecast: row.forecast,
//     notes: row.notes,
//     grade: row.grade,
//   }))
//   res.json(jsonData)
// } catch (error) {
//   console.error('error', error)
//   res.status(500).json({ error: 'Internal server error'})
// }
// })


// app.post("/values", async (req, res) => {
//   const { account, sector, engagement, startdate, enddate, channel, owner, originator, role, location, revenue, forecast, notes, grade } = req.body
//   if (!account || !sector || !engagement || !startdate || !enddate || !channel || !owner || !originator || !role || !location || !revenue || !forecast || !grade) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     await pgClient.query(
//       "INSERT INTO values(account, sector, engagement, startdate, enddate, channel, owner, originator, role, location, revenue, forecast, notes, grade) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
//       [account, sector, engagement, startdate, enddate, channel, owner, originator, role, location, revenue, forecast, notes, grade]
//     );

//     res.json({ working: true });
//   } catch (error) {
//     console.error("Error inserting values:", error);
//     res.status(500).json({ error: "Failed to insert values into the database." });
//   }

// });

// app.listen(5000, err => {
//   console.log("Listening");
// });
