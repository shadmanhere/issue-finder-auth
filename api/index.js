import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import * as dotenv from "dotenv"
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send('Hello World!');
})

app.post('/api', async (req, res) => {
  const { code, state } = req.body;
  // const storedState = sessionStorage.getItem('githubOAuthState');

  // if (state !== storedState) {
  //   return res.status(400).json({ error: 'Invalid state parameter' });
  // }

  const accessTokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    //   redirect_uri: 'http://localhost:3001/authenticate/github/callback',
    }),
  });

  const accessTokenData = await accessTokenResponse.json();
  // const accessToken = accessTokenData.access_token;
  res.json(accessTokenData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});