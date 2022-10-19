const conexion = require('../database/db')

exports.ConsultQA = async (req, res) => {
    try {
        conexion.query('SELECT * FROM qa', async (err, results) =>{
            res.send(results)
        })
    } catch (error) {
        console.log(error)
    }
        
}

exports.CreateQA = async (req, res) => {
    try {
        const question = req.body.question
        const answer = req.body.answer
        const data = {
            question,
            answer
        }
        conexion.query('INSERT INTO qa SET ?', data, (err, conn) =>{
            if(err) {console.log(err)}
            res.send('Q&A create successfully')
        })
    } catch (error) {
        console.log(error)
    }
        
}

exports.EditQA = async (req, res) => {
    try {
        conexion.query('UPDATE qa set ? WHERE id = ?', [req.body, req.params.id], (err, conn)=>{
            if(err) return res.send(err)

            res.send('Q&A edit successfully')
        })
    } catch (error) {
        console.log(error)
    }
        
}

exports.DeleteQA = async (req, res) => {
    try {
        conexion.query('DELETE FROM qa WHERE id = ?', [req.params.id], (err, conn)=>{
            if(err) return res.send(err)

            res.send('Q&A delete successfully')
        })
    } catch (error) {
        console.log(error)
    }
        
}
