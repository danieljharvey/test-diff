const { exec } = require('child_process');

const gitCommand = `git diff --no-commit-id --name-only -r \`git log -n 2 --oneline --pretty=format:"%h"\` | sort -u`

function execPromise(command) {
    return new Promise((resolve, reject) => {
        exec(gitCommand, (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              return reject(err)
            }
            return resolve(stdout)
        });
    })
}


const breakByLines = (all) => all.split('/n').map(str => str.replace(/(\r\n\t|\n|\r\t)/gm,""))

const breakDownPath = (str) => {
    return str.split("/") 
}

const isNotFilename = (str) => str.indexOf('.') === -1

execPromise(gitCommand).then(breakByLines).then(a => a.map(breakDownPath).map(b => b.filter(isNotFilename))).then(console.log).catch(console.error)
