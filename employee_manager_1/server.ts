import express from 'express'
import employeeRouter from './employee_router';
import { loggerMiddleware } from './loggerMiddleware';
import { processTimeMiddleware } from './processTimeMiddleware';
const server = express()

server.use(loggerMiddleware);
server.use(processTimeMiddleware);
server.use(express.json());

server.listen(3001, () => {
    console.log("server started on 3001");
})

server.get('/', (req,res) => {
    res.status(200);
    res.send("Hello User");
})

// server.post("/employees",(req,res) => {
//     res.status(201).send("Employee Created");
// })

// server.get("/employees",(req,res) => {
//     res.status(200).send("Employee Fetched");
// })

// server.get("/employees/:empId",(req,res) => {
//     const empId = req.params.empId;
//     res.status(200).send("Employee id: "+empId);
// })

// server.put("/employees/:empId",(req,res) => {
//     const empId = req.params.empId;
//     res.status(200).send("Updated by PUT Employee id: "+empId);
// })

// server.patch("/employees/:empId",(req,res) => {
//     const empId = req.params.empId;
//     res.status(200).send("Updated by Patch Employee id: "+empId);
// })

// server.delete("/employees/:empId",(req,res) => {
//     const empId = req.params.empId;
//     res.status(200).send("Deleted Employee id: "+empId);
// })

server.use('/employees',employeeRouter);
