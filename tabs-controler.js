function GetCurrentTab(callback) {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabArray) {
        callback(tabArray[0]);
    });
}

function GetTabMatchURL(url,callback)
{
    chrome.tabs.query({
        url:url
    }, function (tabArray) {
        callback(tabArray[0]);
    });
}
function GetTabMatchRegexURL(Regex,callback)
{
    chrome.tabs.query({}, function (tabArray) {
        tabArray.forEach(element => {
            if(element.url.match(Regex))
            {
                callback(element);
            }
        });
    });
}