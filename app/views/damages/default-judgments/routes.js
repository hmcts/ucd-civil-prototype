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

router.post('/sps/work-in-progress/how-to-get-tax-letters', (req, res) => {
	var errors = []
	if (req.body['howContacted'] === undefined) {
	  errors.push({
		text: 'Select how you want to get your tax letters',
		href: '#how-to-get-tax-letters'
	  })
	}
	if (errors.length === 0) {
	  if (req.body['howContacted'] === 'Online') {
		res.redirect('/sps/work-in-progress/add-email')
	  } 
    else {
        if (req.session.data.route === 'external') {
          res.redirect('/sps/work-in-progress/confirmation-post-alternative')
        }
        else {
        res.redirect('/sps/work-in-progress/confirmation-post')
      }
	  }
	} else {
	  res.render('.//sps/work-in-progress/how-toget-tax-letters', { errors: errors })
	}
  })


router.post('/damages/default-judgments/3-request-judgment-statements', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        if (req.body['certify'] === undefined) {
            res.redirect('/damages/default-judgments/3a-request-judgment-statements')
        }
        else {
            res.redirect('/damages/default-judgments/4-make-request-judgment')
        }
    }
    else {
        res.redirect('/damages/default-judgments/2-defendant')
    }        
    
})

router.post('/damages/default-judgments/4-make-request-judgment', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    req.session.data.decisionPreference = req.body['decision-preference']
    res.redirect('/damages/default-judgments/5-hearing-details')
}
else {
    res.redirect('/damages/default-judgments/3-request-judgment-statements')
}    
})

// for page 5-hearing-details
router.post('/damages/default-judgments/exclude-hearing-dates', function(req, res) {
  dateCount = req.session.data.dateCount
  req.session.data.dayFrom[dateCount] = req.body['date-from-day']
  req.session.data.monthFrom[dateCount] = req.body['date-from-month']
  req.session.data.yearFrom[dateCount] = req.body['date-from-year']
  req.session.data.dayTo[dateCount] = req.body['date-to-day']
  req.session.data.monthTo[dateCount] = req.body['date-to-month']
  req.session.data.yearTo[dateCount] = req.body['date-to-year']

  req.session.data.startDate[dateCount] = req.body['date-from-day'] + " " + req.session.data.shortMonthName[req.body['date-from-month']] + " " + req.body['date-from-year']
  req.session.data.endDate[dateCount] = req.body['date-to-day'] + " " + req.session.data.shortMonthName[req.body['date-to-month']] + " " + req.body['date-to-year']

  console.log("From", req.session.data.startDate[dateCount]);
  console.log("To", req.session.data.endtDate[dateCount]);
  console.log("dateCount", req.session.data.dateCount);

  req.session.data.dateCount = dateCount + 1
  console.log("dateCount", req.session.data.dateCount);

  res.redirect('/damages/default-judgments/5-hearing-details')
})

router.post('/damages/default-judgments/5-hearing-details', function(req, res) {
  req.session.data.unavailable = req.body['exclusion-dates']
  if (req.body['submit-button'] === 'add') {
    console.log("dateCount", req.session.data.dateCount)
    dateCount = req.session.data.dateCount
    req.session.data.dayFrom = req.body['date-from-day']
    req.session.data.monthFrom = req.body['date-from-month']
    req.session.data.yearFrom = req.body['date-from-year']
    req.session.data.dayTo = req.body['date-to-day']
    req.session.data.monthTo = req.body['date-to-month']
    req.session.data.yearTo = req.body['date-to-year']
  
    req.session.data.startDate = req.body['date-from-day'] + " " + req.session.data.shortMonthName[req.body['date-from-month']] + " " + req.body['date-from-year']
    req.session.data.endDate = req.body['date-to-day'] + " " + req.session.data.shortMonthName[req.body['date-to-month']] + " " + req.body['date-to-year']
  
    console.log("unavailable", req.session.data.unavailable)
  
    req.session.data.dateCount = dateCount + 1
    console.log("dateCount", req.session.data.dateCount)
  
    res.redirect('/damages/default-judgments/5-hearing-details#unavailable-dates')
    }
  else if (req.body['submit-button'] === 'continue') {
    res.redirect('/damages/default-judgments/6-check-your-answers')
  }
  else {
      res.redirect('/damages/default-judgments/4-make-request-judgment')
  }    
})

router.post('/damages/default-judgments/6-check-your-answers', function(req, res) {
  if (req.body['submit-button'] === 'continue') {
    res.redirect('/damages/default-judgments/7-confirmation')
  }
  else {
      res.redirect('/damages/default-judgments/5-hearing-details')
  }    
})

router.post('/damages/default-judgments/6c-repayment-plan', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        var month = req.body['start-month']
        req.session.data.paymentStartDate = req.body['start-day'] + " " + req.session.data.monthName[month] + " " + req.body['start-year']
        req.session.data.displayRegularPayment = Number(req.session.data.regularPayment).toLocaleString('en', {useGrouping:true})
    
        res.redirect('/damages/default-judgments/7-check-your-answers')
    }
    else {
        res.redirect('/damages/default-judgments/6-how-to-pay')
    }    
})

router.post('/damages/default-judgments/7-check-your-answers', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        res.redirect('/damages/default-judgments/8-confirmation')
    }
    else {
        if (req.session.data.displayRegularPayment === "By a repayment plan") {
            res.redirect('/damages/default-judgments/6c-repayment-plan')
        }
        else {
            res.redirect('/damages/default-judgments/6-how-to-pay')
        }
    }    
})













// Examples from HMRC
router.post('/sps/work-in-progress/how-to-verify', function(req, res) {
    console.log("route", req.session.data.route)
      if (req.body['verifyOrChange'] === 'verify') {
          res.redirect('/sps/work-in-progress/confirmation-email-sent')
      } else {
        if (req.session.data.route === 'external' || req.session.data.route === 'current-bouncing' || req.session.data.route === 'current-unverified') { 
          res.redirect('/sps/work-in-progress/how-to-verify')
        }
        else {
        req.session.data.route = "settings"
        res.redirect('/sps/work-in-progress/change-email')
      }
      }
  })
  
  // Error messages on how-to-get-tax-letters
  router.post('/sps/work-in-progress/how-to-get-tax-letters', (req, res) => {
      var errors = []
      if (req.body['howContacted'] === undefined) {
        errors.push({
          text: 'Select how you want to get your tax letters',
          href: '#how-to-get-tax-letters'
        })
      }
      if (errors.length === 0) {
        if (req.body['howContacted'] === 'Online') {
          res.redirect('/sps/work-in-progress/add-email')
        } 
      else {
          if (req.session.data.route === 'external') {
            res.redirect('/sps/work-in-progress/confirmation-post-alternative')
          }
          else {
          res.redirect('/sps/work-in-progress/confirmation-post')
        }
        }
      } else {
        res.render('.//sps/work-in-progress/how-toget-tax-letters', { errors: errors })
      }
})
};