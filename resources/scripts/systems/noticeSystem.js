(function(){var e=parseInt($.inidb.exists("noticeSettings","reqmessages"))?parseInt($.inidb.get("noticeSettings","reqmessages")):25,n=parseInt($.inidb.exists("noticeSettings","interval"))?parseInt($.inidb.get("noticeSettings","interval")):10,i=$.inidb.exists("noticeSettings","noticetoggle")?$.inidb.get("noticeSettings","noticetoggle"):false,t=parseInt($.inidb.GetKeyList("notices","").length)?parseInt($.inidb.GetKeyList("notices","").length):0,s=0;function r(){var e=$.inidb.GetKeyList("notices",""),n=0,i;for(i=0;i<e.length;i++){$.inidb.set("tempnotices",e[i],$.inidb.get("notices",e[i]))}$.inidb.RemoveFile("notices");e=$.inidb.GetKeyList("tempnotices","");for(i=0;i<e.length;i++){$.inidb.set("notices","message_"+n,$.inidb.get("tempnotices",e[i]));n++}$.inidb.RemoveFile("tempnotices")}function a(){var e=Packages.me.mast3rplan.phantombot.event.EventBus;var n=Packages.me.mast3rplan.phantombot.event.command.CommandEvent;var i=$.randRange(0,t);var s=$.inidb.get("notices","message_"+i);if(s.substr(0,8).equalsIgnoreCase("command:")){s=s.substring(8);e.instance().post(new n($.botName,s," "))}else{$.say(s)}}$.bind("ircChannelMessage",function(){s++});$.bind("command",function(s){var a=s.getSender(),g=s.getCommand(),o=s.getArguments().trim(),l=s.getArgs(),c=l[0],d="";if(g.equalsIgnoreCase("notice")){if(!$.isAdmin(a)){$.say($.whisperPrefix(a)+$.adminMsg);return}if(l.length==0){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-usage"));return}if(c.equalsIgnoreCase("get")){if(l.length<2){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-get-usage",t));return}else if(!$.inidb.exists("notices","message_"+l[1])){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-error-notice-404"));return}else{$.say($.inidb.get("notices","message_"+l[1]));return}}if(c.equalsIgnoreCase("edit")){if(l.length<3){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-edit-usage",t));return}else if(!$.inidb.exists("notices","message_"+l[1])){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-error-notice-404"));return}else{d=o.substring(o.indexOf(c)+c.length+3);$.inidb.set("notices","message_"+l[1],d);$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-edit-success"));return}}if(c.equalsIgnoreCase("remove")){if(l.length<2){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-remove-usage",t));return}else if(!$.inidb.exists("notices","message_"+l[1])){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-error-notice-404"));return}else{$.inidb.del("notices","message_"+l[1]);t--;r();$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-remove-success"));return}}if(c.equalsIgnoreCase("add")){if(l.length<2){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-add-usage"));return}else{d=o.substring(o.indexOf(c)+c.length+1);$.inidb.set("notices","message_"+t,d);t++;$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-add-success"));return}}if(c.equalsIgnoreCase("interval")){if(l.length<2){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-interval-usage"));return}else if(parseInt(l[1])<2){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-interval-404"));return}else{$.inidb.set("settings","interval",parseInt(l[1]));n=parseInt(l[1]);$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-inteval-success"));return}}if(c.equalsIgnoreCase("req")){if(l.length<2){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-req-usage"));return}else if(parseInt(l[1])<1){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-req-404"));return}else{$.inidb.set("settings","reqmessages",parseInt(l[1]));e=parseInt(l[1]);$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-req-success"));return}}if(c.equalsIgnoreCase("config")){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-config",i,n,e,t));return}if(c.equalsIgnoreCase("toggle")){i=!i;$.inidb.set("settings","noticetoggle",i);if(i){$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-disabled"))}else{$.say($.whisperPrefix(a)+$.lang.get("noticehandler.notice-enabled"))}}if(c.equalsIgnoreCase("reload")){r()}}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./systems/noticeSystem.js")){setInterval(function(){if($.bot.isModuleEnabled("./systems/noticeSystem.js")&&t>0&&i){if(s>=e){a();s=0}}},n*60*1e3);$.registerChatCommand("./systems/noticeSystem.js","notice")}})})();