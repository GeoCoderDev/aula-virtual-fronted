import { Children, ReactNode } from "react";

const EditarPerfil = ({
  children,
  admin_superadmin,
  student_teacher,
}: {
  children: ReactNode;
  admin_superadmin: ReactNode;
  student_teacher: ReactNode;
}) => {
  return (
    <div>
      {children}
      {admin_superadmin}
      {student_teacher}
    </div>
  );
};

export default EditarPerfil;
