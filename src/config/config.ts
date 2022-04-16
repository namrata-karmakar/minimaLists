import convict from "convict";

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3012,
    env: "PORT",
  },
  dbURL: {
    doc: "Database connection string",
    format: String,
    default: "mongodb://localhost:27017",
    env: "DB_URL",
  },
  dbName: {
    doc: "Database name",
    format: String,
    default: "toDoDev",
    env: "DB_NAME",
  },
  secretString: {
    doc: "JWT Secret String",
    format: String,
    default: "mYsEcReT",
    env: "SECRET_STRING",
  },
});

// Load environment dependent configuration
const env = config.get("env");
config.loadFile(`${__dirname}/${env}.json`);

// Perform validation
config.validate({ allowed: "strict" });

export { config };
