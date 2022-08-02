module.exports = (router) => {

  router.post('/ocmc/hearing-notice/what-hearing-notice-answer', function (req, res) {

    // Make a variable and give it the value from 'how-many-balls'
    var whathearingnoticeAnswer = req.session.data['notice-create']
  
    // Check whether the variable matches a condition
    if (whathearingnoticeAnswer == "notice-hearing") {
      // Send user to next page
      res.redirect('listing-relisting')
    }
    if (whathearingnoticeAnswer == "notice-trial") {
      // Send user to next page
      res.redirect('listing-relisting')
    }
    if (whathearingnoticeAnswer == "other") {
      // Send user to next page
      res.redirect('listing-relisting')
    }
    if (whathearingnoticeAnswer == "notice-hearing-app") {
      // Send user to next page
      res.redirect('general-application')
    }
    else {
      // Send user to ineligible page
      res.redirect('8-confirmation')
    }
  
  })
  
};
