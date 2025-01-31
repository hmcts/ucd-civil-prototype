//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


// ROUTES FOR CLAIMANT - GEN APP A

// route for the what do you want screen

router.post('/contact-the-court', function(request, response) {

    var contact = request.session.data['whatDoYouWant']
    if (contact == "01-request"){
        response.redirect("claimant/a/001-01-gen-app-start")
    } else if (contact == "02-get-update"){
        response.redirect("claimant/a/002-00-get-update")
    } else if (contact == "03-send-update"){
        response.redirect("claimant/a/003-00-send-update")
    } else if (contact == "04-documents"){
        response.redirect("claimant/a/004-00-send-documents")
    } else if (contact == "05-problems"){
        response.redirect("claimant/a/005-00-solve-problem")
    } else if (contact == "06-hearing-details"){
        response.redirect("claimant/a/006-00-update-hearing")
    } else if (contact == "07-fee"){
        response.redirect("claimant/a/007-00-pay-fee")
    } else if (contact == "08-correspondence"){
        response.redirect("claimant/a/0000-raise-query")
    } else if (contact == "09-followup"){
        response.redirect("claimant/a/009-follow-up")
    } else if (contact == "10-something-else"){
        response.redirect("claimant/a/0000-raise-query")
    } else {
        response.redirect("/")
    }
})


// route for gen app selection screen

router.post('/make-gen-app', function(request, response) {

    var contact = request.session.data['selectApp']
    if (contact == "application-4"){
        response.redirect("claimant/a/001-02-change-start")
    } else if (contact == "application-5"){
        response.redirect("/020-get-update")
    } else {
        response.redirect("/ineligible-test")
    }
})

// route for inform other party 

router.post('/parties-agreed', function(request, response) {

    var contact = request.session.data['partiesAgreed']
    if (contact == "Yes"){
        response.redirect("claimant/a/001-03-fee-info")
    } else {
        response.redirect("claimant/a/001-02-extra")
    }
})




// ROUTES FOR CLAIMANT - GEN APP B

// route for the what do you want screen

router.post('/contact-the-court-b', function(request, response) {

    var contact = request.session.data['whatDoYouWant']
    if (contact == "01-request"){
        response.redirect("claimant/b/001-01-gen-app-start")
    } else {
        response.redirect("/ineligible-test")
    }
})


// route for gen app selection screen

router.post('/make-gen-app-b', function(request, response) {

    var contact = request.session.data['selectApp']
    if (contact == "application-4"){
        response.redirect("claimant/b/001-02-change-start")
    } else if (contact == "application-5"){
        response.redirect("claimant/b/001-02-change-start")
    } else {
        response.redirect("/ineligible-test")
    }
})

// route for inform other party 

router.post('/parties-agreed-b', function(request, response) {

    var contact = request.session.data['partiesAgreed']
    if (contact == "Yes"){
        response.redirect("claimant/b/001-03-fee-info")
    } else {
        response.redirect("claimant/b/001-02-extra")
    }
})





// route a raise query 


router.post('/get-update-from-court', function(request, response) {

    var contact = request.session.data['whatUpdateDoYouWant']
    if (contact == "01-get-update-after"){
        response.redirect("claimant/a/002-01-get-update-after")
    } else if (contact == "02-get-general-update"){
        response.redirect("claimant/a/002-02-get-general-update")
    } else if (contact == "03-understand-claim-not-paid"){
        response.redirect("claimant/a/002-03-understand-claim-not-paid")
    } else if (contact == "04-understand-judgment-not-paid"){
        response.redirect("claimant/a/002-04-understand-judgment-not-paid")
    }
})


router.post('/send-update-to-court', function(request, response) {

    var contact = request.session.data['whatUpdateDoYouWantToSend']
    if (contact == "01-about-paid"){
        response.redirect("claimant/a/003-01-update")
    } else if (contact == "02-settle"){
        response.redirect("claimant/a/003-02-settle")
    } else if (contact == "03-amend"){
        response.redirect("claimant/a/003-03-amend")
    }   
})


router.post('/update-hearing', function(request, response) {

    var contact = request.session.data['updateSend']
    if (contact == "01-change-date"){
        response.redirect("claimant/a/006-01-change-date")
    } else if (contact == "02-change-details"){
        response.redirect("claimant/a/006-02-change-details")
    } else if (contact == "03-ask-help"){
        response.redirect("claimant/a/006-03-ask-help")
    }   
})


router.post('/send-documents', function(request, response) {

    var contact = request.session.data['sendDocs']
    if (contact == "01-enf"){
        response.redirect("claimant/a/004-01-enforcement")
    } else if (contact == "02-claim"){
        response.redirect("claimant/a/004-02-claim")
    } else if (contact == "03-not"){
        response.redirect("claimant/a/004-03-evidence")
    }   
})





