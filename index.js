var GitHub = require('github-api');
const accessToken = process.env.ACCESS_TOKEN;
// basic auth
var gh = new GitHub({token: accessToken});
const Babbel = gh.getOrganization('babbel');

/*
console.log('====================================');
console.log(hariomOrg);
console.log('====================================');

hariomOrg.getRepos(function(err, repos){
  if (err){return err;}
  //console.log("Org repos", repos);
}).then(function({data: reposJson}){
  console.log(`Babbel has ${reposJson.length} repos!`);
}).catch(err => {
  console.log(err);
})

hariom.listStarredRepos(function(err,repos){
  //console.log("Starred Repos = ", repos);
}).then(function({data: reposJson}) {
    console.log("reposJson", reposJson);
    console.log('========================================')
     console.log(`Hari Om has ${reposJson.length} repos!`);
   }).catch(err => {
     console.log(err);
   });
*/
Babbel.getRepos( (err, repos) => {
  let num = Math.floor(Math.random() * repos.length);
  let repoName = repos[num].full_name;
  console.log(`Babbel has ${repos.length} repos!`);
  console.log('========================================');
  console.log(`${repoName}: Repository of Babbel organization\n\n`, repos[num]);
}).catch(err => {
  console.log(err);
});
