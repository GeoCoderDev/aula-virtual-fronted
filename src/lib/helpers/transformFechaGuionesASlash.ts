export function transformFechaGuionesASlash(fecha: string) {
  // Dividir la fecha en año, mes y día
  var partesFecha = fecha.split("-");
  var año = partesFecha[0];
  var mes = partesFecha[1];
  var dia = partesFecha[2];

  // Formatear la fecha al formato deseado
  var fechaFormateada = dia + "/" + mes + "/" + año;

  return fechaFormateada;
}
