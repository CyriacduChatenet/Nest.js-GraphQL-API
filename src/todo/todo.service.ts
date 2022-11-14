import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';
import { CreateTodoInput } from './dto/createTodo.dto';
import { UpdateTodoInput } from './dto/updateTodo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  getAllTodos(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async getTodoById(id: string) {
    const todo = await this.todoModel.findOne({ _id: id }).exec();
    if (!todo) {
      throw new NotFoundException(`todo ${id} not found`);
    }
    return todo;
  }

  createTodo(createTodoInput: CreateTodoInput) {
    const todo = new this.todoModel(createTodoInput);
    return todo.save();
  }

  async update(id: string, updateTodoInput: UpdateTodoInput) {
    const existingUser = await this.todoModel
      .findOneAndUpdate({ _id: id }, { $set: updateTodoInput }, { new: true })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const todo = await this.todoModel.findOne({ _id: id });
    return todo.remove();
  }
}
