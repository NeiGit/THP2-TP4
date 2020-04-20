
import express from 'express'
import Student from '../models/student.js'


const router = express.Router()

router
    .route('/student/:id')
    .get((req, res) => {
        Student.findOne({dni: req.params.id}, function(err,obj) { 
            if (obj)
                res.status(200).json(obj) 
            else
                res.status(404).send("Student doesnt exist")    
        })
    })
    .put((req, res) => {
        Student.findOne({dni: req.params.id}, function(err,obj) { 
            if (obj) {
                const {dni, name, lastName, age} = req.body
                obj.name = name
                obj.lastName = lastName
                obj.age = age
                res.status(200).json(obj) 
            } else
                res.status(404).send("Student doesnt exist")    
        })
    })       
    .delete((req, res) => {
        Student.findOne({dni: req.params.id}, function (err, obj) {
            if (!obj) {
                res.status(404).send("Student doesnt exist");
            } else {
                Student.findByIdAndDelete(obj.id, err => {
                    if (err)
                        res.status(500).send("Error")
                    else
                        res.status(200).send("Successful deletion");
                })
            }
        })
    })

router
    .route('/student/')
    .post((req, res) => {
        Student.findOne({dni: req.body.dni}, (err, obj) => {
            if (obj) {
                res.status(403).send("There is already an student with dni " + req.body.dni)
            } else {
                const {dni, name, lastName, age} = req.body
                const student = new Student({dni, name, lastName, age})
                student.save()
                    .then(() => res.json(student))
                    .catch(err => res.status(400).send('ERROR: ' + err))    
            }
        })
    })


router
    .route("/students")
    .get((req, res) => {
        Student.find({}, (err, array) => {
            if(err)
                res.status(500).send("Server error")
            else    
                res.status(200).json(array)
        })
    })
router
    .route("/students/:age")
    .get((req, res) => {
        Student.find({age: { $gt: req.params.age}}, (err, array) => {
            if(err)
                res.status(500).send("Server error")
            else    
                res.status(200).json(array)
        })
    }) 

export default router