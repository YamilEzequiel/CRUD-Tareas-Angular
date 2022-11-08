import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormBuilder,  FormGroup, Validators  } from '@angular/forms';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks:any;
  spinner=false;
  taskForm: FormGroup;
  editTask=false;
  ButtonTask='Crear Tarea';
  postInit=false;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder) {
      this.taskForm = this.fb.group({
        id: [null],
        title: [null,[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        description: [null,[Validators.required,Validators.minLength(5),Validators.maxLength(300)]]
      });


    }

  ngOnInit(): void {
    this.getTasks();
  }

  async createTask(){
    this.spinner=true;

    if(this.editTask){
      await this.taskService.editTask(this.taskForm.value).subscribe({
        next: (v) => {
          this.taskForm.reset();
          this.getTasks();
          this.editTask=false;
        },
        error: (e) => console.error(e),
        complete: () => this.spinner=false
      })
    }else{
      await this.taskService.createTask(this.taskForm.value).subscribe({
        next: (v) => {
          this.taskForm.reset();
          this.getTasks();
        },
        error: (e) => console.error(e),
        complete: () => this.postInit=true
      })
    }

  }

  async deleteTask(id: number){
    this.postInit=false;
    this.taskService.deleteTask(id).subscribe({
      next: (v) => this.getTasks(),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  async getTasks(){
    this.taskService.getTasks().subscribe({
      next: (v) => this.tasks = v,
      error: (e) => console.error(e),
      complete: () => this.postInit=true
    });
  }

  editTasks(task: any){
    this.editTask=true;
    this.ButtonTask='Editar Tarea';
    this.taskForm.get('id')?.setValue(task.id);
    this.taskForm.get('title')?.setValue(task.title);
    this.taskForm.get('description')?.setValue(task.description);
  }

  public errorHandling = (control: string, error: string) => {
    return this.taskForm.controls[control].hasError(error);
  }

}
