const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const path = require('path');
app.set('views', path.join(__dirname, 'views'));


app.listen(5000, () => {
  console.log('App is listening on port 5000');
});

app.get('/', (request, response) => {
    response.render('index', {
      subject: 'Dashboard',
      name: 'Uche',
      link: 'https://google.com'
    });
  });

 // courses page
app.get('/courses', (request, response) => {
  response.render('courses');
});

 // courses description page
 app.get('/courseDescription', (request, response) => {
  response.render('courseDescription');
});

 // course lessons page
 app.get('/courseLesson', (request, response) => {
  response.render('courseLesson');
});

 // webinars and events page
 app.get('/webinars', (request, response) => {
  response.render('webinars');
});

// webinars and events lessons page
app.get('/webinarLesson', (request, response) => {
  response.render('webinarLesson');
});

// resources page
app.get('/resources', (request, response) => {
  response.render('resources');
});

// resources documentspage
app.get('/resourcesDoc', (request, response) => {
  response.render('resourcesDoc');
});

// settings page
app.get('/settings', (request, response) => {
  response.render('settings', {
    fname: 'Emmanuella',
    lname: 'Etuk',
    email: 'emmanuella@gmail.com',
    phone: '+234 907 751 7713',
    occupation: 'Student',
    dob: '01 - May - 2005',
    password: '********',
    address: 'House 11, Finance Village, Mende, Maryland',
    state: 'Lagos',
    city: 'Lagos',
    addinfo: 'Near Finance Village Estate',
    accname: 'Uchenna Aguocha-Ohiagbaji',
    bankname: 'Zenith',
    accno: '1234567890'
  });
});

// calendar page
app.get('/calendar', (request, response) => {
  response.render('calendar');
});

// referrals page
app.get('/referrals', (request, response) => {
  response.render('referrals', {
    tearnings: 'USD 45',
    treferred: '1'
  });
});