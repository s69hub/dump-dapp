module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    os: require.resolve("os-browserify/browser"),
    fs: require.resolve("browserify-fs"),
    tls: false,
    net: false,
    http: require.resolve("stream-http"),
    https: false,
    zlib: require.resolve("browserify-zlib"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
    url: require.resolve("url/"),
    crypto: require.resolve("crypto-browserify"),
    assert: require.resolve("assert/"),
  };

  return config;
};
