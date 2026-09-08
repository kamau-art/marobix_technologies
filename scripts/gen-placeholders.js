const fs = require("fs");
const dir = "public/images";
const blue = "#0B3D91";
const amber = "#F5A623";
const slate = "#1E2530";

function svg(name, bg, accent, label) {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="${accent}"/>
</linearGradient>
</defs>
<rect width="1200" height="800" fill="url(#g)"/>
<circle cx="1000" cy="120" r="220" fill="#ffffff" opacity="0.08"/>
<circle cx="160" cy="680" r="180" fill="#ffffff" opacity="0.06"/>
<text x="60" y="420" font-family="Inter, system-ui, sans-serif" font-size="52" font-weight="700" fill="#ffffff">${label}</text>
<text x="62" y="470" font-family="Inter, system-ui, sans-serif" font-size="22" fill="#ffffff" opacity="0.85">Marobix Technologies</text>
</svg>`;
  fs.writeFileSync(`${dir}/${name}`, s);
}

svg("nkuru.svg", blue, "#2a6ce0", "Nkuru Retail POS");
svg("greenleaf.svg", "#1E9E5A", "#143d2a", "GreenLeaf Organics");
svg("meru.svg", blue, amber, "Meru Traders");
svg("dataguard.svg", slate, blue, "DataGuard Backup");
svg("swiftcart.svg", "#5b6472", blue, "SwiftCart Procurement");
svg("amanibot.svg", amber, blue, "AmaniBot Assistant");
svg("hero.svg", blue, "#123a80", "Marobix Technologies");
svg("about.svg", blue, slate, "About Marobix");
svg("team-1.svg", "#2a6ce0", blue, "Team Member");
svg("team-2.svg", blue, "#2a6ce0", "Team Member");
svg("team-3.svg", "#123a80", "#2a6ce0", "Team Member");
svg("team-4.svg", "#2a6ce0", "#123a80", "Team Member");
svg("cta.svg", blue, "#123a80", "Let's build something great");

console.log("placeholders created");
