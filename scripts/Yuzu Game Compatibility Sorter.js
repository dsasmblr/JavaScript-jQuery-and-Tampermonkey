// Webpage this script is for: https://yuzu-emu.org/game/
//
// Description: This script allows you to sort games by compatibility type.
//
// Use: Click on the page header ("Game Compatibility List") to reset the games list,
// or click on one of the 7 compatiblity types (Perfect, Great, Okay, etc.) in the list
// up top to show only games of that compatibility type.
//
// Note: Either toss this script in a Tampermonkey script so it'll automatically run every
// time you load the page, or paste it all into your browser's DevTools console and then
// press Enter to execute the code!

// Get all rows of games from the game table
const allGames = [...document.querySelectorAll('[data-key]')];

// Get all rows from the "Game Compatibility List" table
const gameCompatList = [...document.querySelector('table > tbody').children];

// Resets games list or sorts games list by chosen compatibility type
function sort(data) {
  for (game of allGames) {
    const compatibility = parseInt(game.childNodes[3].getAttribute('data-compatibility'));

    if (data === 'reset' || data === compatibility) {
      game.style.display = 'table-row';
    } else {
      game.style.display = 'none';
    }
  }
}

// IIFE to nix ads
(function noAds() {
  // Get rid of ads column
  document.querySelector('.columns').lastElementChild.remove();

  // Correct games column width
  document.querySelector('.columns > .column').classList.remove('is-two-thirds');
})();

// When clicking on a compatibility list row, sort games by that compatibility type
gameCompatList.forEach((compat, idx) => {
  compat.addEventListener('click', function() {
    idx === gameCompatList.length - 1 ? sort(99) : sort(idx);
  });
});

// Clicking on page title resets game list to original, unsorted state
document.querySelector('.title').addEventListener('click', () => {
  sort('reset');
});
