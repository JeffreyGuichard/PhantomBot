(function(){var o=[],e=$.getIniDbBoolean("settings","moderatorCooldown",false);function n(e,n,s){if(!n||isNaN(n)){n=$.systemTime()+($.inidb.exists("commandCooldown",e)?parseInt($.inidb.get("commandCooldown",e))*1e3:0)}if(!s){s="global"}if(n>0){o.push({command:e,username:s,expiresAt:n})}}function s(s,a){if($.isMod(a)&&!e){return 0}var i,l;for(l in o){if(!o[l].command.equalsIgnoreCase(s)){continue}if(o[l].username.equalsIgnoreCase("global")||o[l].username.equalsIgnoreCase(a)){i=o[l].expiresAt-$.systemTime();if(i<=0){o.splice(l,1);n(s,null,a?a:null)}return i}}n(s,null,a?a:null);return 0}function a(e){var n;for(n in o){if(o[n].command.equalsIgnoreCase(e)){o.splice(n,1);return}}}function i(o){return $.inidb.exists("commandCooldown",o)}$.bind("command",function(o){var n=o.getSender().toLowerCase(),s=o.getCommand(),i=o.getArgs(),l=i[0],r=parseInt(i[1]);if(s.equalsIgnoreCase("cooldown")){if(!l||isNaN(r)){$.say($.whisperPrefix(n)+$.lang.get("cooldown.set.usage"));return}if(r==0){$.inidb.del("commandCooldown",l.toLowerCase())}else{$.inidb.set("commandCooldown",l.toLowerCase(),r)}$.say($.whisperPrefix(n)+$.lang.get("cooldown.set.success",l,$.getTimeString(r)))}if(s.equalsIgnoreCase("clearcooldown")){if(!l){$.say($.whisperPrefix(n)+$.lang.get("cooldown.clear.usage"));return}a(l);$.say($.whisperPrefix(n)+$.lang.get("cooldown.clear.success",l))}if(s.equalsIgnoreCase("togglemodcooldown")){e=!e;$.setIniDbBoolean("settings","moderatorCooldown",e);$.say($.whisperPrefix(n)+$.lang.get("cooldown.set.togglemodcooldown",e?$.lang.get("common.enabled"):$.lang.get("common.disabled")))}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./core/commandCoolDown.js")){$.registerChatCommand("./core/commandCoolDown.js","cooldown",1);$.registerChatCommand("./core/commandCoolDown.js","clearcooldown",1);$.registerChatCommand("./core/commandCoolDown.js","togglemodcooldown",1)}});$.coolDown={set:n,get:s,unPause:a,hasCooldown:i}})();