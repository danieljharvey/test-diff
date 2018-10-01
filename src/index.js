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

execPromise(gitCommand).then(console.log).catch(console.error)