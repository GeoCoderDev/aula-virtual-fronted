import { Role } from "@/interfaces/Role";

export const initializeUserSessionData = () => {
  class UserSessionData {
    static set role(value: Role) {
      localStorage.setItem("role", value);
    }

    static get role(): Role | undefined {
      const roleGetted = localStorage.getItem("role");
      if (!roleGetted) return undefined;
      return roleGetted as Role;
    }

    static set username(value: string) {
      localStorage.setItem("username", value);
    }

    static get username(): string | undefined {
      const usernameGetted = localStorage.getItem("username");
      if (!usernameGetted) return undefined;
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

  return { UserSessionData };
};
