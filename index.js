require("dotenv").config();
const GitHub = require("github-api");
const accessToken = process.env.ACCESS_TOKEN;
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
          const numberOfOpenPullRequests = res.data.length;
          const delimiter = "*".repeat(numberOfOpenPullRequests);
          if (numberOfOpenPullRequests != 0) {
            console.log(
              `${repoName}: ${numberOfOpenPullRequests} ${delimiter}\n\n`
            );
            console.log(res.data);
          }
        })
        .catch(err => console.log(err));
    }
  })
  .catch(err => {
    console.log(err);
  });
