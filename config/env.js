const env = {
  develop: {
    port: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || "localhost",
    dbPort: process.env.DB_PORT || 27017,
    dbName: process.env.DB_NAME || "test",
    dbUser: process.env.DB_USER || "postgres",
    dbPass: process.env.DB_PASSWORD || "123456",
    secretToken: process.env.ACCESS_TOKEN_SECRET,
  },
  test: {
    port: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || "localhost",
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME || "test",
    dbUser: process.env.DB_USER || "postgres",
    dbPass: process.env.DB_PASSWORD || "123456",
    secretToken: process.env.ACCESS_TOKEN_SECRET,
  },
  production: {
    port: process.env.PORT,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASSWORD,
    secretToken: process.env.ACCESS_TOKEN_SECRET,
  },
};

export function getEnv() {
  if (process.env.NODE_ENV === "production") {
    return env.production;
  } else if (process.env.NODE_ENV === "test") {
    return env.test;
  } else {
    return env.develop;
  }
}
