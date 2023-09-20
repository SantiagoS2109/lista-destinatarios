// import { FormInput } from "./FormInput";
import { useContext, useState } from "react";
import { FormContext } from "../page";
import PropTypes from "prop-types";

import { FormInput } from "./FormInput";

export function ModalEdicion({ onClose }) {
  ModalEdicion.propTypes = {
    dataFilaSeleccionada: PropTypes.any,
    onClose: PropTypes.any,
  };

  // Definimos variables dadas por el context
  const { setData, filaSeleccionada, setFilaSeleccionada } =
    useContext(FormContext);

  // console.log(filaSeleccionada);
  const destinatariosId = filaSeleccionada.destinatariosId;

  const [grupoNombre, setGrupoNombre] = useState(filaSeleccionada.grupoNombre);
  const [prodDesc, setProdDesc] = useState(filaSeleccionada.prodDesc);
  const [grupoAdmin, setGrupoAdmin] = useState(filaSeleccionada.grupoAdmin);
  const [terTipoId, setTerTipoId] = useState(filaSeleccionada.terTipoId);
  const [terId, setTerId] = useState(filaSeleccionada.terId);
  const [terNombre, setTerNombre] = useState(filaSeleccionada.terNombre);
  const [contEmail, setContEmail] = useState(filaSeleccionada.contEmail);
  const [prodProducto, setProdProducto] = useState(
    filaSeleccionada.prodProducto
  );
  const [prodTipo, setProdTipo] = useState(filaSeleccionada.prodTipo);
  const [grupoSeleccion, setGrupoSeleccion] = useState(
    filaSeleccionada.grupoSeleccion
  );
  const [contObs, setContObs] = useState(filaSeleccionada.contObs);

  const handleChange = (setState) => (event) => {
    if (event.target.type === "checkbox") {
      const content = event.target.checked;
      console.log("content", content);
      setState(content);
    } else {
      const content = event.target.value;

      setState(content.toUpperCase());
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    const entradaEditada = {
      grupoNombre: grupoNombre,
      prodDesc: prodDesc,
      grupoAdmin: grupoAdmin,
      terTipoId: terTipoId,
      terId: terId,
      terNombre: terNombre,
      contEmail: contEmail,
      prodProducto: prodProducto,
      prodTipo: prodTipo,
      grupoSeleccion: grupoSeleccion,
      contObs: contObs,
    };

    handleAgregarEntrada(entradaEditada);

    //Limpiar los campos del formulario
    setGrupoNombre("");
    setProdDesc("");
    setGrupoAdmin("");
    setTerTipoId("");
    setTerId("");
    setTerNombre("");
    setContEmail("");
    setProdProducto("");
    setProdTipo("");
    setGrupoSeleccion(false);
    setContObs("");
    setFilaSeleccionada(null);
  }

  function handleAgregarEntrada(entradaEditada) {
    // Agregar nueva entrada al state
    setData((prevData) =>
      prevData.map((item) =>
        item.destinatariosId === filaSeleccionada.destinatariosId
          ? entradaEditada
          : item
      )
    );

    /////////////////////////////////////////////////
    // Envío nueva entrada de formulario a la API
    /////////////////////////////////////////////////

    async function sendData() {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append(
          "Authorization",
          "Basic dGVzdEBsaWZlcmF5LmNvbTpscG9ydGFs"
        );
        myHeaders.append("Cookie", "GUEST_LANGUAGE_ID=es_ES");

        const urlencoded = new URLSearchParams();
        urlencoded.append("destinatariosId", destinatariosId);
        urlencoded.append("grupoNombre", grupoNombre);
        console.log(grupoNombre);
        urlencoded.append("grupoAdmin", grupoAdmin);
        urlencoded.append("terTipoId", terTipoId);
        urlencoded.append("terId", terId);
        urlencoded.append("terNombre", terNombre);
        urlencoded.append("prodTipo", prodTipo);
        urlencoded.append("prodProducto", prodProducto);
        urlencoded.append("prodDesc", prodDesc);
        urlencoded.append("contEmail", contEmail);
        urlencoded.append("contObs", contObs);
        urlencoded.append("grupoSeleccion", grupoSeleccion);
        urlencoded.append("usuarioGenera", "LSUAREZC");

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        const response = await fetch(
          "http://localhost:8080/api/jsonws/fbec.destinatarios/update-destinatarios",
          requestOptions
        );

        // Verificar si la respuesta es exitosa (código 200)
        if (!response.ok) {
          throw new Error(`Error al realizar la solicitud: ${response.status}`);
        }

        // Convertir la respuesta a text
        const result = await response.text();

        console.log(result);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        window.location.reload();
      }
    }
    sendData();
  }

  return (
    <div className="absolute top-[13%] left-1/4">
      <div className=" bg-white w-[700px] h-max  rounded-md p-6 shadow-xl transition-all">
        <h1 className="text-center font-bold text-xl my-4">EDITAR REGISTRO</h1>
        <form id="newEntry" onSubmit={handleSubmit} action="nuevoRegistro">
          <div className="grid grid-cols-3 gap-x-8">
            <FormInput
              value={terNombre}
              setValue={setTerNombre}
              label={"Nombre"}
              type={"text"}
              onHandleChange={handleChange}
            />
            <FormInput
              value={terTipoId}
              setValue={setTerTipoId}
              label={"Tipo documento"}
              type={"select"}
              options={[
                { value: "", label: "" },
                { value: "CC", label: "Cedula" },
                { value: "TI", label: "Tarjeta de Identidad" },
                { value: "PS", label: "Pasaporte" },
              ]}
              onHandleChange={handleChange}
            />
            <FormInput
              value={terId}
              setValue={setTerId}
              label={"Documento"}
              type={"text"}
              onHandleChange={handleChange}
            />
            <FormInput
              value={contEmail}
              setValue={setContEmail}
              label={"Email"}
              type={"text"}
              onHandleChange={handleChange}
            />
          </div>
          <div className="h-[1px] bg-gray-300 rounded-md my-3"></div>
          <div className="grid grid-cols-3 gap-x-8">
            <FormInput
              value={grupoNombre}
              setValue={setGrupoNombre}
              label={"Nombre Campaña"}
              type={"text"}
              onHandleChange={handleChange}
            />
            <FormInput
              value={prodDesc}
              setValue={setProdDesc}
              label={"Descripción"}
              type={"text"}
              onHandleChange={handleChange}
            />
            <FormInput
              value={grupoAdmin}
              setValue={setGrupoAdmin}
              label={"Administrador grupo"}
              type={"text"}
              onHandleChange={handleChange}
            />
            <FormInput
              value={prodProducto}
              setValue={setProdProducto}
              label={"Producto"}
              type={"text"}
              onHandleChange={handleChange}
            />
            <FormInput
              value={prodTipo}
              setValue={setProdTipo}
              label={"Tipo"}
              type={"text"}
              onHandleChange={handleChange}
            />
            <FormInput
              value={contObs}
              setValue={setContObs}
              label={"Observación"}
              type={"text"}
              onHandleChange={handleChange}
            />
            <FormInput
              value={grupoSeleccion}
              setValue={setGrupoSeleccion}
              label={"Grupo Selección"}
              type={"checkbox"}
              onHandleChange={handleChange}
            />
          </div>

          <div className="flex gap-6 justify-end">
            <button
              className={`bg-white text-royal-blue p-2 rounded-md font-medium transition-all ${
                filaSeleccionada &&
                "bg-white text-royal-blue border border-royal-blue px-4 hover:bg-darker-royal-blue hover:text-white"
              }`}
              onClick={onClose}
            >
              Cerrar
            </button>

            <button
              className="bg-royal-blue text-white px-4 rounded-md transition-all duration-300 hover:bg-darker-royal-blue"
              type="submit"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
