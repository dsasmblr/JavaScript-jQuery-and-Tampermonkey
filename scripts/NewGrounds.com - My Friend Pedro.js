// ==UserScript==
// @name         NewGrounds - Pedro
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Custom "My Friend Pedro" page on NewGrounds.
// @author       You
// @match        https://www.newgrounds.com/portal/view/641215
// @run-at       document-end
// @grant        none
// ==/UserScript==

//-- Get rid of jQuery warnings in Tampermonkey (Thanks for the idea, FreeER!)
var jQuery = window.jQuery

//-- Modify header of game container:
//-- Change rating to 'M', center it with game title, and remove right-hand div
var podHead = jQuery('.pod-head')
podHead.children('.rated-t').attr('class', 'rated-m').css('text-align','center')
podHead.children('div').remove()

//-- Grab main container that game is in, set new customized CSS for it, then store in variable myFriendPedro via clone()
var myFriendPedro = jQuery('.maincontent-wide').css({
  'width': '635px',
  'margin': '0',
  'position': 'absolute',
  'top': '50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)'
}).clone()

//-- Apply background image to body, delete all elements within body, then append custom cloned game container
jQuery('body').css({
  'background-image': 'url("https://cdn3.dualshockers.com/wp-content/uploads/2018/06/My-Friend-Pedro-Key-Art.png")',
  'background-size': 'cover'
}).empty().append(myFriendPedro)
