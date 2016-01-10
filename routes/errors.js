//Error routing module

module.exports = function (app) {

  // 404s
  app.use(function (req, res, next) {
    res.status(404);

    if (req.accepts('html')) {
      return res.send("<h2>Find the page, I did not.  Seek again, user.  Backwards speak, you say I do?  The one lost you are, are you not?</h2>");
    }

    if (req.accepts('json')) {
      return res.json({ error: 'JSON file not found.' });
    }

    // default response type
    res.type('txt');
    res.send("Find the page, I did not.  Seek again, user.  Backwards speak, you say I do?  The one lost you are, are you not?  And a text-based browser you use at that?");
  })

   // 500
  app.use(function (err, req, res, next) {
    console.error('Error at %s\n', req.url, err.stack);
    res.send(500, "<h2>The page you seek this is not, friend...Occurred, an error has, while loading.  Curse not, for no good it will do you.</h2>");
  })
}
