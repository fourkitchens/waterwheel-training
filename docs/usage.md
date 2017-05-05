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
