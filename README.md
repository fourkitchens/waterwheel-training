# waterwheel-training

[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg?style=flat-square)](https://fourkitchens.com/)

Lessons + Code examples for the 4K Drupal 8 + React + Waterwheel training

## Contributors

[![Four Kitchens](https://avatars.githubusercontent.com/u/348885?s=130)](https://github.com/fourkitchens) | [![Luke](https://avatars.githubusercontent.com/u/1127238?s=130)](https://github.com/infiniteluke) | [![Mike](https://avatars.githubusercontent.com/u/251658?s=130)](https://github.com/mirzu) | [![Randy](https://avatars.githubusercontent.com/u/409903?s=130)](https://github.com/amazingrando) | [![Taylor](https://avatars.githubusercontent.com/u/1486573?s=130)](https://github.com/tsmith512)
--- | --- | --- | --- | ---
[Four Kitchens](https://github.com/fourkitchens) | [Luke](https://github.com/infiniteluke) | [Mike](https://github.com/mirzu) | [Randy](https://github.com/amazingrando) | [Taylor](https://github.com/tsmith512)
# Prerequisites
* [nvm](https://github.com/creationix/nvm) installed
* [yarn](https://yarnpkg.com) for package management
* [Postman](https://www.getpostman.com) for testing out the API
* React Dev Tools ([Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)/[Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/))
* Redux Dev Tools ([Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)/[Firefox](https://addons.mozilla.org/en-US/firefox/addon/remotedev/?src=ss))

## Usage
- `git clone git@github.com:fourkitchens/waterwheel-training.git && cd waterwheel-training` - Clone this repo and change directory into it
- `nvm use` - Change to supported node version (Node 6) if you have [nvm](https://github.com/creationix/nvm) installed
- `npm install -g yarn` - Install yarn package manager
- `yarn` - Install all training dependencies
- `cd lesson-3` - Change directory into desired lesson
- Inside `src/config` create `local.json` with the clientSecret in it.
```
{
  "client_secret": "abc123"
}
```
- Repeat this process for the `lesson-4` directory.
- `yarn start` - Start the app
- Browser window will open and code changes will hot reload

