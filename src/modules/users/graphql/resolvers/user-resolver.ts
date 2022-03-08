import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../database/entities/User";

@Resolver()
export class UserResolver {
  
  @Query(() =>[User])
  async getUser(): Promise<User[]> {
    return await User.find();
  }

  @Mutation(() => User)
  async createUser(
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const user = Object.assign(new User(), {
      firstname,
      lastname,
      email,
      password,
    });
    await User.save(user);
    return user
  }

  


}
