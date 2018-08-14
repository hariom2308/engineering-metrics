require("dotenv").config();
const GitHub = require("github-api");
const accessToken = process.env.ACCESS_TOKEN;
// basic auth
const gh = new GitHub({ token: accessToken });
const babbel = gh.getOrganization("lessonnine");

babbel
  .getRepos()
  .then(repos => {
    const repoArray = repos.data;
    for (let i = 0; i < repoArray.length; i++) {
      const repoName = repoArray[i].name;
      let repo = gh.getRepo("lessonnine", repoName);
      repo
        .listPullRequests({})
        .then(res => {
          if (res.data.length != 0) {
            console.log(repoName, "**************************");
            console.log(res.data.length);
            console.log("\n\n");
            console.log(res.data);
          }
        })
        .catch(err => console.log(err));
    }
  })
  .catch(err => {
    console.log(err);
  });

/*
   listPullRequests(options, cb) {
      options = options || {};
      return this._request('GET', `/repos/${this.__fullname}/pulls`, options, cb);
   }
*/
