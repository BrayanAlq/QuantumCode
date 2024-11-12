export const getLocalDay = () => {
  const fechaActual = new Date();
  const opciones = { year: "numeric", month: "2-digit", day: "2-digit" };
  const fecha = fechaActual
    .toLocaleDateString("es-ES", opciones)
    .split("/")
    .reverse()
    .join("-");

  return fecha;
};
