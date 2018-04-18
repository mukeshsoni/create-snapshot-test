### How to create an npm package which can be used from command line as well as required as a javascript module

1.  Specify a “bin” property on package.json, which refers to the file which should be invoked with `node`
2.  If you add `#!/usr/bin/env node` at the top of the file inside bin, you can directly invoke the file as executable (without saying `node <file_name>`
3.  When the package can be used as a command line utility, it’s good to also expose the main package as a javascript module. That can go inside ‘dist’ folder and will be pointed as the main module when someone does `require(“your-package-npm-name”)`. A simple build command to create that file can be `"build": "rimraf dist/ && babel src/ --out-dir dist/ --ignore __tests__,__mocks__”`
4.  Use helper libraries for the command line part. Libraries like minimist, commander etc. go a long way in enhancing the user experience of the command line utility
