

module.exports = function(app, db) {
    app.post('/reg', (req, res) => {
      const user = { name: req.body.ima, nick: req.body.nick };
      db.collection('users').insert(user, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send('Успех!!');
        }
      });
    });

    app.get('/question/:id', function(req, res) {
        var task = {question: [1, 2, 3, 4, 5, 6, 7, 8, 9]};
        res.render('question', {question: task.question[req.params.id]});
    });
    
    app.post('/question/:id', function(req, res) {
        if(req.body.answer == answer[req.params.id]){
            res.render('true');
        } else {
            res.render('false');
        }
    });
};