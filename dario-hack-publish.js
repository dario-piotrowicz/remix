// @ts-check
const { execSync } = require("node:child_process");
const { readFileSync, writeFileSync } = require("node:fs");
const { cwd, chdir } = require("node:process");

run("pnpm build");

chdir(`${cwd()}/packages/remix-dev/dist`);

const packageJsonContent = readFileSync("./package.json", {
    encoding: "utf-8",
});

console.log(`\x1b[35m${packageJsonContent}\x1b[0m`);


const updatedPackageJsonContent = packageJsonContent
    .replace(
        '"name": "@remix-run/dev",',
        '"name": "@dario-hacking/remix-run-dev",'
    )
    .replace(
        '"version": "2.9.1",',
        '"version": "2.9.1-vite-env-4",' // TODO: make 4 configurable
    ).replace(
        /https:\/\/github\.com\/remix-run/g,
        'https://github.com/dario-piotrowicz/remix'
    ).replace(
        /"dist/g,
        '".'
    ).replace(
        /"workspace:\*"/g,
        '"2.9.1"'
    );

console.log(`\x1b[34m${updatedPackageJsonContent}\x1b[0m`);

writeFileSync("./package.json", updatedPackageJsonContent);

run("npm publish");

function run(cmd) {
    console.log("\n".repeat(5));
    execSync(cmd, { stdio: "inherit" });
    console.log("\n".repeat(5));
}
