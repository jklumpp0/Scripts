// ==UserScript==
// @name       AG Offer Listing Filter
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Show an AG search filter when looking at used and new listings
// @match      *://*.amazon.com/gp/offer-listing/*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
GM_addStyle("input[type=checkbox]#agFilterCheckbox {\
						margin-left: 5px;\
						top: -6px; }");

$(document).ready(function() {
    var html = "<input type='checkbox' id='agFilterCheckbox'>\
				<a href='#' id='agFilterLink'>Amazon Global offers</a>\
				<i class='a-icon a-icon-text-separator'></i>";
    $('a.olpFilterLink + i').after(html);    
    var agFilter = $('#agFilterLink');
    var agCheckbox = $('#agFilterCheckbox');
    var SECRET_PARAM = 'zAgFilterSet=1';
    var isStartChecked = window.location.href.indexOf(SECRET_PARAM) > -1;

    var updateLinks = function(isEnabled) {
        $('a').each(function() {
            var addr = $(this).attr('href');
            if (typeof addr === 'undefined') { 
                console.log("Found undefined HREF: " + this);
                return;
            }
            var adjustedSecretParam = "&" + SECRET_PARAM;
            
            if (addr[0] === 'j' || addr[0] === '#' || addr[0] === 'h') {
                return;
            } else if (isEnabled) {
                $(this).attr('href', addr + adjustedSecretParam);
            } else {
                $(this).attr('href', addr.replace(adjustedSecretParam, ''));
            }
        });
    };
    
    var getUsed = function() {
        var result = [];
        
        $(".olpCondition").each(function() { 
            var root = $(this).parent().parent();
            var toAlter = [root, root.prev()];
           	var isUsed = $(this).text().trim() !== "New";
            
            if (isUsed) {
                result = result.concat(toAlter);
            }
        });
        
        return result;
    };
    
    var getFBA = function() {
        var offers = $('.olpOffer');
        var results = [];
        
        offers.each(function(index) {
           var isFBA = $('.olpFbaPopoverTrigger', $(this)).length > 0; 
           var seller = $('.olpSellerName img', $(this)).attr('src');
           var isAmazon = false;
            
            if (typeof seller === 'string') {
				isAmazon = seller.indexOf('J1oeL.gif') > -1;
            }
            
           var isNotAG = !(isFBA || isAmazon);
            console.log(isNotAG);
            if (isNotAG) {
                results.push($(this));
                results.push($(this).prev());
            }
        });
        
        console.log("Results: " + results);
        return results;
    };

    var showAg = function(isFiltered) {
        var used = getUsed();
        var fba = getFBA();
        var toToggle = used.concat(fba)
        console.log("Objects: " + toToggle);
        
        $.each(toToggle, function(index) {
            toToggle[index].toggle(!isFiltered);
        });
    };
    
    // Load HTML before adding triggers
    agFilter.ready(function() {        
        var handleChange = function() {
        	var isSelected = agCheckbox.prop('checked');
            showAg(isSelected);
            updateLinks(isSelected);
        };
        
        agCheckbox.change(handleChange);
        
        agFilter.click(function() {
            agCheckbox.click();
        });
        
        if (isStartChecked) {
            agCheckbox.prop('checked', true);
            handleChange();
        }
    });
});
