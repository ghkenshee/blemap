const Case = require('../models/case')

// Create Case
exports.createCase = async (req, res) => {
  const newCase = await Case.create(req.body)
  res.json(newCase)
}

// Get Case
exports.getCases = async (req, res) => {
  const { type, status, domain } = req.query

  const filter = {}
  if (type) filter.type = type
  if (status) filter.status = status
  if (domain) filter.domain = domain

  const cases = await Case.find(filter)
  res.json(cases)
}

// Get A Case
exports.getCaseById = async (req, res) => {
  const found = await Case.findById(req.params.id).populate('relatedCases')
  res.json(found)
}

// Link Case (E: Problem -> Solution)
exports.linkCases = async (req, res) => {
  const { targetCaseId } = req.body

  const source = await Case.findById(req.params.id)
  source.relatedCases.push(targetCaseId)
  await source.save()

  res.json(source)
}

// Update Case status
exports.updateCaseStatus = async (req, res) => {
  const { status } = req.body

  const updated = await Case.findByIdAndUpdate (
    req.params.id,
    { status }
    { new: true }
  )

  res.json(updated)
}
