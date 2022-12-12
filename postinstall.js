// Run -->  pnpm add --save tinymce @tinymce/tinymce-react fs-extra
// Put the following in your `package.json` file: "postinstall": "node ./postinstall.js"
// npm run postinstall
// Pulls tinyMCE from the node_modules folder and copies it to the public folder.

// NPM installation only\\

const fse = require('fs-extra');
const path = require('path');
const topDir = __dirname;
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.copySync(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public', 'tinymce'), { overwrite: true });

