# vue-calculator

[![Build Status](https://travis-ci.org/ZainW/vue-calculator.svg?branch=master)](https://travis-ci.org/ZainW/vue-calculator)

Make sure you have the yarn package manager installed https://yarnpkg.com/en/docs/install

or 

You can just run `npm i` with the yarn.lock but then the locked files from yarn will not necessarly be respected. this has been tested with `yarn` and it's comitted `yarn.lock` file

replace all `yarn run` commands with `npm run` if using npm

## Notes:
Works properly if used properly (edge cases are not fully working at the moment)

some known reproducible bugs:
- repeated presses of certain button combinations create NaN `2x/9=` for example tried a few things but it broke other functionality, would have to revisit that
- float based calculations ie `2.2x2.2` produces `4.840000000000001` this is a javascript thing as far as I know and would likely swap out math helpers with something like mathjs, while overkill it would actually provide proper execution of math stuff. did not want to round as there are different rounding rules and for the purpose of this showcase it seemed like overkill to have dynamic rounding


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
