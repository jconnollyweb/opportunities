module.exports = {
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT
};

console.log("PGUSER:", process.env.PGUSER);
console.log("PGHOST:", process.env.PGHOST);

