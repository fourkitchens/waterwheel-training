## Usage
- `git clone git@github.com:fourkitchens/waterwheel-training.git && cd waterwheel-training` - Clone this repo and change directory into it
- `nvm use` - Change to supported node version (Node 6) if you have [nvm](https://github.com/creationix/nvm) installed
- `npm install -g yarn` - Install yarn package manager
- `yarn` - Install all training dependencies
- `cd lesson-2-answer` - Change directory into desired lesson
- Inside `src/config` create `local.json` with the clientSecret in it.
```
{
  "client_secret": "abc123"
}
```
- `yarn start` - Start the app
- Browser window will open and code changes will hot reload
