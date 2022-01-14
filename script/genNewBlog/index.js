const infoCollector = require('./infoCollector');
const genBlog = require('./genBlog');

async function run() {
    const meta = await infoCollector();
    genBlog(meta);
}

run();
