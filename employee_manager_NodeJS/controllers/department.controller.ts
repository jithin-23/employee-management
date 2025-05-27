import { plainToInstance } from "class-transformer";
import DepartmentServices from "../services/department.services";
import { NextFunction, Request, Response, Router } from "express";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import { validate } from "class-validator";
import HttpException from "../exception/httpException";
import { LoggerService } from "../services/logger.service";
import { UpdateDepartmentDto } from "../dto/update-department.dto";

class DepartmentController {
    private logger=LoggerService.getInstance(DepartmentController.name)
    constructor(
        private departmentServices: DepartmentServices,
        private router: Router
    ) {
        router.post("/", this.createDepartment.bind(this));
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id", this.updateDepartment.bind(this));
        router.patch("/:id", this.updateDepartment.bind(this));
        router.delete("/:id", this.deleteDepartment.bind(this));
    }

    async createDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const createDepartmentDto = plainToInstance(
                CreateDepartmentDto,
                req.body
            );

            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const newDepartment =
                await this.departmentServices.createDepartment(
                    createDepartmentDto
                );
            res.status(201).send(newDepartment);
        } catch (err) {
            this.logger.error(err);
            next(err);
        }
    }

    async getAllDepartments(req: Request, res: Response) {
        const employees = await this.departmentServices.getAllDepartments();
        res.status(200).send(employees);
    }

    async getDepartmentById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const employee = await this.departmentServices.getDepartmentById(
                id
            );
            if (!employee) throw new HttpException(404, "Department not found");
            res.status(200).send(employee);
        } catch (err) {
            next(err);
        }
    }

    async updateDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const employee = await this.departmentServices.getDepartmentById(
                id
            );
            if (!employee) throw new HttpException(404, "Department not found");
            const updateDepartmentDto = plainToInstance(
                UpdateDepartmentDto,
                req.body
            );
            await this.departmentServices.updateDepartment(
                id,
                updateDepartmentDto
            );
            res.status(200).send();
        } catch (err) {
            next(err);
        }
    }

    async deleteDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const employee = await this.departmentServices.getDepartmentById(
                id
            );
            if (!employee) throw new HttpException(404, "Department not found");
            await this.departmentServices.deleteDepartment(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

export default DepartmentController;
