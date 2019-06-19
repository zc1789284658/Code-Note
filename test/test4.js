
 var father = function() {
    this.age = 52;
    this.say = function() {
      console.log('hello i am '+ this.name +' and i am '+this.age + 'years old');
    }
  }

var child = function() {
    this.name = 'bill';
    father.call(this);
  }
   
  var man = new child();
  man.say();

