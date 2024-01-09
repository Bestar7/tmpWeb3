var indexRouter = require('./routes/index');
var phonebookRouter = require('./routes/phonebook');
var notesRouter = require('./routes/notes');

const { MONGODB_URI, PORT, DB_NAME } = require('./utils/config');
const express = require('express');
const cors = require('cors');
const middlewares = require('./utils/middlewares');
const { createDbWithData, createDbMangoose } = require('./utils/db-creation');
const { asyncStartMongMemoryServer } = require('./utils/mongo-memory-server');

const startAsyncDbWork = async () => {
  try {
    let db_uri = MONGODB_URI

    if (!MONGODB_URI) {
      const mongoMemoryServer = await asyncStartMongMemoryServer();
      db_uri = await mongoMemoryServer.getUri()
    }

    // Connect to database
    await createDbWithData(db_uri);
    await createDbMangoose(db_uri)
    console.log('Connected to database via Mongoose');
  } catch (err) {
    console.error('Unable to connect to database', err);
  }
};

startAsyncDbWork();

// Create server
const app = express();

// Init server
app.use(cors());
app.use(express.json());
app.use(middlewares.logger);

app.use('/', indexRouter);
app.use('/phonebook', phonebookRouter);
app.use('/notes', notesRouter);

app.use(middlewares.errorHandler);

// Start server
app.listen(PORT ?? 3000, () => {
  console.log(`Server running on port ${PORT ?? 3000}`);
});


