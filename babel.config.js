module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      //  "module:metro-react-native-babel-preset"
    ],
    plugins: [
      "react-native-reanimated/plugin",
      "module:react-native-dotenv",
      [
        "module-resolver",
        {
          ignore: ["node_modules"],
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@components": "./src/components",
            "@context": "./src/context",
            "@hooks": "./src/utils/hooks",
            "@redux": "./src/redux",
            "@navigation": "./src/navigation",
            "@modules": "./src/modules",
            "@assets": "./src/assets",
            "@constants": "./src/constants",
            "@functions": "./src/functions",
            "@types": "./src/@types",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
