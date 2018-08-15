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
      setTimeout( function timer(){
        const repoName = repoArray[i].name;
        let repo = gh.getRepo("lessonnine", repoName);
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
                console.log(pullRequestData.join(";"));
              }
            }
          })
          .catch(err => console.log(err));
    }, i*10 );

    }
  })
  .catch(err => {
    console.log(err);
  });
