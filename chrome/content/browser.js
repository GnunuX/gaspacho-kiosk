if (!gkPref.prefHasUserValue("proto_allowed"))   gkPref.setCharPref("proto_allowed","http,https");
if (!gkPref.prefHasUserValue("menu_disallowed")) gkPref.setBoolPref("menu_disallowed",false);

var gk_proto_allowed = gkPref.getCharPref("proto_allowed");
var gk_menu_disallowed = gkPref.getBoolPref("menu_disallowed");

gk_fullscreen=false;
if (gkPref.prefHasUserValue("fullscreen"))
    if (gkPref.getBoolPref("fullscreen"))
        gk_fullscreen=true;

function gk_savelink(){
    d('gk_savelink');
    var l = gContextMenu.getLinkURL();
    if (!gk_saveas(l))
        return false;
    gContextMenu.saveLink();
    return true;
}
function gk_places_init(){
    d('gk_places_init');
    StarUI.cancelButtonOnCommand();
    gk_alert();
}

function gk_hidden_element(name){
    d('gk_hidden_element');
    element = document.getElementById(name);
    if (element)
        element.style.display="none";
}

function gk_init(){
    try{

	d("init");
	// don't execute in options window
	if ('undefined'==typeof gBrowser) return;

	window.removeEventListener("load", gk_init, true);

        if(lock){
	    //prevent bookmark
            document.getElementById("editBookmarkPanel").addEventListener("popupshown",gk_places_init,false);
	    document.getElementById("page-proxy-favicon").setAttribute("ondraggesture", false);
	    bookmark_menu = document.getElementById('context_bookmarkTab');
	    if (bookmark_menu)
		    bookmark_menu.style.display="none";
	    bookmarkall_menu = document.getElementById('context_bookmarkAllTabs');
	    if (bookmarkall_menu)
		    bookmarkall_menu.style.display="none";
	    //remove menu to stop private mode
	    gk_hidden_element('privateBrowsingItem');
	    gk_hidden_element('menu_savePage');
	    gk_hidden_element('menu_saveFrame');
	    gk_hidden_element('menu_sendLink');
	    gk_hidden_element('menu_printSetup');
	    gk_hidden_element('menu_printPreview');
	    gk_hidden_element('menu_print');
	    gk_hidden_element('menu_import');
	    gk_hidden_element('goOfflineMenuitem');
	    gk_hidden_element('view-menu');
	    gk_hidden_element('history-menu');
	    gk_hidden_element('menu_openLocation');
	    gk_hidden_element('menu_openFile');
	    //pour ne pas quitter
	    //gk_hidden_element('menu_FileQuitItem');

	    //remove feed button
            feed_button = document.getElementById('feed-button');
	    if (feed_button)
                feed_button.style.display="none";

	    //remove star button
            star_button = document.getElementById('star-button');
            if (star_button)
                star_button.style.display="none";

	    // suppress savelink
	    document.getElementById("context-savelink").setAttribute('oncommand','gk_savelink()');

            if (gk_menu_disallowed){
                //remove main menubar
                toolbar_menubar = document.getElementById('toolbar-menubar');
                if (toolbar_menubar)
                    toolbar_menubar.style.display="none";
            }
            //remove chromeclass menubar
            chromeclass_menubar = document.getElementById('chromeclass-menubar');
            if (chromeclass_menubar)
                chromeclass_menubar.style.display="none";

            //menu for hidden location bar and personal bar 
            popup_auto_complete = document.getElementById('mainPopupSet');
            if (popup_auto_complete)
                  popup_auto_complete.style.display="none";

            //remove autohide-context
            autohide_context =  document.getElementById('autohide-context');
            if (autohide_context)
                autohide_context.style.display="none";

            //remove the context menu
            content_Area = document.getElementById('contentAreaContextMenu');
            if (content_Area)
                content_Area.style.display="none";

	}
    }catch(e){ 
	alert("gk (200)\nCould not initialize gk extension.\n"+ e); 
    }
}
function notification() {
	d('notification');
        var notif = gBrowser.getNotificationBox();
	const priority = notif.PRIORITY_CRITICAL_LOW;
	notif.appendNotification("You are not allow to go this site", "forbidden", null, priority);
}

function gk_checkurl(){
    d('gk_checkurl');
    if (lock) {
        var locationtmp = window._content.location.href.toLowerCase();
        d(locationtmp);
        if (gk_proto_allowed == "*")
            return;
	if (locationtmp == "about:privatebrowsing" || locationtmp == "about:blank" || locationtmp == "resource:///browserconfig.properties" || locationtmp == "about:sessionrestore")
            return;
        var ExtArr = gk_proto_allowed.split(",");
        if(ExtArr.length >=1 && ExtArr[0] != "")
            for(i=0;i<ExtArr.length;i++)
                if(locationtmp.match(eval('/^'+ExtArr[i]+':/')))
                    return;

        window._content.location = "about:blank";
        setTimeout(notification, 1000);
    }
}

function gkBrowserFullScreen(){
    //when press F11
    d('gkBrowserFullScreen');
    if (gk_fullscreen)
        return false;
    BrowserFullScreen();
}

function gkBrowserStartup(){
    d('gkBrowserStartup');
    BrowserStartup();
    setTimeout(gkdelayedStartup, 1000);
}

function gkdelayedStartup(){
    d('gkdelayerStartup');
    if (lock) {
        //turning private browsing on
        //only for firefox 3.5+
	var glPref = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefService)
            .getBranch("browser.startup.");
        var pbs = Components.classes["@mozilla.org/privatebrowsing;1"]  
            .getService(Components.interfaces.nsIPrivateBrowsingService);  
        pbs.privateBrowsingEnabled = true; 
        window._content.location = glPref.getCharPref("homepage");
    }
    if (!gk_fullscreen)
        return true;
    //in fullscreen mode :
    //remove minimize-button
    var minimize_button = document.getElementById('minimize-button');
    if(minimize_button)
	  minimize_button.style.display="none";

    //remove restore-button
    var restore_button = document.getElementById('restore-button');
    if(restore_button)
	  restore_button.style.display="none";

    //remove close button
    if (gkPref.prefHasUserValue("fullscreen_exit"))
        if (gkPref.getBoolPref("fullscreen_exit"))
	{
            window_controls = document.getElementById('window-controls');
            if (window_controls)
                window_controls.style.display="none";
	}

    window.fullScreen = true;
}

