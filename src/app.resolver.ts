import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private appService: AppService) {}
  @Query(() => String)
  sayHello(): string {
    return this.appService.getHello();
  }
}
