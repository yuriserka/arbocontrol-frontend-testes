function returnHttpError(res, message) {
  return res.status(400).json({
    ok: false,
    message
  });
}

function handleStdout(res, data) {
  const stdoutErrPattern = /^Error: .*/gm;

  if (stdoutErrPattern.test(data)) {
    return res.status(400).json({
      ok: false,
      message: data.match(stdoutErrPattern),
    });
  }

  console.log(data);
}

function exitHandler(res, retCode) {
  if (!res.headersSent) {
    return res.status(!retCode ? 200 : 400).json({
      ok: retCode === 0
    });
  }
}

module.exports = {
  returnHttpError,
  handleStdout,
  exitHandler,
};
