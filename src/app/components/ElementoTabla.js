import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";
import { useState } from "react";
// import { FormContext } from "./App";

export function ElementoTabla({ descripcion, index, onClick }) {
  ElementoTabla.propTypes = {
    descripcion: PropTypes.any,
    index: PropTypes.any,
    onClick: PropTypes.any,
  };

  // const { onHandleCheck, grupoSeleccion, onSetGrupoSeleccion } =
  //   useContext(FormContext);

  // descripcion = descripcion.toUpperCase();
  const checked = descripcion;

  const [grupoSeleccion, setGrupoSeleccion] = useState(checked);

  function onHandleCheck() {
    setGrupoSeleccion(!grupoSeleccion);
  }

  // Filtro para no mostrar uuid
  if (descripcion?.length > 30) return;

  if (index === 10) {
    return (
      <td onClick={onClick} className="break-all">
        <Checkbox
          checked={checked}
          onChange={onHandleCheck}
          inputProps={{ "aria-label": "controlled" }}
        />
      </td>
    );
  }

  return (
    <td onClick={onClick} className="border border-solid border-[#ddd] p-2">
      {descripcion}
    </td>
  );
}
