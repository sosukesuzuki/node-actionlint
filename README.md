# node-actionlint

Run [rhysd/actionlint](https://github.com/rhysd/actionlint) from Node.js.

Most parts of `main.go` are reused from [rhysd/actionlint/playground/main.go](https://github.com/rhysd/actionlint/blob/6cd29e315e578dab938b12db7978749afb07c9b0/playground/main.go).

## CLI Usage

```
$ npm install --save-dev node-actionlint
$ ./node_modules/.bin/node-actionlint
```

## JavaScript Usage

However, the main purpose of this package is to be used with the CLI.

```js
const { runActionLint } = require("node-actionlint");

(async () => {
  const results = await runActionLint(source, path);
})();
```

## Development

### Release

```
$ npm run release -- --release=patch
```
