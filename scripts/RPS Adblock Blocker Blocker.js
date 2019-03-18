// ==UserScript==
// @name         RockPaperShotgun Adblock Blocker Blocker
// @namespace    http://rockpapershotgun.com/
// @version      0.1
// @description  Remove ad-block roadblock from rockpapershotgun.com
// @author       You
// @match        *://*.rockpapershotgun.com/*
// @grant        none
// ==/UserScript==

//-----------------------------
//-- jQuery version of the hack
//-----------------------------

//-- Remove Tampermonkey warnings about jQuery
/* let $ = window.$;

//-- Function to run after setTimeout time completes
function doStuffs() {
    //-- Remove roadblock divs
    $('body > div').eq(-1).remove();
    $('body > div').eq(-1).remove();

    //-- Remove overflow-y hidden on body and html
    $('html, body').css('overflow-y', 'visible');

    //-- Remove .leaderboards div
    $('.leaderboards').remove();

    //-- Remove padding-right used for sidebar ads
    $('.ads-enabled .page>main .above').css('padding-right', '0');
}

//-- Run function 1 second after page loads
setTimeout(() => { doStuffs() }, 1000); */

//---------------------------------
//-- JavaScript version of the hack
//---------------------------------

//-- Function to run after setTimeout time completes
function doStuffs() {
    //-- NICE-TO-KNOW: This will hide the elements vis CSS modifications instead of removing them
    //-- NOTE: This doesn't guarantee to always get the last 2 divs in our scenario
    // document.querySelectorAll('body > div')[3].style.display = 'none';
    // document.querySelectorAll('body > div')[4].style.display = 'none';

    //-- NICE-TO-KNOW: Chrome's mnemonic for querySelectorAll() (returns array, not nodelist!)
    //-- NOTE: Works within Chrome console only, not from within a script like this
    // $$('body > div').slice(-1)[0].remove();
    // $$('home > div').slice(-1)[0].remove();

    //-- NICE-TO-KNOW: Pre-ES6 way to convert nodelist to array (can then use array methods)
    // [].slice.call(document.querySelectorAll('body > div')).slice(-1)[0].remove();
    // [].slice.call(document.querySelectorAll('body > div')).slice(-1)[0].remove();

    //-- ES6 spread operator to convert nodelist to array
    [...document.querySelectorAll('body > div')].slice(-1)[0].remove();
    [...document.querySelectorAll('body > div')].slice(-1)[0].remove();

    //-- Set overflow-y to visible on html and body
    document.querySelector('html').style.overflowY = "visible";
    document.querySelector('body').style.overflowY = "visible";

    //-- Remove padding-right used for sidebar ads
    document.querySelector('.ads-enabled .page > main .above').style.paddingRight = "0";

    //-- Remove .leaderboards div
    document.querySelector('.leaderboards').remove();
}

//-- Run function 1 second after page loads
setTimeout(() => { doStuffs() }, 1000);