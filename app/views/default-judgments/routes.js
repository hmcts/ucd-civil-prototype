module.exports = (router) => {

router.post('/default-judgments/2-defendant', function(req, res) {
	var errors = []
	if (req.body['defendant'] === undefined) {
	  errors.push({
		text: 'Select a defendant - Sam, copy, please',
		href: '#2-defendant'
	  })
	}

    if (req.body['submit-button'] === 'continue') {
        if (errors.length === 0) {
            res.redirect('/default-judgments/3-request-judgment-statements')
        }
        else {
            res.render('.//default-judgments/2-defendant', { errors: errors })  
        }
    }
    else {
        res.redirect('../')
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


router.post('/default-judgments/3-request-judgment-statements', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        if (req.body['certify'] === undefined) {
            res.redirect('/default-judgments/3a-request-judgment-statements')
        }
        else {
            res.redirect('/default-judgments/4-payments-made')
        }
    }
    else {
        res.redirect('/default-judgments/2-defendant')
    }        
    
})

router.post('/default-judgments/4-payments-made', function(req, res) {
    if (req.body['payment-made'] === "No") {
        req.session.data.claimAmountPaid = 0
    }
    console.log("Defendant", req.session.data.defendant)

    // number formatting to show eg 1200 as 1,200
    req.session.data.claimSubtotal = req.session.data.claimAmount + req.session.data.claimFee
    req.session.data.claimTotalOwed = req.session.data.claimSubtotal - req.session.data.claimAmountPaid

    req.session.data.displaySubtotal = req.session.data.claimSubtotal.toLocaleString('en', {useGrouping:true})
    req.session.data.displayAmount = req.session.data.claimAmount.toLocaleString('en', {useGrouping:true})
    req.session.data.displayFee = req.session.data.claimFee.toLocaleString('en', {useGrouping:true})
    req.session.data.displayAmountPaid = req.session.data.claimAmountPaid.toLocaleString('en', {useGrouping:true})
    req.session.data.displayTotalOwed = req.session.data.claimTotalOwed.toLocaleString('en', {useGrouping:true})

    if (req.body['submit-button'] === 'continue') {
        res.redirect('/default-judgments/5-judgment-amount')
    }
    else {
        res.redirect('/default-judgments/3-request-judgment-statements')
    }    
})

router.post('/default-judgments/5-judgment-amount', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        res.redirect('/default-judgments/6-how-to-pay')
    }
    else {
        res.redirect('/default-judgments/4-payments-made')
    }    
})

router.post('/default-judgments/6-how-to-pay', function(req, res) {

    var month = req.body['paid-by-month']
    req.session.data.paidByDate = req.body['paid-by-day'] + " " + req.session.data.monthName[month] + " " + req.body['paid-by-year']

    if (req.body['submit-button'] === 'continue') {
        if (req.body['how-to-pay'] === 'Immediately') {
            res.redirect('/default-judgments/7-check-your-answers')
        }
        else if (req.body['how-to-pay'] === 'By a set date'){
            res.redirect('/default-judgments/7-check-your-answers')
        }
        else {
            res.redirect('/default-judgments/6c-repayment-plan')
        }
    }
    else {
        res.redirect('/default-judgments/5-judgment-amount')
    }        
})

router.post('/default-judgments/6c-repayment-plan', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        var month = req.body['start-month']
        req.session.data.paymentStartDate = req.body['start-day'] + " " + req.session.data.monthName[month] + " " + req.body['start-year']
        req.session.data.displayRegularPayment = req.session.data.regularPayment.toLocaleString('en', {useGrouping:true})
    
        res.redirect('/default-judgments/7-check-your-answers')
    }
    else {
        res.redirect('/default-judgments/6-how-to-pay')
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