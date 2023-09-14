import PropTypes from "prop-types";
import { ElementoTabla } from "./ElementoTabla";
import { FormContext } from "../page";
import { useContext, useState } from "react";
import { Checkbox } from "@mui/material";

export function FilaTabla({ filaData }) {
  // const {
  //   grupoNombre,
  //   prodDesc,
  //   grupoAdmin,
  //   destinatariosId,
  //   terTipoId,
  //   terId,
  //   terNombre,
  //   contEmail,
  //   prodProducto,
  //   prodTipo,
  //   grupoSeleccion = 12,
  //   contObs,
  //   uuid,
  // } = filaData;

  const { onHandleEliminarEntrada, onHandleSeleccionFila } =
    useContext(FormContext);

  FilaTabla.propTypes = {
    filaData: PropTypes.any,
  };

  const rows = [];

  for (const key in filaData) {
    rows.push(filaData[key]);
  }

  console.log(rows);

  return (
    <tr className="hover:cursor-pointer">
      {rows.map((rowel, i) => (
        <ElementoTabla
          onClick={() => onHandleSeleccionFila(filaData)}
          key={i}
          index={i}
          descripcion={rowel}
        />
      ))}

      <td className="break-all">
        <button
          className="transition-all transition-300ms flex font-bold text-gray-400 border border-gray-300  items-center justify-center rounded-md w-8 h-6 bg-white hover:bg-red-500 hover:text-white"
          onClick={() => onHandleEliminarEntrada(filaData.destinatariosId)}
        >
          <span>X</span>
        </button>
      </td>
    </tr>
  );
}
