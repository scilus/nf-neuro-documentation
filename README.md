<h1 align="center">nf-neuro Documentation</h1>

<p align="center">
<img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/scilus/nf-neuro-documentation/deploy.yml?style=for-the-badge&labelColor=363a4f&color=8aadf4">
</p>

## How to contribute to the `nf-neuro` documentation.

### Using the VSCode devcontainer.

First, clone the repository:
```bash
git clone https://github.com/scilus/nf-neuro-documentation.git
```
Then, open the repository in VS Code and select open in container. VS Code will open a `Simple Browser` tab previewing your local changes. You are all set!

### From source.

To build the website locally, you need to install the `npm` package manager and `Node.js`. If you do not have it installed, follow the instructions on the official website: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm.
Once installed, git clone the `nf-neuro-documentation` repo and `cd` into it:
```bash
git clone https://github.com/scilus/nf-neuro-documentation.git
cd nf-neuro-documentation/
```
Use `npm` to install the required dependencies:
```bash
npm install
```
Then, to preview the changes on the website in real-time, run:
```bash
npm run dev
```
Open the `localhost` link that appeared in your terminal, it should open a browser with a preview of the website. Each time you save a file, the website will update according to your changes.

## Github pages deployment

The documentation website is deployed on [scilus.github.io/nf-neuro](https://scilus.github.io/nf-neuro). To do so, the `github workflow` must run on the [main nf-neuro repository](https://github.com/scilus/nf-neuro). It is achieved using the `deploy.yml` **callable workflow** located in this repository and calling it in workflows located in the nf-neuro main repository. This way, the workflow runs in the correct context and can deploy correctly to the prescribed endpoint.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
