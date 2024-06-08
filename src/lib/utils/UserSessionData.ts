import { Role } from "@/interfaces/Role";
import { UserSessionDataErrors } from "../errors/UserSessionData";
import { CustomError } from "./CustomError";

export interface UserData {
  username: string;
  role: Role;
  urlImage?: string | null;
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

  static set urlImage(value: string | undefined) {
    localStorage.setItem("urlImage", value ?? "");
  }

  static get urlImage(): string | undefined | null {
    const urlImageGetted = localStorage.getItem("urlImage");
    return urlImageGetted || undefined;
  }

  getObjectData(): UserData {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const urlImage = localStorage.getItem("urlImage");

    if (!username)
      throw new CustomError(
        UserSessionDataErrors.NOT_USERNAME_IN_LOCAL_STORAGE
      );
    if (!role)
      throw new CustomError(UserSessionDataErrors.NOT_ROLE_IN_LOCAL_STORAGE);

    return { username, role: role as Role, urlImage };
  }
}
