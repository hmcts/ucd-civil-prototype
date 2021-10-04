const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router

router.post('/default-judgments/2-defendant', function(req, res) {
    res.redirect('3-request-judgment-statements')
})

router.post('/default-judgments/3a-request-judgment-statements', function(req, res) {
    if (req.body['certify'] === undefined) {
        res.redirect('3a-request-judgment-statements')
    }
    else {
        res.redirect('4-payments-made')
    }
})

router.post('/default-judgments/4-payments-made', function(req, res) {
    if (req.body['payment-made'] === "no") {
        req.session.data.claimAmountPaid = 0
    }

    // number formatting to show eg 1200 as 1,200
    req.session.data.claimSubtotal = req.session.data.claimAmount + req.session.data.claimFee
    req.session.data.claimTotalOwed = req.session.data.claimSubtotal - req.session.data.claimAmountPaid

    req.session.data.displaySubtotal = req.session.data.claimSubtotal.toLocaleString('en', {useGrouping:true})
    req.session.data.displayAmount = req.session.data.claimAmount.toLocaleString('en', {useGrouping:true})
    req.session.data.displayFee = req.session.data.claimFee.toLocaleString('en', {useGrouping:true})
    req.session.data.displayAmountPaid = req.session.data.claimAmountPaid.toLocaleString('en', {useGrouping:true})
    req.session.data.displayTotalOwed = req.session.data.claimTotalOwed.toLocaleString('en', {useGrouping:true})
    res.redirect('5-judgment-amount')
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
  