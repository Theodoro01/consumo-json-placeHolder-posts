const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')

app.use(cors())

app.get('/', async (req, res) => {
    try{
        const { data } = await axios('https://jsonplaceholder.typicode.com/posts')
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }  
})

app.get('/:id', async (req, res) => {
    try{
        let valor
        const { id } = req.params

        const { data } = await axios('https://jsonplaceholder.typicode.com/posts') 

        await data.forEach((post) => {
            if(post.id == id){
                valor = post
            }
            if(id > 100){
                valor = {status: 404, message: 'Não encontrado!'}
            }
        })

        return res.status(200).json(valor)
    } catch (error) {
        return res.status(400).json({message: error})
    }  
})

app.listen(8080, () => {
    console.log("starting...")
})