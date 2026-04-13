const express = require('express')
const app = express()

app.use(express.json())

// Routes
app.use('/api/problems', require('./routes/problems'))
app.use('/api/solutions', require('./routes/solutions'))
app.use('/api/users'. require('./routes/users'))
app.use('/api/claims', require('./routes/claims'))

app.use(require('./middleware/errorHandler'))

app.listen(3000)
