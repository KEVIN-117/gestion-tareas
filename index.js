import app from "./src/app.js";
import { dbPool } from "./src/db/connector.js";
import { getEnv } from "./config/env.js";

const { port } = getEnv();

app.listen(port, () => {
  try {
    dbPool.connect((err, client, release) => {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      client.query("SELECT NOW()", (err, result) => {
        release();
        if (err) {
          return console.error("Error executing query", err.stack);
        }
        console.log("connected to the db");
        console.log(`Server is running on port ${port}`);
        console.log(result.rows);
      });
    });
  } catch (e) {
    console.log(e);
  }
});
