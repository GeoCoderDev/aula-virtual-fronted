"use client";
import useToken from "@/app/hooks/useToken";
import CourseCard from "@/components/shared/Courses/CourseCard";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const MisCursosHome = ({
  student,
  teacher,
}: {
  student: React.ReactNode;
  teacher: React.ReactNode;
}) => {
  const { fetchAPIWithToken } = useToken();

  return (
    <>
      {/* {student}
      {teacher} */}
      <div>MisCursosHome
        <CourseCard />
      </div>
    </> 
  );
};

export default MisCursosHome;
