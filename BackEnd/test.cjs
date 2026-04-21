const { Pool } = require("pg");
const pool = new Pool({ connectionString: "postgresql://neondb_owner:npg_c3HXQDauSf5h@ep-summer-hat-antuh6ta-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require" });
pool.query("SELECT pg_get_viewdef('vista_facturas', true)", (err, res) => {
  if (err) console.error(err);
  else console.log(res.rows[0].pg_get_viewdef);
  pool.end();
});
