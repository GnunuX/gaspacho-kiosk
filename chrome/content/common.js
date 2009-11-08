var gkPref = Components.classes["@mozilla.org/preferences-service;1"]
    .getService(Components.interfaces.nsIPrefService)
    .getBranch("extensions.gk.");
if (!gkPref.prefHasUserValue("lock")) gkPref.setBoolPref("lock",false);

var lock = gkPref.getBoolPref("lock");

if(!gkPref.prefHasUserValue("ext_allowed")) gkPref.setCharPref("ext_allowed","");

var list_ext = gkPref.getCharPref("ext_allowed");

function d(msg){
    //comment for debug
    //return;
    var acs = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces["nsIConsoleService"]);
    acs.logStringMessage(msg);
}

function gk_alert(){
    var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
        .getService(Components.interfaces.nsIPromptService);
    okorcancel = prompts.alert(null, 'Alert', 'This action is forbidden');
}

function gk_saveas(link){
    if(list_ext == "*" )
        return true;
    var ExtArr = list_ext.split(",");
    if(ExtArr.length >=1 && ExtArr[0] != "" )
        for(i=0;i<ExtArr.length;i++)
            if(link.indexOf("."+ExtArr[i]) >= 0 )
                return true;
    gk_alert();
    return false;
}

function gk_donothing()
{
}
