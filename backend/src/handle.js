const Handlebars = require('handlebars');

let source = "<a href={{link}}>Hello</a>";
let template = Handlebars.compile(source);
let link = '/'
let data = { "link": link};
let result = template(data);

console.log(result);