
import { Role } from "@/interfaces/Role";
import { UserSessionDataErrors } from "../errors/UserSessionData";
import { CustomError } from "./CustomError";

export interface User {
  username: string;
  role: Role;
}

export class UserSessionData {
  static set role(value: Role) {
    localStorage.setItem("role", value);
  }

  static get role(): Role {
    const roleGetted = localStorage.getItem("role");
    if (!roleGetted)
      throw new CustomError(UserSessionDataErrors.NOT_ROLE_IN_LOCAL_STORAGE);
    return roleGetted as Role;
  }

  static set username(value: string) {
    localStorage.setItem("username", value);
  }

  static get username() {
    const usernameGetted = localStorage.getItem("username");
    if (!usernameGetted)
      throw new CustomError(
        UserSessionDataErrors.NOT_USERNAME_IN_LOCAL_STORAGE
      );
    return usernameGetted;
  }

  getObjectData(): User {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (!username)
      throw new CustomError(
        UserSessionDataErrors.NOT_USERNAME_IN_LOCAL_STORAGE
      );
    if (!role)
      throw new CustomError(UserSessionDataErrors.NOT_ROLE_IN_LOCAL_STORAGE);

    return { username, role: role as Role };
  }
}
