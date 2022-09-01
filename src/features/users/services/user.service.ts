import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * find user unique
   *
   * @param id: string
   */
  async findById(id: string) {
    // const user = await this.userRepository.findByUsername()
    // return this.userResource(user);
  }

  /**
   * find user by username
   *
   * @param username string
   * @returns Promise<User>
   */
  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsername(username);
  }

  /**
   * find by id or fail
   *
   * @param id string
   * @returns Promise<User>
   */
  async findByIdOrFail(id: string): Promise<any> {
    // const user = await this.userRepository.findUnique({ id }, {});
    // if (!user)
    //   throw new NotFoundException(
    //     `User not found with id ${JSON.stringify(id)}`,
    //   );
    // return this.userResource(user);
  }

  /**
   * map user
   *
   * @param user User
   */
  public userResource({
    id,
    name,
    username,
    email,
    password,
    createdAt,
    updatedAt,
    roles,
  }: any) {
    return {
      id,
      name,
      username,
      email,
      createdAt,
      updatedAt,
      roles: roles && roles.map((role) => role.role),
    };
  }
}
