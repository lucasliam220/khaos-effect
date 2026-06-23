const fs = require("fs");
const path = require("path");
const vm = require("vm");

const htmlPath = path.resolve(__dirname, "..", "index.html");
const html = fs.readFileSync(htmlPath, "utf8");

const requiredIds = [
  "s-cover", "s-entry", "s-lobby", "s-character", "s-game",
  "forest-cover", "forest-entry", "forest-lobby", "forest-character", "forest-game", "forestArt",
  "title-canvas", "btn-press-start",
  "inp-name", "tab-create", "tab-join", "form-create", "form-join",
  "inp-session", "inp-cpw", "btn-create", "inp-code", "inp-jpw", "btn-join", "entry-err",
  "reconnect-card", "reconnect-info", "btn-reconnect", "btn-forget",
  "lobby-name", "lobby-code", "lobby-code-val", "player-count", "players",
  "btn-leave", "btn-master-start", "log",
  "conn-dot", "conn-txt"
];

const missingIds = requiredIds.filter((id) => !new RegExp(`id=["']${id}["']`).test(html));
if (missingIds.length) throw new Error(`Missing IDs: ${missingIds.join(", ")}`);

const forestSymbols = (html.match(/id=["']forestArt["']/g) || []).length;
if (forestSymbols !== 1) throw new Error(`forestArt count should be 1, got ${forestSymbols}`);

const forestUses = (html.match(/href=["']#forestArt["']/g) || []).length;
if (forestUses !== 5) throw new Error(`forestArt use count should be 5, got ${forestUses}`);

const titleAssets = [
  "assets/title-screen/reference-final.png",
  "assets/title-screen/background.png",
  "assets/title-screen/background.mp4",
  "assets/title-screen/khaos-effect-logo.png",
  "assets/title-screen/animations.json",
  "assets/title-screen/scene-layout.json"
];
const missingAssets = titleAssets.filter((asset) => !fs.existsSync(path.resolve(__dirname, "..", asset)));
if (missingAssets.length) throw new Error(`Missing title assets: ${missingAssets.join(", ")}`);

for (const asset of titleAssets.filter((item) => item.endsWith(".json"))) {
  JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", asset), "utf8"));
}

if (!html.includes("assets/title-screen/background.png")) throw new Error("Title background is not referenced.");
if (!html.includes("assets/title-screen/background.mp4")) throw new Error("Title video background is not referenced.");
if (!html.includes("assets/title-screen/khaos-effect-logo.png")) throw new Error("Title logo is not referenced.");

const dataMatch = html.match(/<script id="ke-data">\s*([\s\S]*?)\s*<\/script>/);
if (!dataMatch) throw new Error("Missing data script.");

const manifest = vm.runInNewContext(
  dataMatch[1] +
    "\n;(() => { const cats = Object.keys(KE.cartas || {}); return {" +
    "racas: KE.racas.length," +
    "classes: KE.classes.length," +
    "subclasses: KE.classes.reduce((sum, c) => sum + ((c.subs || []).length), 0)," +
    "categorias: cats.length," +
    "cartas: cats.reduce((sum, cat) => sum + KE.cartas[cat].length, 0)" +
    "}; })()"
);

const appMatch = html.match(/<script id="app-script">\s*([\s\S]*?)\s*<\/script>/);
if (!appMatch) throw new Error("Missing app script.");
new Function(appMatch[1]);
new Function(dataMatch[1] + "\n" + appMatch[1]);

console.log(JSON.stringify({ ok: true, manifest, forestSymbols, forestUses, requiredIds: requiredIds.length }, null, 2));
