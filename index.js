require('dotenv').config()
var GitHub = require('github-api');
const accessToken = process.env.ACCESS_TOKEN;
// basic auth
var gh = new GitHub({token: accessToken});
const Babbel = gh.getOrganization('lessonnine');

Babbel.getRepos( (err, repos) => {
  let num = Math.floor(Math.random() * repos.length);
  let repoName = repos[num].full_name;
  console.log(`Babbel has ${repos.length} repos!`);
  console.log('========================================');
  console.log(`${repoName}: Repository of Babbel organization\n\n`, repos[num]);
}).catch(err => {
  console.log(err);
});

/*
   listPullRequests(options, cb) {
      options = options || {};
      return this._request('GET', `/repos/${this.__fullname}/pulls`, options, cb);
   }
*/
