const express       = require('express');
const bodyParser    = require('body-parser');
const MongoClient   = require('mongodb').MongoClient;
const db            = require('./config/db'); 
const app           = express();
const port = 80;


var task =  [   
                {
                  question: 'В какой из пушкинских сказок нет царицы (царевны)?',
                  answer1: '«Сказка о попе и о его работнике Балде».',
                  answer2: '«Сказка о золотом петушке».',
                  trueAnswer: '«Сказка о попе и о его работнике Балде».'
                },
                {
                  question: 'Какая пушкинская сказка заканчивается словами: «Сказка ложь, да в ней намек, Добрым молодцам урок»?',
                  answer1: '«Сказка о рыбаке и рыбке».',
                  answer2: '«Сказка о золотом петушке».',
                  trueAnswer: '«Сказка о золотом петушке».'
                },
                {
                  question: 'В какой паре пушкинских сказок в каждой из них есть персонаж по имени Черномор?',
                  answer1: '«Сказка о царе Салтане» и «Сказка о золотом петушке».',
                  answer2: '«Руслан и Людмила» и «Сказка о царе Салтане».',
                  trueAnswer: '«Руслан и Людмила» и «Сказка о царе Салтане».'
                },
                {
                  question: '«Я там был, мёд, пиво пил, Да усы лишь обмочил». А на чьей свадьбе гулял поэт?',
                  answer1: 'Королевича Елисея.',
                  answer2: 'Князя храброго Руслана.',
                  trueAnswer: 'Королевича Елисея.'
                },
                {
                  question: 'В какого насекомого НЕ превращался князь Гвидон в пушкинской сказке?',
                  answer1: 'Муха.',
                  answer2: 'Пчела.',
                  trueAnswer: 'Пчела.'
                },
                {
                  question: 'Кто вел учёт чудесных орехов затейницы белки?',
                  answer1: 'Дьяк.',
                  answer2: 'Стража.',
                  trueAnswer: 'Дьяк.'
                }
            ];

var cabinetsTrue = [23, 5, 19, 23, 59, 12];
var cabinetsFalse = [63, 27, 'Актовому залу', 43, 48, 6];

var ObjectID = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.render('reg');
});

app.get('/test/:id', function(req, res) {
    res.render('test', {question: task[req.params.id].question, answer1: task[req.params.id].answer1,  answer2: task[req.params.id].answer2, number: parseInt(req.params.id + 1) });
});

MongoClient.connect(db.url, (err,database) => {
    if (err) return console.log(err);
    app.post('/', (req, res) => {
        const user = { name: req.body.name, _id: req.body.nickname, points: 0, tests: 12, testsum: 0 };
        database.collection('users').insert(user, (err, result) => {
          if (err) { 
            res.send('Пользователь с таким ником уже существует!'); 
          } else {
            res.redirect('/reglament');
          }
        });
      });

    app.post('/test/:id', function(req, res) {
      var id = req.params.id;
      if (req.body.formType == 1){

        var pointTakes = 1;
        var nick2 = req.body.nick;
        var player = database.collection('users').find();
        console.log(player);

        if (req.body.answer == task[req.params.id].trueAnswer){

          database.collection('users').updateOne( {_id: req.body.nick}, {$inc: {points: pointTakes}} );
          res.send(`Молодец! Беги за следующим заданием к кабинету ${cabinetsTrue[id]}`);

        } else {

          res.send(`Молодец! Беги за следующим заданием к кабинету ${cabinetsFalse[id]}`); 

        }

      } else {

        const user = { name: req.body.name, _id: req.body.nickname, points: 0};
        database.collection('users').insert(user, (err, result) => {

          if (err) { 
            res.send('Пользователь с таким ником уже существует!'); 
          } else {
            res.redirect('/test/' + id);
          }

        });

      }
    });

});

app.listen(port, () => {
    console.log('We are live on ' + port);
});