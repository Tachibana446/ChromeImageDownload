
function download(tabclose = false) {
    chrome.windows.getCurrent({ populate: true }, win => {
        let closetabs = []
        let urls = []
        for (const tab of win.tabs) {
            // 画像かどうか
            let result = /(png|jpe?g|bmp|gif)(:.*)?(\?.*)?$/i.exec(tab.url)
            if (result) {
                let extension = result[1]
                closetabs.push(tab.id)
                urls.push({ url: tab.url, ext: extension })
            }
        }
        for (const u of urls) {
            let result = /(.*?\/)*(.*)\.(.*)$/.exec(u.url)
            let ext = result[3]     // 拡張子
            ext = ext.replace(/:.*$/, "").replace(/[*?"<>|]/, "")
            let filename = result[2] + "." + ext    // ファイル名
            console.log({ url: u.url, filename: filename })
            chrome.downloads.download({ url: u.url, filename: filename })
        }
        if (tabclose)
            chrome.tabs.remove(closetabs)
    })
}

document.getElementById('nonclose').addEventListener("click", () => download())
document.getElementById('close').addEventListener("click", () => download(true))
