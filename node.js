let a = require('child_process').exec

a('echo hello',(err)=>{console.log(err)})