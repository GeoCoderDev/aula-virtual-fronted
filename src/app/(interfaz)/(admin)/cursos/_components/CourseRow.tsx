"use client";
import DeleteCourse from "@/components/shared/modals/Cursos/DeleteCourse";
import EditCourse from "@/components/shared/modals/Cursos/EditCourse";
import { Course } from "@/interfaces/Course";
import { useState } from "react";

const CourseRow = ({
  course,
  handleUpdateCourse,
  handleDeleteCourse,
}: {
  course: Course;
  handleUpdateCourse: (
    id: number,
    newNombre: string,
    newGrados: string
  ) => void;
  handleDeleteCourse: (id: number) => void;
}) => {
  const [viewEditCourseModal, setViewEditCourseModal] = useState(false);
  const [viewDeleteCourseModal, setViewDeleteCourseModal] = useState(false);
  return (
    <>
      <tr className="">
        <td className="p-3 text-center">{course.Id_Curso}</td>
        <td className="p-3 text-center">{course.Nombre_Curso}</td>
        <td className="p-3 text-center">{course.Grados}</td>
        <td className="flex justify-evenly">
          <td className=" p-3 h-full flex items-center justify-center">
            <div className=" w-full flex items-center justify-center gap-x-4 h-full">
              <button
                className="edition-button"
                onClick={() => {
                  setViewEditCourseModal(true);
                }}
              >
                Editar
              </button>
              <button
                className="text-white font-medium py-1 w-[4.6rem] rounded-lg bg-rojo-orange"
                onClick={() => {
                  setViewDeleteCourseModal(true);
                }}
              >
                Eliminar
              </button>
            </div>
          </td>
        </td>
      </tr>

      {viewEditCourseModal && (
        <EditCourse
          handleUpdateCourse={handleUpdateCourse}
          course={course}
          eliminateModal={() => {
            setViewEditCourseModal(false);
          }}
        />
      )}
      {viewDeleteCourseModal && (
        <DeleteCourse
          handleDeleteCourse={handleDeleteCourse}
          course={course}
          setDeleteModalIsShowing={setViewDeleteCourseModal}
        />
      )}
    </>
  );
};

export default CourseRow;
