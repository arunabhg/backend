# Practice project - Backend for CI/CD using GitHub Actions

**About** - This deployment method _doesn't_ use AWS CodeDeploy or CodePipeline. It uses only `GitHub Actions` to CI/CD a full-stack project to AWS EC2.

### [Link to the Frontend](https://github.com/arunabhg/frontend)

### Prerequisites

Knowledge of the JavaScript tech stack like Node, Express, React or any other full-stack ecosystem. Knowledge of Git, GitHub, Putty and basic knowledge of AWS.

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

- Go to the runners part in Settings -> Actions in your GitHub project. Click on **New Self-Hosted Runner**.
- Based on the OS (Linux) you have chosen, select the runner.
- Copy and paste first line, changing the directory name with your backend directory name.

```js
mkdir backend && cd backend
```

- Next, keep copying and pasting each line as it is.
- Press Enter three times to finish configuring the runner.
- Inside Putty/terminal, cd to your backend directory and give the following command,

```sh
sudo ./svc.sh install
```

- Next,

```sh
sudo ./svc.sh start
```

- Check the runners part inside Settings -> Actions. There should be an IP which should show Active. (Similar process needs to be followed in the frontend)
- Go to the \_work directory inside the backend and inside that go twice inside the same name (backend, in our case) directory.
  ```
  cd backend/_work/backend/backend
  ```
  We have to start the app.js file using pm2.
  ```
  sudo pm2 start app.js --name=backend
  ```
- Go to the nodejs.yml file in the workflow and add a step in the end for pm2 to restart the file every time we deploy something.

```
run: sudo pm2 restart backend
```

- After completing all steps in the frontend and ensuring that both the backend and frontend workflows are running fine, make some changes in app.js. The changes will be viewable in the browser using the set route (/api in our case).
