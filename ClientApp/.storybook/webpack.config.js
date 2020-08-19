module.exports = async function ({ config }) {
  config.module.rules.push({
    test: /\.less$/,
    exclude: /node_modules\/(?!(antd|some-other-module-using-less)\/).*/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: require.resolve("less-loader"),
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  });

  return config;
};
