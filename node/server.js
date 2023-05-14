const express = require("express");
const path = require("path");
// const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 

const util = require('util');

// require("dotenv").config();

// require("./config/database");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/schedule", require("./routes/api/schedule"));

// app.get("/*", function(req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.render('server', {});
    // alert(`Express app running on port ${port}`)
    // console.log(`Express app running on port ${port}`);
    // res.render("index.ejs");
  });

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});






/* START OF PLAID INTERGRATION */

/*
// AUTH
app.post('/api/create_link_token', async function (request, response) {
  // Get the client_user_id by searching for the current user
  // const user = await User.find(...);
  const clientUserId = user.id;
  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientUserId,
    },
    client_name: 'Plaid Test App',
    products: ['auth'],
    language: 'en',
    webhook: 'https://webhook.example.com',
    redirect_uri: 'https://domainname.com/oauth-page.html',
    country_codes: ['US'],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(request);
    response.json(createTokenResponse.data);
  } catch (error) {
    // handle error
  }
});

app.post('/api/exchange_public_token', async function (
  request,
  response,
  next,
) {
  const publicToken = request.body.public_token;
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;
    res.json({ public_token_exchange: 'complete' });
  } catch (error) {
    // handle error
  }
});










// GET ACCOUNTS
const prettyPrintResponse = (response) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};

const formatError = (error) => {
  return {
    error: { ...error, status_code: error },
    // error: { ...error.data, status_code: error.status },
  };
};

app.get('/api/accounts', async function (request, response, next) {
  try {
    const accountsResponse = await client.accountsGet({
      access_token: accessToken,
    });
    prettyPrintResponse(accountsResponse);
    response.json(accountsResponse.data);
  } catch (error) {
    prettyPrintResponse(error);
    return response.json(formatError(error.response));
  }
});
*/

/* END OF PLAID INTERGRATION */
