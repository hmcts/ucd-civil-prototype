module.exports = (router) => {

// router.post('/ocmc/general-applications/application-submission/1-application', function(req, res) {
//   if (req.body['submit-button'] === 'continue') {
//     res.redirect('/ocmc/general-applications/application-submission/2-something')
//   }
//   else {
//       res.redirect('/index')
//   }    
// })

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
    res.redirect('/ocmc/general-applications/application-submission/2-something')
  }
  else {
      res.redirect('/index')
  }    
})


};