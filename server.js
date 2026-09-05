const app = require('./src/app')
const connectDB = require('./src/config/db')
const authRoutes = require('./src/routes/auth.routes')
const postRoutes = require('./src/routes/post.routes')
require("dotenv").config();

connectDB()

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        health: "OK"
    })
})

app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on http://localhost:3000");
})