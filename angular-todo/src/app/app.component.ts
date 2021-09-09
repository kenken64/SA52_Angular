import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, FormBuilder, Validators, FormArray, FormGroupDirective} from '@angular/forms';

import { v4 as uuidv4 } from 'uuid';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-todo';
  form: FormGroup;
  tomorrow= new Date();
  todoValues: Todo[] = [];
  editTaskId: string = "";
  isEditMode: boolean  = false;
  priorities = ['Low', 'Medium', 'High'];
  gridColumns = 1;

  taskFormControl = new FormControl('', [Validators.required]);
  priorityFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder){
    this.tomorrow.setDate(this.tomorrow.getDate() +1);
    this.form = this.fb.group({
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl,
      todos: new FormArray([])
    });
  }

  ngOnInit(){

  }

  addTodo(){
    console.log("add todo");
    const todoWithChkbox : FormArray = this.form.get('todos') as FormArray;
    let taskId = uuidv4();

    let singleTodo = new Todo(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      taskId
    )
    this.todoValues.push(singleTodo);
    const todoGroup = this.fb.group({
      taskCheckBox: this.fb.control(false)
    });
    todoWithChkbox.push(todoGroup);
    this.taskFormControl.reset();
    this.priorityFormControl.reset();
    this.dueDateFormControl.reset();
    console.log(this.todoValues);
    localStorage.setItem(taskId, JSON.stringify(singleTodo));
  }

  updateEdit(formDirective? : FormGroupDirective){
    let singleTodo = new Todo(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      this.editTaskId
    )

    let updateRecordFound = this.todoValues.findIndex((i)=> i.taskId == this.editTaskId);
    this.todoValues[updateRecordFound] = singleTodo;
    localStorage.setItem(this.editTaskId, JSON.stringify(singleTodo));
    this.resetAll(formDirective);
  }


  resetAll(formDirective? : FormGroupDirective){
    this.isEditMode = false;
    this.form.reset();
    formDirective.resetForm();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null) ;
    });
    this.taskFormControl.setValidators([Validators.required]);
    this.taskFormControl.updateValueAndValidity();
    this.priorityFormControl.setValidators([Validators.required]);
    this.priorityFormControl.updateValueAndValidity();
    this.dueDateFormControl.setValidators([Validators.required]);
    this.dueDateFormControl.updateValueAndValidity();  
  }

  getTodosControls() {
    return this.form.get('todos') as FormArray;
  }

  updateStatus(index: number){

  }

  onDelete(index: number, taskId: string){
    const todoWithChkbox : FormArray = this.form.get('todos') as FormArray;
    todoWithChkbox.removeAt(index);
    let deleteRecordFound = this.todoValues.findIndex((i)=> i.taskId === taskId);
    if(index > -1){
      this.todoValues.splice(deleteRecordFound, 1);
    }
    localStorage.removeItem(taskId);
  }

  onEdit(taskId: string){
    this.editTaskId = taskId;
    this.isEditMode = true;
    let editTodoIdx = this.todoValues.findIndex((i)=> i.taskId  == taskId);
    this.form.patchValue(this.todoValues[editTodoIdx]);
  }

  cancelEdit(formDirective? : FormGroupDirective){
    
  }
}
