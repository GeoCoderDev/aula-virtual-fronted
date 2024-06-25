const CrearCuestionario = ({
  params: { Tema_ID },
}: {
  params: { Tema_ID: number };
}) => {
  return <div>Crear Cuestionario - {Tema_ID}</div>;
};

export default CrearCuestionario;
