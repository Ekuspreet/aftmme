import { execSync } from "child_process";

const BUILD_DIR = "aftmme-web";
const BUILD_BRANCH = "build";
const TEMP_BRANCH = "build-temp";

function run(command, options = {}) {
  console.log(`> ${command}`);
  execSync(command, { stdio: "inherit", ...options });
}

function getOutput(command) {
  return execSync(command, { encoding: "utf8" }).trim();
}

function hasStagedChanges() {
  return getOutput("git diff --cached --name-only").length > 0;
}

const branch = getOutput("git rev-parse --abbrev-ref HEAD");
if (branch !== "main") {
  throw new Error(`Run deploy from 'main'. Current branch: ${branch}`);
}

// 1) Build static output and app assets.
run("npm run build");

// 2) Commit and push main updates.
run("git add -A");
if (hasStagedChanges()) {
  const msg = `chore: deploy ${new Date().toISOString()}`;
  run(`git commit -m "${msg}"`);
}
run("git push origin main");

// 3) Publish only build directory to build branch.
run(`git subtree split --prefix ${BUILD_DIR} -b ${TEMP_BRANCH}`);
run(`git push -f origin ${TEMP_BRANCH}:${BUILD_BRANCH}`);
run(`git branch -D ${TEMP_BRANCH}`);

console.log("Deploy complete: main and build are updated.");
