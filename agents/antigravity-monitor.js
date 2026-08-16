const http = require('http');

const AGILE_URL = 'http://localhost:3000/api/active-stories';
const seen = new Set();

function poll() {
  http.get(AGILE_URL, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.stories && parsed.stories.length > 0) {
          for (const story of parsed.stories) {
            if (!seen.has(story.id)) {
              seen.add(story.id);
              console.log(`\n🚨 ANTIGRAVITY ALERT: New story activated!`);
              console.log(`ID: ${story.id}`);
              console.log(`Title: ${story.title}`);
              console.log(`Description: ${story.description}\n`);
            }
          }
        }
      } catch (err) {
        // ignore JSON parse errors during hot reloads
      }
    });
  }).on('error', () => {
    // ignore fetch errors
  });
}

console.log("Antigravity background monitor started...");
setInterval(poll, 3000);
