import express from "express";
import DepartmentRepository from "../repositories/department.repository";
import dataSource from "../db/data-source";
import Department from "../entities/department.entity";
import DepartmentServices from "../services/department.services";
import DepartmentController from "../controllers/department.controller";

const departmentRouter = express.Router();

const departmentRepository = new DepartmentRepository(dataSource.getRepository(Department));
const departmentServices = new DepartmentServices(departmentRepository);
const departmentController = new DepartmentController(departmentServices, departmentRouter);

export default departmentRouter;