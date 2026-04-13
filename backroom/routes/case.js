const express = require('express')
const router = express.Router()
const {
  createCase,
  getCases,
  getCaseById,
  linkCases,
  updateCaseStatus
} = require('../controllers/caseController')

router.post('/', createCase)
router.get('/:id', getCases)
router.get('/:id/link', getCaseById)
router.post('/:id/link', linkCases)
router.put('/:id/status', updateCaseStatus)

module.exports = router
