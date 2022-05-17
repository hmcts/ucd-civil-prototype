module.exports = (router) => {

  router.post('/damages/default-judgments/2-defendant', function(req, res) {
  	var errors = []
  	if (req.body['defendant'] === undefined) {
  	  errors.push({
  		text: 'Select a Defendant',
  		href: '#2-defendant'
  	  })
  	}

      if (req.body['submit-button'] === 'continue') {
          if (errors.length === 0) {
              res.redirect('/damages/default-judgments/3-request-judgment-statements')
          }
          else {
              res.render('.//damages/default-judgments/2-defendant', { errors: errors })
          }
      }
      else {
          res.redirect('/index')
      }
  })
  };
