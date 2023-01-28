# Practice project - Backend for CI/CD using GitHub Actions

### Steps

- Create your backend project using `node` and `express`.
- Launch a common Ubuntu ec2 instance for your full-stack project in AWS.
- If on Windows, use Putty or use Terminal to SSH into the instance.
- Inside Actions, search for Node. Click on `Configure`. This brings up the nodejs yml file for deployment.
- Make some small changes in the yml file - **_remove_** the _pull request_ part and the _npm test_ part. Change runs-on to `self-hosted`. Remove the node versions which you aren't supporting. The final file should look as below -

```yml
name: Node.js CI

on:
  push:
    branches: ["main"]

jobs:
  build:
    runs-on: self-hosted

    strategy:
      matrix:
        node-version: [16.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - run: npm ci
      - run: npm run build --if-present
      - run: sudo pm2 restart backend
```

Commit the file.

- Go to the runners part in Settings -> Actions in your GitHub project.
- Based on the OS you have chosen, select the runner.
- Copy and paste first line, changing the directory name with your backend directory name.
- Next, keep copying and pasting each line as it is.
- Press Enter three times to finish configuring the runner.
- Inside Putty/terminal, cd to your frontend directory and give the following command

```sh
sudo ./svc.sh install
```

- Next,

```sh
sudo ./svc.sh start
```

- Check the runners part inside Settings. There should be an IP which should show Active.
-

