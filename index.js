require("dotenv").config();
const GitHub = require("github-api");
const accessToken = process.env.ACCESS_TOKEN;
const gh = new GitHub({ token: accessToken });
const organization = "babbel";
const babbel = gh.getOrganization(organization);

const displayPullRequestsForRepo = repoName => {
  let pullReqArr = [];
  let repo = gh.getRepo(organization, repoName);
  return new Promise((resolve, reject) => {
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
      resolve(pullReqArr.join("\n"));
    })
    .catch(err => {
       console.log("Forbidden: listPullRequests() didnot work");
       reject(err);
    });
  });
}

const getPullRequestsForOrg = repos => {
  let promises = [];
  return new Promise((resolve, reject) => {
    const repoArray = repos.data;
    for (let i = 0; i < repoArray.length; i++) {
      const p = new Promise((resolve, reject) => {
        const repoName = repoArray[i].name;
        const delay = i * 10;
        // setTimeout is implemented to avoid concurrent api
        // req so that it doesn't exceed the rate limit of the Github api
        setTimeout(() => {
          displayPullRequestsForRepo(repoName)
          .then((pullRequests) => {
            resolve(pullRequests);
          });
         }, delay);
      })
      promises.push(p)
    }
    Promise.all(promises).then((res) => resolve(res)).catch((err) => {
      reject(err);
    });

  })
}

babbel
  .getRepos()
  .then(getPullRequestsForOrg).then((res) => {console.log(res)})
  .catch(err => {
    console.log("Forbidden: getRepos() did not work.");
    process.exit(1);
  });
