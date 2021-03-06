module.exports = (router) => {

const SUBMISSION_URI = '/ocmc/general-applications/application-submission'
const VIEWS_PATH = 'ocmc/general-applications/application-submission'

router.post(`${SUBMISSION_URI}/1-application`, function(req, res) {
  if (req.body['submit-button'] === 'add') {

    count = req.session.data.applicationCount
    console.log("count start", count)

    req.session.data.application[count] = req.body['order']
    req.session.data.idApplication[count] = count

    req.session.data.applicationCount = count + 1
    console.log("applicationCount", req.session.data.applicationCount)

    res.redirect(`${SUBMISSION_URI}/1-application`)
    }
  else if (req.body['submit-button'] === 'continue') {
    res.redirect(`${SUBMISSION_URI}/2-respondent-agreement`)
  }
  else {
      res.redirect('/index')
  }
})

router.post(`${SUBMISSION_URI}/2-respondent-agreement`, function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect(`${SUBMISSION_URI}/3-urgent`)
  }
  else {
      res.redirect(`${SUBMISSION_URI}/1-application`)
  }
})


//respondant agreed branching space
router.post(`${SUBMISSION_URI}/3-urgent`, function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    if(req.session.data['agreement'] && req.session.data['agreement'] == 'no')
      res.redirect(`${SUBMISSION_URI}/4-inform-other-party`)
    else
      res.redirect(`${SUBMISSION_URI}/5-enter-order`)
  }
  else {
      res.redirect(`${SUBMISSION_URI}/1-application`)
  }
})



router.post(`${SUBMISSION_URI}/4-inform-other-party`, function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect(`${SUBMISSION_URI}/5-enter-order`)
  }
  else {
      res.redirect(`${SUBMISSION_URI}/5-enter-order`)
  }
})

router.post(`${SUBMISSION_URI}/4a-inform-other-party`, function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect(`${SUBMISSION_URI}/5-enter-order`)
  }
  else {
      res.redirect(`${SUBMISSION_URI}/5a-enter-order`)
  }
})



router.get(`${SUBMISSION_URI}/5-enter-order`, function(req, res) {
  var obj = { showUpload: true, showSoT: true }
  if (req.session.data['agreement'] == 'yes'){
    obj.showUpload = false;
    obj.showSoT = false;
  }

  res.render(`${VIEWS_PATH}/5-enter-order`, obj);
})

router.post(`${SUBMISSION_URI}/5-enter-order`, function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect(`${SUBMISSION_URI}/6-hearing-details`)
  }
})

router.post(`${SUBMISSION_URI}/5a-enter-order`, function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect(`${SUBMISSION_URI}/6-hearing-details`)
  }
})

router.post(`${SUBMISSION_URI}/6-hearing-details`, function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect(`${SUBMISSION_URI}/7-account-number`)
  }
})

router.post(`${SUBMISSION_URI}/7-account-number`, function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect(`${SUBMISSION_URI}/8-check-answers`)
  }
})

router.post(`${SUBMISSION_URI}/8-check-answers`, function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect(`${SUBMISSION_URI}/9-confirmation`)
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
    res.redirect('/ocmc/general-applications/Responce-journey/3-check-answers')
  }
})

router.post('/ocmc/general-applications/Responce-journey/3-check-answers', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        res.redirect('/ocmc/general-applications/Responce-journey/4-confirmation')
    }
})

//judge journey




router.post('/ocmc/general-applications/judge-journey/initial-decision', function (req, res) {

  var applicationDecision = req.session.data['application-decision']

   if (applicationDecision == "make-order"){
     res.redirect('./make-order')
    } else if (applicationDecision == "request-more-information") {
      res.redirect('./request-more-information')
    } else if (applicationDecision == "list-hearing") {
      res.redirect('./hearing-details')
       } else {
     res.redirect('./written-representation')
   }

})







router.post('/ocmc/general-applications/judge-journey/request-more-information', function (req, res) {

  var requestMoreInformation = req.session.data['request-more-information']

   if (requestMoreInformation == "more-needed"){
     res.redirect('./notification-sent-request-more-info')
    } else {
     res.redirect('./notification-sent-request-response')
   }

})











router.post('/ocmc/general-applications/judge-journey/draw-general-order', function (req, res) {

  var drawGeneralOrder = req.session.data['draw-general-order']

   if (drawGeneralOrder == "draw-general-order"){
     res.redirect('./draw-general-order')
    } else {
     res.redirect('./draw-general-order')
   }

})



router.post('/ocmc/general-applications/judge-journey/draw-general-order-representation', function (req, res) {

  var drawGeneralOrderRepresentation = req.session.data['draw-general-order-representation']

   if (drawGeneralOrderRepresentation == "draw-general-order-representation"){
     res.redirect('./draw-general-order-representation')
    } else {
     res.redirect('./draw-general-order-representation')
   }

})





router.post('/ocmc/general-applications/judge-journey/make-order', function (req, res) {

  var makeOrder = req.session.data['make-order']

   if (makeOrder == "make-order"){
     res.redirect('./preview')
    } else {
     res.redirect('./preview')
   }

})




router.post('/ocmc/general-applications/judge-journey/preview', function (req, res) {

  var previewOrder = req.session.data['preview-order']

   if (previewOrder == "preview"){
     res.redirect('./confirmation-order-issued')
    } else {
     res.redirect('./confirmation-order-issued')
   }

})



};

