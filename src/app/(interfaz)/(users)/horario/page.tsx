
const Horario = ({
  student,
  teacher,
}: {
  student: React.ReactNode;
  teacher: React.ReactNode;
}) => {
  return (
    <>
      <div>Horario</div>
      {student}
      {teacher}
    </>
  );
};

export default Horario;
