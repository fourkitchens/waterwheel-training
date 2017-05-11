# waterwheel-training

[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg?style=flat-square)](https://fourkitchens.com/)

Lessons + Code examples for the 4K Drupal 8 + React + Waterwheel training

## Contributors

[![Four Kitchens](https://avatars.githubusercontent.com/u/348885?s=130)](https://github.com/fourkitchens) | [![Luke](https://avatars.githubusercontent.com/u/1127238?s=130)](https://github.com/infiniteluke) | [![Mike](https://avatars.githubusercontent.com/u/251658?s=130)](https://github.com/mirzu) | [![Randy](https://avatars.githubusercontent.com/u/409903?s=130)](https://github.com/amazingrando) | [![Taylor](https://avatars.githubusercontent.com/u/1486573?s=130)](https://github.com/tsmith512) | [![Patrick](https://avatars.githubusercontent.com/u/1107871?s=130)](https://github.com/patrickocoffeyo)
--- | --- | --- | --- | --- | ---
[Four Kitchens](https://github.com/fourkitchens) | [Luke](https://github.com/infiniteluke) | [Mike](https://github.com/mirzu) | [Randy](https://github.com/amazingrando) | [Taylor](https://github.com/tsmith512) | [Patrick](https://github.com/patrickocoffeyo)
## Prerequisites
* [nvm](https://github.com/creationix/nvm) installed
* [yarn](https://yarnpkg.com) for package management
* [Postman](https://www.getpostman.com) for testing out the API
* React Dev Tools ([Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)/[Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/))
* Redux Dev Tools ([Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)/[Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/?src=ss))

## Usage
- Install nvm or another Node.js Version Manager: https://github.com/creationix/nvm#installation
- `nvm install 6` Download Node 6
- `git clone git@github.com:fourkitchens/waterwheel-training.git && cd waterwheel-training` - Clone this repo and change directory into it
- If that doesn’t work try cloning with `git clone https://github.com/fourkitchens/waterwheel-training.git`
- `nvm use` - Change to supported node version (Node 6) if you have [nvm](https://github.com/creationix/nvm) installed
- `npm install -g yarn` - Install yarn package manager. You can `brew install yarn` too, if you want
- `yarn` - Install all training dependencies from inside the top level directory of the training repo
- `cd lesson-3` - Change directory into desired lesson (Do not run `yarn` inside lesson directories)
- Inside `src/config` create `local.json` with the clientSecret in it
```
{
  "client_secret": "abc123"
}
```
- `cd lesson-3-answer` - Change directory into desired lesson
- Inside `src/config` create `local.json` with the clientSecret in it.
```
{
  "client_secret": "abc123"
}
```
- `cd ../lesson-1` and run `yarn start` - Start the app
- Browser window will open and code changes will hot reload
- In each lesson directory, you'll see a README. ex: [lesson-1/README.md](lesson-1/README.md). Each README contains the step to complete the respective lesson.

## What are we going to build today?
We are going to add a like button to a Multiuser Todo app. The Todo app is based on the [React Todo MVC example](http://todomvc.com/examples/react/#/). First we’ll add the "like" button as a React component and then follow up by connecting it to our Datastore. Since React leverages some new syntax that was introduced to Javascript in ES2016, we’ll give a quick intro there. We’ll put this particular “headless” architecture into context with other options and talk a bit about how to securely authenticate users. We don’t expect that anyone is going to leave an expert in all these new technologies, but hope that everyone will have the tools they need to dive deeper on their own.	
Drupal is our API and Datastore. React handles rendering the UI, and Waterwheel makes using interacting with and authenticating against Drupal’s API easy.

For an in depth overview of the course check out [the preview blog post](https://www.fourkitchens.com/blog/events/api-first-drupal-8-react-and-you/) for DrupalCon Baltimore.

### NOTE:
This training was originally written to use Redux for state management. To simplify the training and focus more on Waterwheel (along with [other reasons](https://twitter.com/lukeherrington/status/849863853550718976)), we’re going to use React’s built in setState to manage state. As you’ll see in some of the lesson code, the skeleton of this lesson still uses Redux, but you can safely ignore it. The Like button feature we’ll be adding won’t use it. There is a redux folder in the training repo if you’d like to explore on your own after the training.

## Stretch Lessons
- 🥉 BRONZE:  Add a filter that only show the logged in users likes called “Mine,”
- 🥈 SILVER:  Add a message component that displays errors received from the server.
- 🥇 GOLD:  Complete the lessons in the redux directory to learn about alternative state management techniques.
## Future/Issues to watch
- Follow progress on API First Initiative on this issue: https://www.drupal.org/node/2757967
- There is an initiative to include JSON API and Simple Oauth in core as experimental modules. Those are currently postponed to mature in contrib.
  - https://www.drupal.org/node/2757967#comment-12048411
  - https://www.drupal.org/node/2834718
- Subrequest module/spec is promising for bundling requests: https://www.drupal.org/project/subrequests
- As of 8.3, Drupal ships with a package.json https://www.drupal.org/node/2809477 a big step forward for core JS development.
- Conversion of core js to ES6: https://www.drupal.org/node/2815083
- Writing unit tests for core JS: https://www.drupal.org/node/2815199
- JSON API payload limited to 50 entities: https://www.drupal.org/node/2793233
## Resources
### Authentication
- Simple OAuth Drupal module docs: https://www.drupal.org/node/2843627
- Simple OAuth module video tutorial: https://www.youtube.com/playlist?list=PLZOQ_ZMpYrZtqy5-o7KoDhM3n6M0duBjX
- How to chose which OAuth 2.0 Grant to use: https://oauth2.thephpleague.com/authorization-server/which-grant/
### React
- Docs: https://facebook.github.io/react/docs/hello-world.html
- Creating new react apps quickly with create-react-app: https://github.com/facebookincubator/create-react-app
- How to get the most out of create-react-app: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
- Initial reference project: https://github.com/infiniteluke/todomvc-react-waterwheel
- What is JSX? https://jasonformat.com/wtf-is-jsx/
- The Future of React: https://www.youtube.com/watch?v=ZCuYPiUIONs
- Accessibility: https://github.com/reactjs/react-a11y
### API
- JSON API spec: http://jsonapi.org/
- Comprehensive JSON API Drupal module docs: https://www.drupal.org/docs/8/modules/json-api
- JSON API Drupal module video tutorials: https://www.youtube.com/playlist?list=PLZOQ_ZMpYrZsyO-3IstImK1okrpfAjuMZ
- Generate JSON Schema from Drupal 8: https://github.com/phase2/schemata
- Decoupled Architecture Slides: https://docs.google.com/presentation/d/1CX3ENJrB71Al-ghuDjtvqpPtj8DCHsS9Tb53M2B19Z4/edit?usp=sharing
- GraphQL vs REST: https://philsturgeon.uk/api/2017/01/24/graphql-vs-rest-overview/
