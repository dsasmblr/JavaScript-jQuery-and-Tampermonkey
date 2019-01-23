/*              Reddit NSFW Saved Post Scrubber - Instructions

Note: Before running this script, you should know two particular side effects. First,
      this script unsaves ALL saves marked with the NSFW stamp. That includes subs like
      /r/wtf of which you may not want to unsave posts from. In that regard, this script
      is an all-or-none thing.
      
      Second, there are plenty of risque subreddits that aren't stamped NSFW or 18+. As
      such, those saves will remain; however, after a first run of the script, you should
      be able to more quickly scan through your remaining saved posts and manually
      finish the job.

      Now onward to the instructions!

1. While logged into your account, go to the following URL after you first replace
   YourUsernameHere with your actual username:

   https://www.reddit.com/user/YourUsernameHere/saved/

2. Click anywhere in this script now and press CTRL + A, which will highlight
   everything. Then, press CTRL + C to copy it all.

3. Click on the tab you have Reddit opened in from step one. Press F12 and you
   will see the DevTools section appear. In its bottom pane, you will see a >
   character. Click it and you should now see a cursor slowly flashing beside it.

4. Press CTRL + V, which will paste what you copied of this script. Now press Enter.
   The script will run and you can watch everything happen in the console as URLs
   are logged. Once it says, "That's all, folks!", everything will be completed.
   Simply refresh the page and all the NSFW-tagged saved posts will be removed.

*/

//-- fullUrl keeps track of the URLs scraped from the "Next" button on the page.
let fullUrl = document.location.href;

//-- This function scrapes data from AJAX results and places them on the page.
function modifyPage(data, status) {

    //-- Find the main container of saved posts, then strip its id so there
    //-- aren't duplicates of it when appending to main #siteTable container
    let container = jQuery(data).find('#siteTable').attr('id', '');

    //-- If true is passed, append container. Else, append final container, clean
    //-- up nav buttons, then simulate click on "unsave" of each saved NSFW post.
    if (status) {
        jQuery("#siteTable").append(container);
    } else {
        jQuery("#siteTable").append(container);
        jQuery('.nav-buttons').hide();
        jQuery('.nsfw-stamp').parent().siblings('.save-button').find('a').click();
        console.log("That's all, folks!");
    }
}

//-- While fullUrl isn't false, run AJAX calls synchronously.
while (fullUrl) {
    jQuery.ajax(fullUrl, {
        type: 'GET',
        dataType: 'html',
        async: false, 
        success: function(data) {
            try {
                //-- Set fullUrl to the href value of the .next-button element
                fullUrl = jQuery(data).find('.next-button')[0].childNodes[0].href;
            }
            catch {
                //-- Set fullUrl to false; finalizes AJAX calls and ends while-loop
                fullUrl = false;
            }

            //-- If fullUrl is set to false, wrap things up with a final call to modifyPage().
            //-- Else, keep adding AJAX data containers to main container.
            //-- The 'count=25' check keeps the first page from being duplicated to itself.
            if (!fullUrl) {
                modifyPage(data, false);
            } else {
                if (!fullUrl.includes('count=25')) {
                    modifyPage(data, true);
                }
                console.log(fullUrl);
            }
        }
    });
}