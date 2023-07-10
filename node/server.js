const express = require("express");
const path = require("path");
// const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 

const util = require('util');

require("dotenv").config();

// require("./config/database");

const app = express();

// require('dotenv').config();
const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

const bodyParser = require('body-parser');


app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());


app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// app.use(function(err, req, res, next){
//   res.status(err.status || 500);
//   res.send({
//       message: err.message,
//       error: err
//   });
//  return;
// });

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

let ACCESS_TOKEN = null

// Retrieve Investment Transactions for an Item
// https://plaid.com/docs/#investments
app.get('/api/investments_transactions', function (request, response, next) {
  Promise.resolve()
    .then(async function () {
      // const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      // const endDate = moment().format('YYYY-MM-DD');
      const startDate = '2018-01-01';
      const endDate = '2020-02-01';
      // start_date: '2018-01-01',
      // end_date: '2020-02-01'
      const configs = {
        access_token: ACCESS_TOKEN,
        start_date: startDate,
        end_date: endDate,
      };
      const investmentTransactionsResponse =
        await client.investmentsTransactionsGet(configs);
      prettyPrintResponse(investmentTransactionsResponse);
      response.json({
        error: null,
        investments_transactions: investmentTransactionsResponse.data,
      });
    })
    .catch(next);
});


/* Get Transaction history (24 months)*/
app.get('/transactions/get', async function (request, response) {
  // console.log('/api/getHistory: ', ... arguments)
  // console.log('/transactions/get - request: ', request)
  // console.log('/api/getHistory - response: ', response)

const req = {
  // access_token: PLAID_CLIENT_ID,
  access_token: null,
  // access_token: accessToken,
  // 'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
  // 'PLAID-SECRET': PLAID_SECRET,
  start_date: '2018-01-01',
  end_date: '2020-02-01'
};
try {
  // const response = client.transactionsGet(request);
  // console.log('client: ', client)

  console.log('req: ', req)
  const response = await client.transactionsGet(req);
  console.log('response: ', response)

  // let transactions = res.data.transactions;
  // console.log('transactions: ', transactions)
  // const total_transactions = res.data.total_transactions;
  // console.log('total_transactions: ', total_transactions)
  // // Manipulate the offset parameter to paginate
  // // transactions and retrieve all available data
  // while (transactions.length < total_transactions) {
  //   const paginatedRequest = {
  //     access_token: '63fbb0ae02d2d300129a427e',
  //     // access_token: accessToken,
  //     start_date: '2018-01-01',
  //     end_date: '2020-02-01',
  //     options: {
  //       offset: transactions.length,
  //     },
  //   };
  //   const paginatedResponse = client.transactionsGet(paginatedRequest);
  //   // const paginatedResponse = await client.transactionsGet(paginatedRequest);
  //   transactions = transactions.concat(
  //     paginatedResponse.data.transactions,
  //   );
  // }
} catch(err) {
  console.error(err)
}

}
)


app.post('/api/create_link_token', async function (request, response) {
  console.log('/api/create_link_token route being hit')
  // Get the client_user_id by searching for the current user
  // const user = await User.find(...);
  const clientUserId = user.id;
  console.log('user: ', user)
  const reqInfo = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientUserId,
    },
    client_name: 'Plaid Test App',
    products: ['auth', 'transactions'],
    language: 'en',
    webhook: 'http://localhost:3000/',
    redirect_uri: 'http://localhost:3000/',
    country_codes: ['US'],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(reqInfo);
    response.json(createTokenResponse.data);
  } catch (error) {
    // handle error
  }
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
