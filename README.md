# Cycle.js workshop

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
* `npm run test` to run the included test.
* `code .` to run the free, open source and terribly popular [Visual Studio Code](https://code.visualstudio.com/) editor in the project.

## Reference

* The stream/observable library that we're using is [xstream](http://staltz.github.io/xstream/). It also has [extras](https://github.com/staltz/xstream/blob/master/EXTRA_DOCS.md).
* [The DOM driver](https://cycle.js.org/api/dom.html) expects a `Stream<VNode>`, such as produced by [snabbdom](https://github.com/snabbdom/snabbdom).
* Of course, [the Cycle.js docs](https://cycle.js.org/getting-started.html).
