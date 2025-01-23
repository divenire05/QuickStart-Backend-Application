import express from 'express'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleWare from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 5003

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


// Middleware
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())


app.get('/', (req, res) => { // INCORRECT BUT ABOVE LINE SAVES
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


// Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleWare, todoRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})