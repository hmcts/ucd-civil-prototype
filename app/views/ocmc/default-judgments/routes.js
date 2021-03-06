module.exports = (router) => {

router.post('/ocmc/default-judgments/2-defendant', function(req, res) {
	var errors = []
	if (req.body['defendant'] === undefined) {
	  errors.push({
		text: 'Select a Defendant',
		href: '#2-defendant'
	  })
	}

    if (req.body['submit-button'] === 'continue') {
        if (errors.length === 0) {
            res.redirect('/ocmc/default-judgments/3-request-judgment-statements')
        }
        else {
            res.render('.//ocmc/default-judgments/2-defendant', { errors: errors })
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


router.post('/ocmc/default-judgments/3-request-judgment-statements', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        if (req.body['certify'] === undefined) {
            res.redirect('/ocmc/default-judgments/3a-request-judgment-statements')
        }
        else {
            res.redirect('/ocmc/default-judgments/4-payments-made')
        }
    }
    else {
        res.redirect('/ocmc/default-judgments/2-defendant')
    }

})

router.post('/ocmc/default-judgments/4-payments-made', function(req, res) {
    if (req.body['payment-made'] === "No") {
        req.session.data.claimAmountPaid = 0
    }
    console.log("Defendant", req.session.data.defendant)


    // number formatting to show eg 1200 as 1,200
    req.session.data.claimSubtotal = req.session.data.claimAmount + req.session.data.claimFee
    req.session.data.claimTotalOwed = req.session.data.claimSubtotal - req.session.data.claimAmountPaid

    req.session.data.displaySubtotal = Number(req.session.data.claimSubtotal).toLocaleString('en', {useGrouping:true})
    req.session.data.displayAmount = Number(req.session.data.claimAmount).toLocaleString('en', {useGrouping:true})
    req.session.data.displayFee = Number(req.session.data.claimFee).toLocaleString('en', {useGrouping:true})
    req.session.data.displayAmountPaid = Number(req.session.data.claimAmountPaid).toLocaleString('en', {useGrouping:true})
    req.session.data.displayTotalOwed = Number(req.session.data.claimTotalOwed).toLocaleString('en', {useGrouping:true})

    if (req.body['submit-button'] === 'continue') {
        res.redirect('/ocmc/default-judgments/4e-fixed-cost')
    }
    else {
        res.redirect('/ocmc/default-judgments/3-request-judgment-statements')
    }
})

router.post('/ocmc/default-judgments/4e-fixed-cost', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        res.redirect('/ocmc/default-judgments/5-judgment-amount')
    }
    else {
        res.redirect('/ocmc/default-judgments/4-payments-made')
    }
})

router.post('/ocmc/default-judgments/5-judgment-amount', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        res.redirect('/ocmc/default-judgments/6-how-to-pay')
    }
    else {
        res.redirect('/ocmc/default-judgments/4-payments-made')
    }
})

router.post('/ocmc/default-judgments/6-how-to-pay', function(req, res) {

    var month = req.body['paid-by-month']
    req.session.data.paidByDate = req.body['paid-by-day'] + " " + req.session.data.monthName[month] + " " + req.body['paid-by-year']

    if (req.body['submit-button'] === 'continue') {
        req.session.data.howToPay = req.body['how-to-pay']
        if (req.body['how-to-pay'] === 'Immediately') {
            res.redirect('/ocmc/default-judgments/7-check-your-answers')
        }
        else if (req.body['how-to-pay'] === 'By a set date'){
            res.redirect('/ocmc/default-judgments/7-check-your-answers')
        }
        else {
            res.redirect('/ocmc/default-judgments/6c-repayment-plan')
        }
    }
    else {
        res.redirect('/ocmc/default-judgments/5-judgment-amount')
    }
})

router.post('/ocmc/default-judgments/6c-repayment-plan', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        var month = req.body['start-month']
        req.session.data.paymentStartDate = req.body['start-day'] + " " + req.session.data.monthName[month] + " " + req.body['start-year']
        req.session.data.displayRegularPayment = Number(req.session.data.regularPayment).toLocaleString('en', {useGrouping:true})

        res.redirect('/ocmc/default-judgments/7-check-your-answers')
    }
    else {
        res.redirect('/ocmc/default-judgments/6-how-to-pay')
    }
})

router.post('/ocmc/default-judgments/7-check-your-answers', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
        res.redirect('/ocmc/default-judgments/8-confirmation')
    }
    else {
        if (req.session.data.displayRegularPayment === "By a repayment plan") {
            res.redirect('/ocmc/default-judgments/6c-repayment-plan')
        }
        else {
            res.redirect('/ocmc/default-judgments/6-how-to-pay')
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






  // default-judgments/judge-journey
  router.post('/ocmc/default-judgments/judge-journey/initial-decision', function (req, res) {

    var applicationDecision = req.session.data['application-decision']

     if (applicationDecision == "disposal-hearing"){
       res.redirect('./disposal-hearing')
         } else {
       res.redirect('./trial')
     }

  })





};
