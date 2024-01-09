const express = require('express');
const middlewares = require('./utils/middlewares');
const notesRouter = require('./routes/notes/notesRouter');
const phonebookRouter = require('./routes/phonebook/phonebookRouter');

const app = express();

app.use(middlewares.logger);
app.use(middlewares.errorHandler);

app.use('/notes', notesRouter);
app.use('/phonebook', phonebookRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
