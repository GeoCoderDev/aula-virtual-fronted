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

  static get role(): Role | undefined {
    const roleGetted = localStorage.getItem("role");
    if (!roleGetted) return undefined;
    // throw new CustomError(UserSessionDataErrors.NOT_ROLE_IN_LOCAL_STORAGE);
    return roleGetted as Role;
  }

  static set username(value: string) {
    localStorage.setItem("username", value);
  }

  static get username(): string | undefined {
    const usernameGetted = localStorage.getItem("username");
    if (!usernameGetted) return undefined;
    // throw new CustomError(
    //   UserSessionDataErrors.NOT_USERNAME_IN_LOCAL_STORAGE
    // );
    return usernameGetted;
  }

  static set urlImage(value: string | undefined) {
    localStorage.setItem("urlImage", value ?? "");
  }

  static get urlImage(): string | undefined | null {
    const urlImageGetted = localStorage.getItem("urlImage");
    return urlImageGetted || undefined;
  }


}
