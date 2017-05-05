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

