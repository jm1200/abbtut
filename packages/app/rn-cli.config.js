// const path = require("path");
// const getConfig = require("metro-bundler-config-yarn-workspaces");

// module.exports = getConfig(__dirname, {
//   nodeModules: path.join(__dirname, "../..")
// });

// const sharedBlacklist = [];

// const platformBlacklists = {
//   ios: [
//     ".web.js",
//     ".macos.js",
//     /node_modules\/react-native-web\/.*/,
//     /node_modules\/react-native-windows\/.*/,
//     /node_modules\/react-native-macos\/.*/,
//     /node_modules\/[^/]+\/\.git\/.*/
//   ],
//   android: [
//     ".web.js",
//     ".windows.js",
//     ".macos.js",
//     /node_modules\/react-native-web\/.*/,
//     /node_modules\/react-native-windows\/.*/,
//     /node_modules\/react-native-macos\/.*/,
//     /node_modules\/[^/]+\/\.git\/.*/
//   ],
//   web: [
//     ".windows.js",
//     ".macos.js",
//     /node_modules\/react-native-windows\/.*/,
//     /node_modules\/react-native-macos\/.*/,
//     /node_modules\/[^/]+\/\.git\/.*/
//   ],
//   windows: [
//     ".web.js",
//     ".macos.js",
//     /node_modules\/react-native-web\/.*/,
//     /node_modules\/react-native-macos\/.*/,
//     /node_modules\/[^/]+\/\.git\/.*/
//   ],
//   macos: [
//     ".web.js",
//     ".windows.js",
//     /node_modules\/react-native-web\/.*/,
//     /node_modules\/react-native-windows\/.*/,
//     /node_modules\/[^/]+\/\.git\/.*/
//   ]
// };

// function escapeRegExp(pattern) {
//   if (Object.prototype.toString.call(pattern) === "[object RegExp]") {
//     return pattern.source.replace(/\//g, path.sep);
//   } else if (typeof pattern === "string") {
//     const escaped = pattern.replace(
//       /[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|]/g,
//       "\\$&"
//     );
//     // convert the '/' into an escaped local file separator
//     return escaped.replace(/\//g, `\\${path.sep}`);
//   }
//   throw new Error(`Unexpected packager blacklist pattern: ${pattern}`);
// }

// function blacklist(platform, additionalBlacklist) {
//   // eslint-disable-next-line
//   return new RegExp(
//     "(" +
//       (additionalBlacklist || [])
//         .concat(sharedBlacklist)
//         .concat(platformBlacklists[platform] || [])
//         .map(escapeRegExp)
//         .join("|") +
//       ")$"
//   );
// }

// module.exports = {
//   getBlacklistRE(platform) {
//     if (
//       process &&
//       process.argv.filter(a => a.indexOf("react-native-macos") > -1).length > 0
//     ) {
//       return blacklist("macos");
//     }
//     return blacklist("ios");
//   }
// };

const blacklist = require("metro-config/src/defaults/blacklist");
const getWorkspaces = require("get-yarn-workspaces");
const path = require("path");

function getConfig(from, options = {}) {
  const workspaces = getWorkspaces(from);

  function getProjectRoots() {
    return [
      // Keep your project directory.
      path.resolve(from),

      // Include your forked package as a new root.
      options.nodeModules || path.resolve(from, "../..", "node_modules")
    ].concat(workspaces);
  }

  const config = {
    watchFolders: getProjectRoots(),
    resolver: {
      blacklistRE: blacklist(
        workspaces.map(
          workspacePath =>
            `/${workspacePath.replace(
              /\//g,
              "[/\\\\]"
            )}[/\\\\]node_modules[/\\\\]react-native[/\\\\].*/`
        )
      ),
      extraNodeModules: {
        "react-native": path.resolve(from, "node_modules/react-native")
      }
    }
  };
  return config;
}

module.exports = getConfig(__dirname);
