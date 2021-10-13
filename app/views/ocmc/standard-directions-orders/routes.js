module.exports = (router) => {

router.post('/ocmc/standard-directions-orders/1-track', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/standard-directions-orders/2-something')
  }
  else {
      res.redirect('/index')
  }    
})


};