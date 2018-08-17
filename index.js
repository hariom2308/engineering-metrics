require("dotenv").config();
const GitHub = require("github-api");
const accessToken = process.env.ACCESS_TOKEN;
const gh = new GitHub({ token: accessToken });
const organization = "babbel";
const babbel = gh.getOrganization(organization);
let pullReqArr = [];

const displayPullRequestsForRepo = repoName => {

  let repo = gh.getRepo(organization, repoName);
  repo
    .listPullRequests({})
    .then(res => {
      const numberOfOpenPullRequests = res.data.length;
      if (numberOfOpenPullRequests != 0) {
        for (let j = 0; j < numberOfOpenPullRequests; j++) {
          const pullReq = res.data[j];
          const pullRequestData = [
            res.headers.date,
            repoName,
            pullReq.html_url,
            pullReq.title,
            pullReq.created_at,
            pullReq.updated_at,
            pullReq.user.login
          ];
          pullReqArr.push(pullRequestData.join("; "));
        }
      }
      console.log(pullReqArr.join("\n"));
    })
    .catch(err => {
       console.log("Forbidden: listPullRequests() didnot work");
       process.exit(1);
    });
}

const displayPullRequestsForOrg = repos => {
  const repoArray = repos.data;
  for (let i = 0; i < repoArray.length; i++) {
    const repoName = repoArray[i].name;
    const delay = i * 10;
    // setTimeout is implemented to avoid concurrent api
    // req so that it doesn't exceed the rate limit of the Github api
    setTimeout(() => { displayPullRequestsForRepo(repoName) }, delay);
  }
}

babbel
  .getRepos()
  .then(displayPullRequestsForOrg)
  .catch(err => {
    console.log("Forbidden: getRepos() did not work.");
    process.exit(1);
  });
