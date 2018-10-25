#!/usr/bin/env node

console.log ('Trustroots admin shell: show threads marked as not in spirit');



// Ensuring that we're in the right directory
process.chdir(__dirname);
process.chdir('../../');

var _ = require('lodash'),
    async = require('async'),
    mongoose = require('mongoose'),
    path = require('path'),
    mongooseService = require(path.resolve('config/lib/mongoose'));

// TODO: turn off mongoose logging feedback

mongooseService.connect();
mongooseService.loadModels();
mongoose.set('debug', false);

var Message = mongoose.model('Message'),
    Thread = mongoose.model('Thread'),
    User = mongoose.model('User'),
    ReferenceThread = mongoose.model('ReferenceThread');

const htmlFormat = function(s) {
  // Quick'n'dirty way of ditching HTML
  return (s.replace(/\<.*?\>/gi, ''));
}

const findUser = async function (userId) {
  try {
    return await User.findOne({_id: userId});
  }
  catch(err) {
    console.log(err);
  }
}



var showMessage = function(id) {
  Message.find(
    {'_id': id},
    function(err, docs) {
      _.map(docs, async function(m) {
        var stuff = [await findUser(m.userFrom),
                     await findUser(m.userTo),
                     htmlFormat(m.content)
                    ];
        var promise = await Promise.all(stuff);
        console.log('from ' + promise[0].username + '\n',
                    'to ' + promise[1].username + '\n',
                    promise[2] + '\n\n');
      })
    }
  )
}


var showThread = async function(id) {
  Thread.find(
    {'_id': id},
    function(err, docs) {
      _.map(docs, function(t) {
        showMessage(t.message);
      })
    }
  )
}


// At some point it should disconnect. Not yet sure how to do this.
const disconnect = async function() {
  await mongooseService.disconnect();
}


ReferenceThread.find(
  {'reference': 'no'},
  async function(err, docs) {
    await _.map(_.slice(docs, 0, 10), async function(rt) {
      await showThread(rt.thread);
    });
  }
);