import express from "express";
import Employee from "./employee.entity";
import dataSource from "./data-source";
import { Entity, getRepository } from "typeorm";

const employeeRouter = express.Router();

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const employees = await employeeRepository.find();
  res.status(200).send(employees);
});

employeeRouter.get("/:id", async (req, res) => {
  const empId = Number(req.params.id);
  const employeeRepository = dataSource.getRepository(Employee);
  const curr_employee = await employeeRepository.findOneBy({ id: empId });

  res.status(200).send(curr_employee);
});

employeeRouter.post("/", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const newEmployee = new Employee();
  newEmployee.name = req.body.name;
  newEmployee.email = req.body.email;
  await employeeRepository.insert(newEmployee);
  res.status(201).send(newEmployee);
});

employeeRouter.put("/:id", async (req, res) => {
  const empId = Number(req.params.id);
  const employeeRepository = dataSource.getRepository(Employee);
  await employeeRepository.update(empId, {
    name: req.body.name,
    email: req.body.email,
  });

  res.status(200).send(await employeeRepository.findOneBy({ id: empId }));
});

employeeRouter.patch("/:id", async (req, res) => {
  const empId = Number(req.params.id);
  const employeeRepository = dataSource.getRepository(Employee);
  await employeeRepository.update(empId, {
    name: req.body.name,
  });

  res.status(200).send(await employeeRepository.findOneBy({ id: empId }));
});

employeeRouter.delete("/:id", async (req, res) => {
  const empId = Number(req.params.id);
  const employeeRepository = dataSource.getRepository(Employee);
  await employeeRepository.delete(empId);
  res.status(204).send();
});

export default employeeRouter;

// let count = 2;
// let employees: Employee[] = [
//   {
//     id: 1,
//     email: "employee1@gmail.com",
//     name: "Employee1",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     email: "employee2@gmail.com",
//     name: "Employee2",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

// employeeRouter.get("/", (req, res) => {
//   res.status(200).send(employees);
// });

// employeeRouter.get("/:id", (req, res) => {
//   const empId = Number(req.params["id"]);
//   const employee = employees.find((emp) => emp.id === empId);
//   if (!employee) {
//     res.status(404).send("Employee not found");
//     return;
//   }
//   res.status(200).send(employee);
// });

// employeeRouter.post("/", (req, res) => {
//   console.log(req.body);
//   const newEmployee = new Employee();
//   newEmployee.email = req.body.email;
//   newEmployee.name = req.body.name;
//   newEmployee.createdAt = new Date();
//   newEmployee.updatedAt = new Date();
//   newEmployee.id = ++count;
//   employees.push(newEmployee);
//   res.status(200).send(newEmployee);
// });

// employeeRouter.delete("/:id", (req, res) => {
//   const employeeIdxToDelete = employees.findIndex(
//     (emp) => emp.id === Number(req.params["id"]),
//   );
//   employees.splice(employeeIdxToDelete, 1);
//   res.status(200).send();
// });

// employeeRouter.put("/:id", (req, res) => {
//   const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
//   employee.email = req.body.email;
//   employee.name = req.body.name;
//   employee.updatedAt = new Date();
//   console.log("update employees");
//   res.status(200).send(employee);
// });


