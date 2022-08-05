module.exports = (router) => {

  router.post('/ocmc/hearing-notice/what-hearing-notice-answer', function (req, res) {

    // Make a variable and give it the value from 'how-many-balls'
    var whathearingnoticeAnswer = req.session.data['notice-create']
  
    // Check whether the variable matches a condition
    if (whathearingnoticeAnswer == "Notice of hearing") {
      // Send user to next page
      res.redirect('listing-relisting')
    }
    if (whathearingnoticeAnswer == "Notice of trial date") {
      // Send user to next page
      res.redirect('listing-relisting')
    }
    if (whathearingnoticeAnswer == "Other") {
      // Send user to next page
      res.redirect('listing-relisting')
    }
    if (whathearingnoticeAnswer == "Notice of hearing of application") {
      // Send user to next page
      res.redirect('general-application')
    }
    else {
      // Send user to ineligible page
      res.redirect('listing-relisting')
    }
  
  })
  
};
