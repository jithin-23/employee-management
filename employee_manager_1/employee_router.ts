import { Router } from "express";
const employeeRouter = Router();
import Employee from "./Employee";
export default employeeRouter;

let employees: Employee[] = [
  {
    id: 1,
    name: "Jithin",
    email: "jithin@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Kiran",
    email: "kiran@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

employeeRouter.get("/", (req, res) => {
  res.status(200).send(employees);
  //   console.log("Employees endpoint executed succesfully")
});

employeeRouter.get("/:empId", (req, res) => {
  const empId = Number(req.params.empId);
  const employee = employees.find((emp) => (emp.id === empId));
  res.status(200).send(employee);
  //   console.log("GET employee-by-id endpoint executed succesfully")
});

employeeRouter.post("/", (req, res) => {
  const employee = new Employee();
  employee.name = req.body.name;
  employee.email = req.body.email;
  employee.id = employees.length + 1;
  employee.createdAt = new Date();
  employee.updatedAt = new Date();
  employees.push(employee);

  res.status(201).send(employee);
  // console.log("POST employee endpoint executed succesfully")
});

employeeRouter.put("/:empId", (req, res) => {
  const empId = Number(req.params.empId);
  const employee = employees.find((emp) => (emp.id === empId));
  console.log(employee);
  employee.email = req.body.email;
  employee.name = req.body.name;
  employee.updatedAt = new Date();
  res.status(200).send(employee);
  //   console.log("PUT employee-by-id endpoint executed succesfully")
});

employeeRouter.patch("/:empId", (req, res) => {
  const empId = Number(req.params.empId);
  const employee = employees.find((emp) => (emp.id === empId));
  employee.email = req.body.email;
  employee.updatedAt = new Date();
  res.status(200).send(employee);
  //   console.log("PATCH employee-by-id endpoint executed succesfully")
});

employeeRouter.delete("/:empId", (req, res) => {
  const employeeIdxToDelete = employees.findIndex(
    (emp) => emp.id === Number(req.params["id"])
  );
  employees.splice(employeeIdxToDelete, 1);
  res.status(200).send();
});
