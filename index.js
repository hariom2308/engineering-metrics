var GitHub = require('github-api');

// basic auth
var gh = new GitHub({
  token: 'xxxxxxxxxxxxxxxxxxxxx'
});

const hariom = gh.getUser('hariom2308');
const hariomOrg = gh.getOrganization('babbel');

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
     console.log(`Hari Om has ${reposJson.length} repos!`);
   }).catch(err => {
     console.log(err);
   });
