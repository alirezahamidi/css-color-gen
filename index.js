#!/usr/bin/env node
const fs = require('fs');
const color = require('color');

if (process.argv.length < 4) return console.error('Please put input params currectly like this : $GenerateCssColor "#fff" "#000" "name" [you can use -r for reverse mode]');
const reverse = process.argv.indexOf('-r') > 0
const c1 = color(process.argv[reverse ? 2 : 3]);
const c2 = color(process.argv[reverse ? 3 : 2]);
const name = process.argv[4] ?? 'css-color-gen';
const steps = 10;
const rgbDiff = [c1.red() - c2.red(), c1.green() - c2.green(), c1.blue() - c2.blue()];
const rgbGap = rgbDiff.map(x => Math.floor(x / (steps-1)));

let s = ':host {\r\n';
s += `--${name}-${(steps - 1) * 100} : ${c2.hex()};\r\n`;
for (let i = steps - 2; i >= 0; i -= 1) {
    // console.log(`${c1.red() - (rgbGap[0] * i)},${c1.green() - (rgbGap[1] * i)},${c1.blue() - (rgbGap[2] * i)})`);
    s += `--${name}-${i * 100 + (i == 0 ? 50 : 0)} : ${color(`rgb(${c1.red() - (rgbGap[0] * i)},${c1.green() - (rgbGap[1] * i)},${c1.blue() - (rgbGap[2] * i)})`).hex()};\r\n`;
}
s += '}';
fs.writeFileSync(`./${name}.css`, s);

console.info("Css generated successfully");