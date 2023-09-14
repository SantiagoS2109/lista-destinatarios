export function HeaderTabla({ titulo }) {
  // No mostrar el encabezado para el uuid
  if (titulo === "uuid") return;

  return <th className={`border border-solid border-[#ddd] p-2`}>{titulo}</th>;
}
