const fs = require('fs-extra');
const semver = require('semver');
const path = require('path');

bumpVersion('package.json');
bumpVersion('manifest.json');

function bumpVersion(filename) {
  const packageJsonPath = path.resolve(__dirname, filename);
  const packageJson = fs.readJsonSync(packageJsonPath);
  const newVersion = semver.inc(packageJson.version, 'patch');
  packageJson.version = newVersion;
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
}
