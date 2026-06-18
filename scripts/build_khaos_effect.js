const fs = require("fs");
const vm = require("vm");
const path = require("path");

const root = path.resolve(__dirname, "..");
const templatePath = path.join(root, "src", "khaos_effect_template.html");
const dataPath = path.join(root, "data", "khaos_effect_data.js");
const outputPath = path.join(root, "index.html");

const template = fs.readFileSync(templatePath, "utf8");
const dataJs = fs.readFileSync(dataPath, "utf8").trim();

const manifest = vm.runInNewContext(
  dataJs +
    "\n;(() => { const cats = Object.keys(KE.cartas || {}); return {" +
    "racas: KE.racas.length," +
    "classes: KE.classes.length," +
    "subclasses: KE.classes.reduce((sum, c) => sum + ((c.subs || []).length), 0)," +
    "categorias: cats.length," +
    "cartas: cats.reduce((sum, cat) => sum + KE.cartas[cat].length, 0)" +
    "}; })()"
);

const expected = { racas: 20, classes: 13, subclasses: 39, categorias: 18, cartas: 292 };
for (const [key, value] of Object.entries(expected)) {
  if (manifest[key] !== value) {
    throw new Error(`Canonical data mismatch for ${key}: expected ${value}, got ${manifest[key]}`);
  }
}

const html = template.replace("/*__KE_DATA__*/", dataJs);
if (html.includes("/*__KE_DATA__*/")) {
  throw new Error("Data placeholder was not replaced.");
}

fs.writeFileSync(outputPath, html, "utf8");
console.log(JSON.stringify({ manifest, outputPath }, null, 2));
