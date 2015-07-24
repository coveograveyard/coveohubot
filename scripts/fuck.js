// Description:
//   hubot does tell people to fuck off
//
// Commands:
//   !fuck <operation>|<field1>|<field2>...
//   !fuck list
//
// Author:
//   jfallaire

var request = require('request');
var _ = require('underscore');

function getFuckOperation(query, callback) {
    request.get('http://foaas.com/operations', function(err, res, body) {
        var op = query[0];
        var fields = _.rest(query);
        var operations = JSON.parse(body);
        var chosenFuckOp = operations.filter(function(operation) {
            return operation.name.toLowerCase().indexOf(query[0].toLowerCase()) >= 0;
        })[0];

        callback(0, chosenFuckOp);
    });
}

module.exports = function(robot) {
    robot.hear(/^!fuck (.*)/i, function(msg) {
        var q = msg.match[1].split('|');

        //Here we do want telling to fuck off!
        if(q[0] !== 'list'){
            var params = _.rest(q);
            getFuckOperation(q, function (err, operation){
                var fuckCall = operation.url;
                _.each(operation.fields, function(field, i){
                    fuckCall = fuckCall.replace(':' + field.field, (params[i] ? params[i] : (field.field === 'from' ? msg.message.user.name : 'a retarded')));
                });
                request.get({
                    url: 'http://foaas.com' + fuckCall,
                    headers: {
                        'Accept':'application/json'
                    }
                }, function(err, res, body) {
                    var data = JSON.parse(body);
                    msg.send(data.message + ' ' + data.subtitle);
                });
            });

        } else {
            request.get('http://foaas.com/operations', function(err, res, body) {
                var operations = JSON.parse(body);
                msg.send(operations.map(function(operation) {
                    var reformattedFields = operation.fields.map(function(field){
                        return ':' + field.field;
                    });
                    return operation.name + '|' + reformattedFields.join('|');
                }).join('\n'));
            });

        }
    });
};
