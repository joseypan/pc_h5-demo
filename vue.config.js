module.exports = {
  pages: {
    mobile: {
      template: "public/mobile.html",
      entry: "src/mobile.ts",
      filename: "mobile.html",
      title: "mobile",
    },
    index: {
      template: "public/index.html",
      entry: "src/main.ts",
      filename: "index.html",
      title: "index",
    },
  },
  devServer: {
    https: true,
  },
};
