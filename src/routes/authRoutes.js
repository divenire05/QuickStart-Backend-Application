import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req, res) => {
    const {username, password} = req.body

    const hashedPassword = bcrypt.hashSync(password, 8)
    console.log(hashedPassword)

    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        const defaultTodo = `Hello :) Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`) // WHY THE QUESTION MARK?
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

    res.sendStatus(201)
})

router.post('/login', (req, res) => {

})


export default router