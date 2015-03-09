module.exports = {
    def: {
        exec : function (hook, callback) {
            var splited = hook.command_text.split(" ");
            if(splited.length < 2) {
                callback("Error: Must specify an attack and a target.");
            }

            // Extract given args
            var target = splited[splited.length-1];
            var attack = hook.command_text.split(target)[0];
            var back = hook.user_name + " used " + attack + " on " + target + "! ";

            // Use a hash so a given command always results in the same outcome.
            var hash = back.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0); ;
            var super_effective = (hash % 7 === 0); // Use 3 so super effective is less frequent than not very effective

            if(super_effective) {
                back += "It's super effective :collision:";
            } else {
                back += "It's not very effective... :zzz:";
            }
            callback(back);
        },
        help : function(callback) {
          callback("Use an attack ! Must specify an attack and a target. Ex.: !use fire coveobot");
        }
    }
};
