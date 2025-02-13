const axios = require("axios");

require("dotenv").config();

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_SECRET;


const baseUri = "https://api.github.com/users";
const limitPerPage = 5;

async function getGithubRepos(username) {

  const options = {
    method: "GET",
    headers: { "user-agent": "node.js" },
    params: {
      per_page: limitPerPage,
      sort: "created:asc",
      client_id: clientId,
      client_secret: clientSecret,
    },
  };

  const response = await axios.get(`${baseUri}/${username}/repos`, options);

  return response.data;
}

module.exports = { getGithubRepos };
