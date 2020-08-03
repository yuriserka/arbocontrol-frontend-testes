const express = require('express');
const { join } = require('path');
const { exists } = require('fs');
const { spawn } = require('child_process');
const cors = require('cors');
const morgan = require('morgan');
const {
  returnHttpError,
  handleStdout,
  exitHandler,
} = require('./utils');
const { HOST, PORT } = require('./config');

const app = express();

app.use(cors({
  origin: 'http://localhost:3333'
}));

app.use(morgan('dev'));
app.use(express.json());

app.post('/test', (req, res) => {
  const testProc = spawn('yarn', ['test']);

  testProc.stdout.on('data', data => handleStdout(res, data.toString()));
  testProc.stderr.on('data', data => returnHttpError(res, data));
  testProc.on('error', err => returnHttpError(res, err.message));
  testProc.on('exit', (code, signal) => exitHandler(res, code));
});

// app.post('/report', (req, res) => {
//   const reportProc = spawn('yarn', ['report']);

//   reportProc.stdout.on('data', data => handleStdout(res, data.toString()));
//   reportProc.stderr.on('data', data => returnHttpError(res, data));
//   reportProc.on('error', err => returnHttpError(res, err.message));
//   reportProc.on('exit', (code, signal) => exitHandler(res, code));
// });

app.get('/report', (req, res) => {
  const reportFile = join(`${__dirname}/../reports/report/index.html`);

  exists(reportFile, ok => {
    return ok
      ? res.status(200).sendFile(reportFile)
      : res.status(400).json({ message: 'é necessário gerar o relatório primeiro.' });
  });
});

app.listen(PORT, HOST, () =>
  console.log(`performance server running on ${HOST}:${PORT}.`),
);
