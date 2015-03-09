module.exports = {
 def: {
   exec: function(hook, callback, commands) {
       wtfThatCodeIsUgly(hook, callback, commands)
   },
   help: function(callback) {
       callback('Result of command is piped into the next one. usage : !combine command1 >> !command2. For example : !combine !bible John 1:1 >> !ascii >> !analyze');
   }
 }
}

var wtfThatCodeIsUgly = function(hook, callback, commands) {
 var split = splitCommands(hook.command_text);
 var commandsToExecute = {};
 var nextInLine = 0;
 for(var i = split.length -1 ; i >= 0 ; i --) {
   commandsToExecute[i] = {};
   if(i == split.length -1 ){
     commandsToExecute[i].callback = callback;
   } else {
     commandsToExecute[i].callback = function(res) {
       nextInLine ++;
       var nextCommand = commandsToExecute[nextInLine]
       commands[nextCommand.command].exec(getHookForResult(res, hook), nextCommand.callback)
     }
   }
   commandsToExecute[i].command = getCommandFromInput(split[i], hook).command_name;
   if(i == 0){
     commandsToExecute[i].command_text = getCommandFromInput(split[i], hook).command_text
     commandsToExecute[i].hook = getHookForResult(split[i], hook)
   }
 }
 console.log(commandsToExecute)
 commands[commandsToExecute[0].command].exec(commandsToExecute[0].hook, commandsToExecute[0].callback)
}

var splitCommands = function(input) {
  return input.split("&gt;&gt;");
}

var getCommandFromInput = function(input, originalHook) {
 if(input [0] == " "){
   input = input.substring(1)
 }
 var hook = {
   text: input,
 }
 console.log(input)
 hook.full_command_text = hook.text.substring(originalHook.trigger_word.length).trim();
 var index = hook.full_command_text.indexOf(" ");
 if (index !== -1) {
   hook.command_name = hook.full_command_text.substring(0, index)
     hook.command_text = hook.full_command_text.substring(index + 1);
 } else {
   hook.command_name = hook.full_command_text;
 }
 return hook;

}

var getHookForResult = function(result, originalHook) {
 var text;
 if(typeof result == "object") {
   text = result.text;
 }else{
   text = result;
 }
 var hook = {
   text: text,
 }

 hook.full_command_text = hook.text.substring(originalHook.trigger_word.length).trim();
 var index = hook.full_command_text.indexOf(" ");
 if (index !== -1) {
   hook.command_name = hook.full_command_text.substring(0, index)
     hook.command_text = hook.full_command_text.substring(index + 1);
 } else {
   hook.command_name = hook.full_command_text;
 }
 return hook;
}
