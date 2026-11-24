import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "www/app.js",
  output: {
    file: "www/app.bundle.js",
    format: "es"
  },
  plugins: [
    resolve({ browser: true }),
    commonjs()
  ]
};
