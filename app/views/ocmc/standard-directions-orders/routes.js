module.exports = (router) => {

router.post('/ocmc/standard-directions-orders/1-track', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/standard-directions-orders/2a-Generate-Directions-Order')
  }
  else {
      res.redirect('/index')
  }
})

router.post('/ocmc/standard-directions-orders/2a-Generate-Directions-Order', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/standard-directions-orders/3-open-directions')
  }
  else {
      res.redirect('/ocmc/standard-directions-orders/1-track')
  }
})

router.post('/ocmc/standard-directions-orders/3-open-directions', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/standard-directions-orders/4-confirmation')
  }
  else {
      res.redirect('/ocmc/standard-directions-orders/2a-Generate-Directions-Order')
  }
})

};
