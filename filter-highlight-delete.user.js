// ==UserScript==
// @name         Filter, Highlight & Delete
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  Highlights, Lowlights, or Deletes page elements based on their text.
// @author       listfilterErick
// @grant        none

// @match        *://news.google.com/*
// @match        *://www.youtube.com/*
// @match        *://www.reddit.com/r/*

// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012

// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==
/* jshint esversion: 6 */
/*
    Update 1.1.2 (09-22-2019)
    - logged matches now includes matched rules.
    - code cleanup

    Filter searches through the delete list, then the lowlight rules, and finally the highlight rules.
    If it matches something earlier in the lists, it won't check lower lists such as 
    if there was a match in the delete list, lowlight and highlight rules aren't checked.
    This can be changed by changing the checkBlock() function.

    Google News: Only works for the front page of google news. Need a more robust selector for other special sections.
    Reddit: Only works for compact view.

    Search for these markers for locations where you need to add new selectors for new sites.
    markA: define selector for block to apply css rules to. (needs to be valid for jquery and css)
    markB: define selector for the text of the block.

    The applied highlight/lowlight classes are:
    lf-highlight1 (strong highlight)
    lf-highlight2
    lf-lowlight1
    lf-lowlight2 (strong lowlight)
*/

(function () {
    'use strict';

    // ==== filter lists ==========================================================================|
    if (1) {
        //strong highlight
        var highlight1 = [
            /apple/i,
        ];
        //weak highlight
        var highlight2 = [
            /gamestop/i,
        ];
        //weak lowlight
        var lowlight1 = [
            /goodbye/i,
        ];
        //strong lowlight
        var lowlight2 = [
            /\btv\b/i,
        ];
        //delete block
        var delete1 = [
            /throne|dany|\bgot\b/i,
        ];
    }

    const domainName = window.location.hostname;
    const hrefString = window.location.href; //href lets you be more specific
    let blockSelector = "article";
    // ==== markA start ===========================================================================|
    if (/news\.google\.com/gi.test(domainName)) {
        blockSelector = "main>c-wiz>div>div";
    } else if (/www\.youtube\.com/gi.test(domainName)) {
        blockSelector = "ytd-compact-video-renderer";
    } else if (/www\.reddit\.com/gi.test(domainName)) {
        blockSelector = ".scrollerItem>div>div:nth-child(2)";
    }
    // ==== markA end =============================================================================|

    // ==== script options ========================================================================|
    const addFilterButton = 0; // set to 1 to show a button to manually run this script.
    const buttonTransparency = .3; // set to a value between 0 and 1, 1 is no transparency, .5 is 50% transparency.
    const dynamicChecking = 1; // set to 1 to run the script automatically when new block elements are detected.

    const enableLogMessages = 0; // set to 1 to enable console messages, required for the following message options.
    const logMatches = 1; // set to 1 to log to console what was matched.
    const logRuntime = 1; // set to 1 to log to console how long this takes to run.

    function consolelog(text) {
        if (enableLogMessages) {
            console.log(text);
        }
    }
    consolelog("#### list filter script start. ####");

    // ==== function definitions ==================================================================|

    // checks string against given list of regular expressions.
    let regexLog = "";
    function checkRegex(string, regexList) {
        for (let i = 0; i < regexList.length; i++) {
            if (regexList[i].test(string)) {
                if (regexLog) {
                    regexLog = regexLog +", "+ regexList[i];
                }else {
                    regexLog = regexList[i];
                }
                return true;
            }
        }
        return false;
    }

    let elementCounter = 0;

    // check attributes of a block to choose what class to add to it.
    function checkBlock(index, element) {

        let searchText;

        // ==== markB start =======================================================================|
        if (/news\.google\.com/gi.test(domainName)) {
            searchText = jQuery(this).find("div>article>h3").eq(0).text().trim();
        } else if (/www\.youtube\.com/gi.test(domainName)) {
            searchText = jQuery(this).find("span#video-title").text().trim();
        } else if (/www\.reddit\.com/gi.test(domainName)) {
            searchText = jQuery(this).find("span>a>h2").text().trim();
        }
        // ==== markB end =========================================================================|
        searchText = searchText.trim();

        // class list identifies what was checked in past iterations
        let classList = "";
        if (jQuery(this).attr("class")) {
            classList = jQuery(this).attr("class");
            //consolelog(classList);
        }

        if (searchText && (!classList || !/\blf-/.test(classList))) {
            //if ( searchText ) {
            var matchCode = "n1";

            // stops after the first rule matched.
            if (checkRegex(searchText, delete1)) {
                matchCode = "d1";
                jQuery(this).remove();
            } else if (checkRegex(searchText, lowlight2)) {
                matchCode = "l2";
                jQuery(this).addClass("lf-lowlight2");
            } else if (checkRegex(searchText, lowlight1)) {
                matchCode = "l1";
                jQuery(this).addClass("lf-lowlight1");
            } else if (checkRegex(searchText, highlight1)) {
                matchCode = "h1";
                jQuery(this).addClass("lf-highlight1");
            } else if (checkRegex(searchText, highlight2)) {
                matchCode = "h2";
                jQuery(this).addClass("lf-highlight2");
            } else {
                jQuery(this).addClass("lf-checked");
            }

            if (enableLogMessages && logMatches && !/n1/.test(matchCode)) { //shows all matches
            //if (enableLogMessages && logMatches && /d|l/.test(matchCode)) { //shows only lowlight and delete matches
                elementCounter++;
                consolelog(elementCounter +" ("+ matchCode +"): "+ searchText +" | "+ regexLog);
                regexLog = "";
            }
        }

    } // end function checkBlock()

    function checkBlocks() {
        if (enableLogMessages && logRuntime) {
            var startTime = performance.now();
        }

        jQuery(blockSelector).each(checkBlock);

        if (enableLogMessages && logRuntime) {
            const endTime = performance.now();
            const runTime = ((endTime - startTime) / 1000).toFixed(2);
            if (runTime < 1) {
                console.log('(H/L) finished in less than 1 second.');
            }else {
                console.log('(H/L) finished after ' + runTime + ' seconds.');
            }
        }
    }

    if (dynamicChecking) {
        waitForKeyElements(blockSelector, checkBlocks);
    } else {
        checkBlocks();
    }

    // ==== optional button code ==================================================================|
    if (addFilterButton) {
        if (!jQuery("#wt-buttons").length) {
            consolelog("(H/L) created #wt-buttons.");
            jQuery("body").prepend('<div id="wt-buttons"><div id="lf-reset">H/L</div><div id="wt-close">&times;</div></div>');
            jQuery("#wt-close").click(function () { jQuery("#wt-buttons").remove(); });

            const webToolsCss =
`<style type="text/css">
    #wt-buttons {
        width: 40px;
        display: block !important;
        position: fixed;
        top: 0px;
        right: 0px;
        z-index: 9000;
        opacity: `+ buttonTransparency + `;
    }
    #wt-buttons:hover {
        opacity: 1;
    }
    #wt-buttons div {
        display: block !important;
        padding: 5px;
        border-radius: 5px;
        margin-top: 2px;
        font-size: initial !important;
        font-weight: bold;
        color: white;
        cursor: pointer;
    }
    #wt-close {
        background: #777777;
        text-align: center;
    }
</style>`;
            jQuery(document.body).append(webToolsCss);
        } else {
            jQuery("#wt-buttons").prepend('<div id="lf-reset">H/L</div>');
        }
        const listFilterCss =
`<style>
    #lf-reset {
        background: #177e14;
    }
</style>`;
        jQuery(document.body).append(listFilterCss);
        jQuery("#lf-reset").click(function () {
            elementCounter = 0;
            checkBlocks();
        });
    }

    var filterCss =
`<style>
    `+ blockSelector +`.lf-highlight1 {
        background: #baffc9;/*green*/
    }
    `+ blockSelector +`.lf-highlight2 {
        background: #ffffba;/*yellow*/
    }
    `+ blockSelector +`.lf-lowlight1 {
        background: #ffdfba;/*orange*/
        opacity: .3;
    }
    `+ blockSelector +`.lf-lowlight2 {
        background: #ffccca;/*red*/
        opacity: .5;
    }
</style>`;
    jQuery(document.body).append(filterCss);

    consolelog("#### list filter script finished. ####");
})();
