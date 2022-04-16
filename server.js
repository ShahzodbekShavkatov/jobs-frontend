import express from 'express'
import path from 'path'

const PORT = process.env.PORT || 3002

const app  = express()

app.use(express.static(path.join(process.cwd(), 'src',  'public') ))

app.get('/' , (req,res) => res.sendFile(path.join(process.cwd(), 'src', 'views' , 'index.html')))
app.get('/login' , (req,res) => res.sendFile(path.join(process.cwd(), 'src', 'views' , 'login.html')))
app.get('/register' , (req,res) => res.sendFile(path.join(process.cwd(), 'src', 'views' , 'register.html')))
app.get('/admin' , (req,res) => res.sendFile(path.join(process.cwd(), 'src', 'views' , 'admin.html')))
app.get('/about' , (req,res) => res.sendFile(path.join(process.cwd(), 'src', 'views' , 'about.html')))

app.listen(PORT, () => console.log('Client server is running on http://localhost:' + PORT))
