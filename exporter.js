//
// Oct, 2025 - @Bifeldy
//
// Export Synonym & Antonym Separately
// $ node ./exporter.js
//

const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync('./dict.json', 'utf-8');
const jsonData = JSON.parse(fileContent);

const fileNameSynonym = './synonym.txt';
if (fs.existsSync(fileNameSynonym)) {
    fs.unlinkSync(fileNameSynonym);
}
const writerSynonym = fs.createWriteStream(fileNameSynonym, { flags: 'a' });
for (const key in jsonData) {
    if (key) {
        const data = jsonData[key];
        if (data) {
            const arr = data.sinonim;
            if (Array.isArray(arr) && arr?.length > 0) {
                const str = `${key}, ${arr.join(", ")}\n`;
                writerSynonym.write(str);
            }
        }
    }
}
writerSynonym.end();

const fileNameAntonym = './antonym.txt';
if (fs.existsSync(fileNameAntonym)) {
    fs.unlinkSync(fileNameAntonym);
}
const writerAntonym = fs.createWriteStream(fileNameAntonym, { flags: 'a' });
for (const key in jsonData) {
    if (key) {
        const data = jsonData[key];
        if (data) {
            const arr = data.antonim;
            if (Array.isArray(arr) && arr?.length > 0) {
                const str = `${key}, ${arr.join(", ")}\n`;
                writerAntonym.write(str);
            }
        }
    }
}
writerAntonym.end();
