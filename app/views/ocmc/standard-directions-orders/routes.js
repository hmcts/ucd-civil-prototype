module.exports = (router) => {

router.post('/ocmc/standard-directions-orders/1-track', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/standard-directions-orders/2a-Generate-Directions-Order')
  }
  else {
      res.redirect('/index')
  }
})

router.post('/ocmc/standard-directions-orders/1-enter-judgment', function(req, res) {
  if (req.body['damages'] === 'true') {
    res.redirect('/ocmc/standard-directions-orders/allocate-small-claims')
  }
  else {
      res.redirect('/ocmc/standard-directions-orders/2-track-selection')
  }
})

//fast track

router.post('/ocmc/standard-directions-orders/2-track-selection', function(req, res) {
  if (req.body['claims-track'] === 'Small-claims-track') {
    res.redirect('/ocmc/standard-directions-orders/order-details-small-claims')
  }
  else {
      res.redirect('/ocmc/standard-directions-orders/order-details-fast-track')
  }
})

//small claims

router.post('/ocmc/standard-directions-orders/Allocate-small-claims', function(req, res) {
  if (req.body['small-track'] === 'true') {
    res.redirect('/ocmc/standard-directions-orders/order-details-small-claims')
  }
  else {
      res.redirect('/ocmc/standard-directions-orders/order-type')
  }
})


router.post('/ocmc/standard-directions-orders/order-type', function(req, res) {
  if (req.body['Disposal'] === 'true') {
    res.redirect('/ocmc/standard-directions-orders/disposal-hearing-SDO')
  }
  else {
      res.redirect('/ocmc/standard-directions-orders/order-details-fast-track')
  }
})

router.post('/ocmc/standard-directions-orders/disposal-hearing-SDO', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/standard-directions-orders/3-open-directions')
  }
  else {
      res.redirect('/ocmc/standard-directions-orders/order-type')
  }
})

//Directions

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
