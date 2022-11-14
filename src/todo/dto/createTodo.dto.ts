import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'name of todo' })
  name: string;
  @Field(() => Boolean, { description: 'completed status of todo' })
  completed: boolean;
}
