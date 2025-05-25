module.exports = {
  plugins: [
    require("postcss-fluid")({min: "360px", max: "1280px"}),
    require("autoprefixer"),
  ],
}
