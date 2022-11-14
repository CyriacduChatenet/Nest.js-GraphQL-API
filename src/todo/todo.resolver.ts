import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.schema';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/createTodo.dto';
import { UpdateTodoInput } from './dto/updateTodo.dto';

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }

  @Query(() => Todo, { name: 'todo' })
  getTodoById(@Args('_id', { type: () => String }) id: string) {
    return this.todoService.getTodoById(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.createTodo(createTodoInput);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput._id, updateTodoInput);
  }

  @Mutation(() => Todo)
  removeTodo(@Args('_id', { type: () => String }) id: string) {
    return this.todoService.remove(id);
  }
}
