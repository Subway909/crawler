const Crawler = require("crawler");

let obselete = []; // Array of what was crawled already

let c = new Crawler();

function crawlAllUrls(url) {
    console.log(`Crawling ${url}`);
    c.queue({
        uri: url,
        callback: function (err, res, done) {
            if (err) throw err;
            let $ = res.$;
            try {
                let urls = $("a");
                Object.keys(urls).forEach((item) => {
                    if (urls[item].type === 'tag') {
                        let href = urls[item].attribs.href;
                        if (href && !obselete.includes(href)) {
                            href = href.trim();
                            obselete.push(href);
                            setTimeout(function() {
                                href.startsWith(url) ? crawlAllUrls(href) : crawlAllUrls(`${url}${href}`)
                            }, 5000)

                        }
                    }
                });
            } catch (e) {
                console.error(`Encountered an error crawling ${url}. Aborting crawl.`);
                done()

            }
            done();
        }
    })
}

crawlAllUrls('https://zarbees.com/');