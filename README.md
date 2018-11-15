# Cycle.js workshop

[![Build Status](https://travis-ci.org/mightyiam/example-cycle-app.svg?branch=master)](https://travis-ci.org/mightyiam/example-cycle-app)
[![Greenkeeper badge](https://badges.greenkeeper.io/mightyiam/example-cycle-app.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Welcome!

Don't get stuck! Any issues—please ask right away!

Let's jam!

## Getting started

1. Install [Git](https://git-scm.com/) unless you have it.
1. `git clone https://github.com/mightyiam/example-cycle-app.git`
1. `cd example-cycle-app`
1. `nvs use` (Install [nvs](https://github.com/jasongin/nvs) unless you have it.)
1. `npm --global install npm`
1. `npm install`

Now you can:

* `npm run serve` to start a development server. Navigate to the printed URL.
* `npm run test` to lint and run the included test.
* `code .` to run the free, open source and terribly popular [Visual Studio Code](https://code.visualstudio.com/) editor in the project. And for integrated linting, install [the ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## Reference

* The stream/observable library that we're using is [xstream](http://staltz.github.io/xstream/). It also has [extras](https://github.com/staltz/xstream/blob/master/EXTRA_DOCS.md).
* [The DOM driver](https://cycle.js.org/api/dom.html) expects a `Stream<VNode>`, such as produced by [snabbdom](https://github.com/snabbdom/snabbdom).
* Of course, [the Cycle.js docs](https://cycle.js.org/getting-started.html).

## Suggested order

1. Go through the getting started section above.
1. Study the code.
1. Learn about [the xstream method `debug`](http://staltz.github.io/xstream/#debug).
1. Learn how to use the dev tools debugger.
1. Try implementing one of the ideas, below.

## Ideas

* Display current mouse coordinates.
* Display count of click inside moat.
* Display list of clicks inside moat with coordinates.
* Display time spent inside moat.

## Attribution

* Map from https://commons.wikimedia.org/wiki/File:Chiang_Mai_map.png
