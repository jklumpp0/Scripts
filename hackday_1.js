// ==UserScript==
// @name       Show AG Filter on search results
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      *://www.amazon.com/s/*
// @match      *://*.amazon.com/*/dp/*
// @match      *://*.amazon.com/gp/product/*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
GM_addStyle('div.zExportBanner {\
	max-width: 800px;\
    width: 100%;\
    border: 1px solid rgb(221, 218, 192);\
    background: rgb(255, 255, 221);\
	margin: 0 auto 7px auto;\
}\
\
div.zExportBannerContent {\
    width: 600px;\
    margin: 13px auto 13px auto;\
}\
\
div.zExportBannerFlag {\
    float: left;\
    width: 50px;\
    height: 50px;\
    background: no-repeat url("http://www.matt-gibson.org/wp-content/uploads/2011/01/icon_ipodFlag_portugal.gif");\
    background-size: 100%;\
}\
\
div.zExportBannerHi h1 {\
    margin-left: 13px;\
    margin-top: -7px;\
    display: inline;\
    font-size: 39px;\
    font-weight: bold;\
    line-height: 40px;\
}\
\
div.zExportBannerHi h2 {\
    float: right;\
    display: block;\
    font-size: 1.0em;\
    margin: 0;\
    line-height: 1.0em;\
    font-weight: bold;\
}\
\
span.zLearnMore {\
    display: block;\
    margin-top: 7px;\
    text-align: right;\
    font-size: 9pt;\
    color: blue;\
    text-decoration: underline;\
    line-height: 9pt;\
    font-weight: bold;\
}\
\
div.zFooter {\
    clear: both;\
}');

$(document).ready(function() {
    var html = '<div class="zExportBanner">\
    <div class="zExportBannerContent">\
        <div src="http://www.matt-gibson.org/wp-content/uploads/2011/01/icon_ipodFlag_portugal.gif" class="zExportBannerFlag"></div>\
        <div class="zExportBannerHi">\
            <h1>Olá</h1>\
            <h2>Só os resultados que mostram exportáveis para Portugal<br/>\
            <a target="_blank" href="http://www.amazon.com/gp/help/customer/display.html?nodeId=201074230"><span class="zLearnMore">Saiba mais</span></a></h2>\
        </div>\
    </div>\
    <div class="zFooter"></div>\
</div>';
    var PAGE_SEARCH = 1;
    var PAGE_DETAIL = 2;
    var pageType = (window.location.href.indexOf("/s/") > -1 ? PAGE_SEARCH : PAGE_DETAIL);
    var SECRET_PARAM = 'zAgFilterSet=1';
    
    var handleSearchPage = function() {
        $("#resultsCol").before(html);
        var ensureAg = function () {
            var parent = $("ul#ref_2944662011");
    
            if (parent.text().indexOf('Clear') === -1) {
                console.log("Redirecting");
                $("span", parent).click();
            }
        };
        setInterval(ensureAg, 500);
    };
      
    switch (pageType) {
        case PAGE_SEARCH:
            handleSearchPage();
            break;
        case PAGE_DETAIL:
            $("div.a-container").prepend(html);
            var listings = $("#mbc span.a-size-small a");
            listings.attr('href', listings.attr('href') + "&" + SECRET_PARAM);
            break;
    }
});
