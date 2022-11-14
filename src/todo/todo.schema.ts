import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Todo {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String, { description: 'Todo name' })
  name: string;
  @Prop()
  @Field(() => String, { description: 'Todo completed' })
  completed: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
