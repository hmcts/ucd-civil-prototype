module.exports = (router) => {

router.post('/ocmc/general-applications/application-submission/1-application', function(req, res) {
  if (req.body['submit-button'] === 'add') {

    count = req.session.data.applicationCount
    console.log("count start", count)

    req.session.data.application[count] = req.body['order']
    req.session.data.idApplication[count] = count

    req.session.data.applicationCount = count + 1
    console.log("applicationCount", req.session.data.applicationCount)

    res.redirect('/ocmc/general-applications/application-submission/1-application')
    }
  else if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/general-applications/application-submission/2-respondent-agreement')
  }
  else {
      res.redirect('/index')
  }
})

router.post('/ocmc/general-applications/application-submission/2-respondent-agreement', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/general-applications/application-submission/3-urgent')
  }
  else {
      res.redirect('/ocmc/general-applications/application-submission/1-application')
  }
})


//respondant agreed branching space



router.post('/ocmc/general-applications/application-submission/4-inform-other-party', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/general-applications/application-submission/5-enter-order')
  }
  else {
      res.redirect('/ocmc/general-applications/application-submission/5-enter-order')
  }
})

router.post('/ocmc/general-applications/application-submission/4a-inform-other-party', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/general-applications/application-submission/5-enter-order')
  }
  else {
      res.redirect('/ocmc/general-applications/application-submission/5-enter-order')
  }
})


router.post('/ocmc/general-applications/application-submission/5-enter-order', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/general-applications/application-submission/6-hearing-details')
  }
})

router.post('/ocmc\general-applications\application-submission\6-hearing-details', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc\general-applications\application-submissiony\7-')
  }
})

router.post('/ocmc\general-applications\application-submission\7-', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc\general-applications\application-submission\8-check-answers')
  }
})

router.post('/ocmc\general-applications\application-submission\8-check-answers', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc\general-applications\application-submission\9-confirmation')
  }
})



//application journey

router.post('/ocmc/general-applications/Responce-journey/1-respond', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/general-applications/Responce-journey/2-hearing-details')
  }
})

router.post('/ocmc/general-applications/Responce-journey/2-hearing-details', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/ocmc/general-applications/Responce-journey/3-check-your-answers')
  }
})

router.post('/ocmc/general-applications/Responce-journey/3-check-your-answers', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        res.redirect('/ocmc/general-applications/Responce-journey/4-confirmation')
    }
})

//judge journey

};
