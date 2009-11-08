var gkPref = Components.classes["@mozilla.org/preferences-service;1"]
    .getService(Components.interfaces.nsIPrefService)
    .getBranch("extensions.gk.");

var glPref = Components.classes["@mozilla.org/preferences-service;1"]
    .getService(Components.interfaces.nsIPrefService)
    .getBranch("browser.fullscreen.");

var gopenPref = Components.classes["@mozilla.org/preferences-service;1"]
    .getService(Components.interfaces.nsIPrefService)
    .getBranch("browser.link.open_newwindow.");
function gk_initializeOptions() {
    if (!gkPref.prefHasUserValue("lock")) gkPref.setBoolPref("lock",false);
    this.lock = document.getElementById("lock");
    this.lock.checked = gkPref.getBoolPref("lock");

    if (!gkPref.prefHasUserValue("menu_disallowed")) gkPref.setBoolPref("menu_disallowed",false);
    this.menu_disallowed = document.getElementById("menu_disallowed");
    this.menu_disallowed.checked = gkPref.getBoolPref("menu_disallowed");
	
    if (!gkPref.prefHasUserValue("fullscreen")) gkPref.setBoolPref("fullscreen",false);
    this.fullscreen = document.getElementById("fullscreen");
    this.fullscreen.checked = gkPref.getBoolPref("fullscreen");
	
    if (!gkPref.prefHasUserValue("fullscreen_exit")) gkPref.setBoolPref("fullscreen_exit",false);
    this.fullscreen_exit = document.getElementById("fullscreen_exit");
    this.fullscreen_exit.checked = gkPref.getBoolPref("fullscreen_exit");
	
    if (!gkPref.prefHasUserValue("ext_allowed")) gkPref.setCharPref("ext_allowed","");
    this.ext = document.getElementById("ext_allowed");
    this.ext.value = gkPref.getCharPref("ext_allowed");

    if (!gkPref.prefHasUserValue("proto_allowed")) gkPref.setCharPref("proto_allowed","http,https");
    this.proto = document.getElementById("proto_allowed");
    this.proto.value = gkPref.getCharPref("proto_allowed");

    if (!glPref.prefHasUserValue("autohide")) glPref.setBoolPref("autohide",false);
    this.autohide = document.getElementById("fullscreen_autohide");
    this.autohide.value = glPref.getBoolPref("autohide");
}

function gk_saveOptions() {
    this.lock = document.getElementById("lock").checked;
    gkPref.setBoolPref("lock",this.lock);
	
    this.menu_disallowed = document.getElementById("menu_disallowed").checked;
    gkPref.setBoolPref("menu_disallowed",this.menu_disallowed);
	
    this.fullscreen = document.getElementById("fullscreen").checked;
    gkPref.setBoolPref("fullscreen",this.fullscreen);

    this.fullscreen_exit = document.getElementById("fullscreen_exit").checked;
    gkPref.setBoolPref("fullscreen_exit",this.fullscreen_exit);

    this.ext = document.getElementById("ext_allowed").value;
    gkPref.setCharPref("ext_allowed",this.ext);
	
    this.proto = document.getElementById("proto_allowed").value;
    gkPref.setCharPref("proto_allowed",this.proto);

    this.autohide = document.getElementById("fullscreen_autohide").value;
    if (this.autohide) {
        glPref.setBoolPref("autohide", true);
        glPref.setIntPref("animateUp", 1);
	gopenPref.setIntPref("restriction", 2);
    } else {
        glPref.setBoolPref("autohide", false);
        glPref.setIntPref("animateUp", 0);
	gopenPref.setIntPref("restriction", 0);
    }
	
    Components.classes["@mozilla.org/preferences-service;1"].
       	getService(Components.interfaces.nsIPrefService).savePrefFile(null);
    return true;
}

