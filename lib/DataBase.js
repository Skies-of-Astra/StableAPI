const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = {
  start: async () => {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();

      // Establish and verify connection
      await listDatabases(client);
      await listCollection(client);
      module.exports.initDB(client);
      console.log("Connected successfully to server");
    } finally {
      // TODO: Add ERROR feedback
    }
  },
  initDB: async function (client) {
    const res = await client
      .db("soadb")
      .collection("images")
      .findOne({ testDoc: "test" });
    if (res) {
      console.log("Listing found");
    } else {
      console.log("No strings found");
    }
    await client.close();
  },
  addEntry: async function (doc) {
    await client.connect();
    const result = await client.db("soadb").collection("images").insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    await client.close();
    return result.insertedId;
  },
};

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function listCollection(client) {
  databasesList = await client
    .db("soadb")
    .collection("images")
    .find()
    // Execute the each command, triggers for each document
    // .each(function (err, collInfos) {

    .toArray(function (err, collInfos) {
      console.log(collInfos);
      // collInfos is an array of collection info objects that look like:
      // { name: 'test', options: {} }
    });
}
