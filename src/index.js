const { exec } = require('child_process');

const gitCommand = `git diff --no-commit-id --name-only -r \`git log -n 2 --oneline --pretty=format:"%h"\` | sort -u`


exec(gitCommand, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});