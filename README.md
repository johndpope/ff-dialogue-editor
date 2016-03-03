# Final Frontier Dialogue Editor
A complete set of tools to create dynamic dialogue trees for video games.

Created using [jQuery](https://jquery.com/), [JointJS](http://www.jointjs.com/), [Electron](https://github.com/atom/electron), and [Sass](http://sass-lang.com/).

## Builds
* The `main` branch contains the most up-to-date code, and is therefore not considered stable for release. If you clone or download this branch, a functional build may not be guarenteed.
* The `release` branch will always contain the most recent stable release, and is guarenteed to function correctly, unless otherwise noted.
* The `preview` branch contains an early build for the next release which may not yet be stable enough. The existence of this branch will depend on the progress, as it may not be used at all.
* Any other branches are used for testing purposes and should never be cloned or downloaded to build a version for regular use.

Tags will be used to increment the release branch after every release so earlier versions will be easily accessible.

## Install
1. Clone the repo or download a zip file.
2. Install [Node.js](https://nodejs.org/en/).
3. Install RubyGems (or [Ruby Installer](http://rubyinstaller.org/) on Windows).
4. Run `gem install sass` to install the Sass compiler.
5. Open an elevated command prompt pointing to the project directory.
6. Run `npm install` to get all the dependencies.
7. Run `grunt dev` to prepare the necessary files (e.g. compiling Sass `.scss` files to standard `.css`).
8. Finally run `npm start`, or `grunt` without arguments, to run Electron with the app.

## Editing
When you are editing `.scss` files, run `grunt watch` to start watching files for changes. Grunt will then automatically compile all the Sass files into a single `main.css` file.
