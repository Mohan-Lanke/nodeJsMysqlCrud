const db = require("../config/db")

const getStudents = async(req,res) =>{
    try{
        const data = await db.query(" select * from students")
        if(!data){
            return res.status(404).send({
                success: false,
                message:"No records found"
            })
        }
        else{
            res.status(200).send({
                success: true,
                message: "All Student Records",
                length: data[0].length,
                data: data[0]
            })
        }
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "getting error",
            error
        })
    }
}

//get student by id
const getStudentById = async( req,res) =>{
    try{

        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "invalid id",
            
            })
        }
        const data = await db.query(` select * from students where id=?`, [studentId])
        if(!data){
            return res.status(404).send({
                success: false,
                message: "no record found",
            
            })
        }
        res.status(200).send({
                success: true,
                message: "get student details",
                data: data[0]
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in id",
            error
        })
    }
}

//create student
const createStudent = async(req,res)=>{
    try{

        const { name, roll_no, medium, fees} = req.body;
        if(!name || !roll_no || !medium  || !fees){
            res.status(500).send({
                success: false,
                message: "All fields are mandatory",
                error
            })
        }
        const data = db.query(`insert into students (name, roll_no, medium, fees) values (?,?,?,?)`, [name, roll_no, medium, fees])
        if(!data){
           return res.status(404).send({
                success: false,
                message: "error in insert",
                
            })
        }

        res.status(201).send({
            success: true,
            message: "new created",
            
        })
    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "getting error",
            error
        })
    }
}


//update details
const updataDetails = async(req,res) =>{
    try{

        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "id not found"
            })
        }

        const {name, roll_no, fees, medium} = req.body;
        const data = await db.query(`update students set name = ?, roll_no = ?, fees = ?, medium = ? where id = ?`, [name,roll_no,fees,medium,studentId])
        if(!data){
            return res.status(404).send({
                success: false,
                message:"no data"
            })
        }
        res.status(200).send({
            success:true,
            message:'details updated'
        })

    } catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in id",
            error
        })
    }
}

//delete record
const deleteRecord = async(req,res) =>{
    try{
        const studentId = req.params.id;
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "id not found"
            })
        }

        await db.query(`delete from students where id=?`, [studentId])
        res.status(200).send({
            success: true,
            message: "deleted",
        })
    }
    catch{
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in id",
            error
        })
    }
}


module.exports = {getStudents, getStudentById,createStudent,updataDetails,deleteRecord}