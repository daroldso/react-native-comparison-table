/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const packageRoot = path.resolve(__dirname, '..');
const examplesNodeModules = path.resolve(__dirname, 'node_modules');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders: [examplesNodeModules, packageRoot],
  resolver: {
    blacklistRE: blacklist([
      new RegExp(`${packageRoot}/node_modules/react-native/.*`),
    ]),
    extraNodeModules: {
      react: path.resolve(examplesNodeModules, 'react'),
      'react-native': path.resolve(examplesNodeModules, 'react-native'),
    },
  },
};
