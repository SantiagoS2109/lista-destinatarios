"use client";

import { CircularProgress } from "@mui/material";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { FilaTabla } from "./components/FilaTabla";
import { HeaderTabla } from "./components/HeaderTabla";
import { ModalEdicion } from "./components/ModalEdición";
import { ModalRegistro } from "./components/ModalRegistro";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TABLA_HEADERS = [
  "Nombre campaña",
  "Descripción",
  "Administrador grupo",
  "ID",
  "Tipo documento",
  "Documento",
  "Nombre",
  "Email",
  "Producto",
  "Tipo",
  "Grupo Seleccion",
  "Observación",
  "uuid",
];

const encabezados = [
  { key: "grupoNombre", titulo: "Nombre campaña", size: "100px" },
  { key: "prodDesc", titulo: "Descripción", size: "100px" },
  { key: "grupoAdmin", titulo: "Administrador grupo", size: "100px" },
  { key: "destinatariosId", titulo: "ID", size: "50px" },
  { key: "terTipoId", titulo: "Tipo documento", size: "50px" },
  { key: "terId", titulo: "Documento", size: "100px" },
  { key: "terNombre", titulo: "Nombre", size: "100px" },
  { key: "contEmail", titulo: "Email", size: "200px" },
  { key: "prodProducto", titulo: "Producto", size: "100px" },
  { key: "prodTipo", titulo: "Tipo", size: "100px" },
  { key: "grupoSeleccion", titulo: "Grupo Seleccion", size: "100px" },
  { key: "contObs", titulo: "Observación", size: "100px" },
  { key: "uuid", titulo: "uuid", size: "" },
];

export const FormContext = createContext();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataFiltrada, setDataFiltrada] = useState([]);

  const [filtroActivo, setFiltroActivo] = useState(false);

  // Filtra la información según la campaña seleccionada
  function handleSeleccionFiltro(e) {
    setFiltroActivo(true);

    const filtro = e.target.value;
    if (filtro === "todos") setFiltroActivo(false);

    setDataFiltrada(data.filter((element) => element.grupoNombre === filtro));
  }

  // Carga la información en el primer montaje
  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append(
          "Authorization",
          "Basic dGVzdEBsaWZlcmF5LmNvbTpscG9ydGFs"
        );
        myHeaders.append(
          "Cookie",
          "GUEST_LANGUAGE_ID=es_ES; JSESSIONID=2870FBCAB711F1BB6114D94DA24C7180"
        );

        const urlencoded = new URLSearchParams();
        urlencoded.append("groupId", "20119");

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        // Realizar la solicitud GET utilizando la función fetch
        const res = await fetch(
          "http://localhost:8080/api/jsonws/fbec.destinatarios/get-destinatarios-by-group-id",
          requestOptions
        );

        // Verificar si la respuesta es exitosa (código 200)
        if (!res.ok) {
          throw new Error(`Error al realizar la solicitud: ${res.status}`);
        }

        // Convertir la respuesta a JSON
        const data = await res.json();

        // Manipular los datos recibidos
        // console.log("Datos recibidos:", data);
        setData(data);
      } catch (err) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Crea un array con los encabezados mostrados en la tabla
  const propiedadesTabla = [
    ...new Set(encabezados.map((elemento) => elemento.key)),
  ];

  // Filtra solo las propiedades que serán mostradas en la tabla para cada objeto
  function filtrarPropiedadesTabla(dataArray) {
    // Filtrar las propiedades del objeto
    const propiedadesFiltradas = dataArray.map((elemento) =>
      Object.keys(elemento)
        .filter((propiedad) => propiedadesTabla.includes(propiedad))
        .reduce((obj, propiedad) => {
          obj[propiedad] = elemento[propiedad];
          return obj;
        }, {})
    );

    function reorganizarProps(data) {
      return data.map((item) => ({
        grupoNombre: item.grupoNombre,
        prodDesc: item.prodDesc,
        grupoAdmin: item.grupoAdmin,
        destinatariosId: item.destinatariosId,
        terTipoId: item.terTipoId,
        terId: item.terId,
        terNombre: item.terNombre,
        contEmail: item.contEmail,
        prodProducto: item.prodProducto,
        prodTipo: item.prodTipo,
        grupoSeleccion:
          item.grupoSeleccion === "SI"
            ? true
            : item.grupoSeleccion === "true"
            ? true
            : false,
        contObs: item.contObs,
        uuid: item.uuid,
      }));
    }

    const propsReorganizados = reorganizarProps(propiedadesFiltradas);

    return propsReorganizados;
  }

  const opcionesFiltro = [...new Set(data.map((item) => item.grupoNombre))];

  const [showNewEntry, setShowNewEntry] = useState(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  function handleSeleccionFila(fila) {
    setFilaSeleccionada(fila);
  }

  function handleShowNewEntry() {
    setShowNewEntry((cur) => !cur);
  }

  function handleEliminarEntrada(id) {
    const dataActualizada = data.filter(
      (entrada) => entrada.destinatariosId !== id
    );

    setData(dataActualizada);

    async function sendData() {
      try {
        // Eliminar en API
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append(
          "Authorization",
          "Basic dGVzdEBsaWZlcmF5LmNvbTpscG9ydGFs"
        );
        myHeaders.append(
          "Cookie",
          "GUEST_LANGUAGE_ID=es_ES; JSESSIONID=C896BE5A0190A8CE0DC66B71CFFA95B3"
        );

        const urlencoded = new URLSearchParams();
        urlencoded.append("destinatariosId", id);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        const response = await fetch(
          "http://localhost:8080/api/jsonws/fbec.destinatarios/delete-destinatario",
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
      }
    }

    sendData();
  }

  return (
    <FormContext.Provider
      value={{
        onHandleShowNewEntry: handleShowNewEntry,
        onHandleEliminarEntrada: handleEliminarEntrada,
        onHandleSeleccionFila: handleSeleccionFila,
        setFilaSeleccionada,
        filtrarPropiedadesTabla,
        setData,
        showNewEntry,
        filaSeleccionada,
        data,
        dataFiltrada,
        filtroActivo,
      }}
    >
      <Layout>
        {isLoading && (
          <div className="mt-24">
            <CircularProgress />
          </div>
        )}
        {!isLoading && (
          <>
            <FiltroCampaña
              opcionesFiltro={opcionesFiltro}
              onHandleSeleccionFiltro={handleSeleccionFiltro}
            />
            <Tabla />

            {showNewEntry && <ModalRegistro />}

            {filaSeleccionada && (
              <ModalEdicion onClose={() => setFilaSeleccionada(null)} />
            )}

            <button
              className="bg-royal-blue text-white p-2 rounded-md font-medium mb-12"
              onClick={handleShowNewEntry}
            >
              {!showNewEntry && "Nueva Entrada"}
            </button>
          </>
        )}
      </Layout>
    </FormContext.Provider>
  );
}

function Layout({ children }) {
  return (
    <div className={`flex justify-center static h-screen`}>
      <div className="flex flex-col items-center justify-start w-[1200px]">
        {children}
      </div>
    </div>
  );
}

function FiltroCampaña({ opcionesFiltro, onHandleSeleccionFiltro }) {
  return (
    <div className="flex self-start gap-4 mb-4 mt-12">
      <label htmlFor="filtroCampaña">Filtrar por campaña:</label>
      <select
        className="bg-gray-200 rounded-md p-1 mb-2 focus:outline-1 outline-gray-500 border border-gray-300"
        id="filtroCampaña"
        onChange={(e) => onHandleSeleccionFiltro(e)}
      >
        <option value="todos">Todos</option>
        {opcionesFiltro.map((opcion) => (
          <OpcionFiltro value={opcion} opcion={opcion} key={opcion} />
        ))}
      </select>
    </div>
  );
}

function OpcionFiltro({ value, opcion }) {
  OpcionFiltro.propTypes = {
    value: PropTypes.any,
    opcion: PropTypes.any,
  };

  return <option value={value}>{opcion}</option>;
}

function Tabla() {
  const { filtroActivo, filtrarPropiedadesTabla, data, dataFiltrada } =
    useContext(FormContext);

  const itemsPorPagina = 15;
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = Math.ceil(data.length / itemsPorPagina);

  const startIndex = (paginaActual - 1) * itemsPorPagina;
  // console.log(totalPaginas);
  const endIndex = startIndex + itemsPorPagina;
  const dataActual = data.slice(startIndex, endIndex);

  function handleCambioPagina(numeroPagina) {
    setPaginaActual(numeroPagina);
  }

  function handlePaginaAnterior(paginaActual) {
    if (paginaActual === 1) return;

    const nuevaPagina = paginaActual - 1;
    setPaginaActual(nuevaPagina);
  }

  function handlePaginaSiguiente(paginaActual) {
    if (paginaActual === totalPaginas) return;

    const nuevaPagina = paginaActual + 1;
    setPaginaActual(nuevaPagina);
  }

  // const handleChangeRowsPerPage = (event) => {
  //   setItemsPorPagina(parseInt(event.target.value, 10));
  //   setPaginaActual(0);
  // };

  return (
    <>
      <table
        id="clientes"
        className="font-sans text-xs border-collapse w-full mb-4"
      >
        <thead>
          <tr>
            {TABLA_HEADERS.map((encabezado) => (
              <HeaderTabla key={encabezado} titulo={encabezado} />
            ))}
          </tr>
        </thead>
        <tbody>
          {!filtroActivo &&
            filtrarPropiedadesTabla(dataActual).map((el) => (
              <FilaTabla key={el.uuid} filaData={el} />
            ))}
          {filtroActivo &&
            filtrarPropiedadesTabla(dataFiltrada).map((el) => (
              <FilaTabla key={el.uuid} filaData={el} />
            ))}
        </tbody>
      </table>
      {/* <TablePagination
        // component="div"
        count={totalPaginas}
        page={paginaActual}
        onPageChange={handleCambioPagina}
        rowsPerPage={itemsPorPagina}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onCambioPagina={handleCambioPagina}
        onPaginaAnterior={handlePaginaAnterior}
        onPaginaSiguiente={handlePaginaSiguiente}
      />
    </>
  );
}

function Paginacion({
  paginaActual,
  totalPaginas,
  onCambioPagina,
  onPaginaAnterior,
  onPaginaSiguiente,
}) {
  Paginacion.propTypes = {
    paginaActual: PropTypes.number,
    totalPaginas: PropTypes.number,
    onCambioPagina: PropTypes.func,
    onPaginaAnterior: PropTypes.func,
    onPaginaSiguiente: PropTypes.func,
  };

  const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);

  const deshabilitarAnterior = paginaActual === 1;
  const deshabilitarSiguiente = paginaActual === totalPaginas;

  return (
    <div className="flex self-end gap-4">
      <button
        onClick={() => onPaginaAnterior(paginaActual)}
        className="rounded-md border border-royal-blue hover:bg-royal-blue text-white disabled:bg-gray-200 disabled:border-gray-400"
        disabled={deshabilitarAnterior ? true : undefined}
      >
        <CaretLeft
          className={`transition-all transition-300ms  ${
            deshabilitarAnterior
              ? "text-gray-400"
              : "hover:text-white text-royal-blue"
          }`}
          size={24}
        />
      </button>
      {paginaActual > 2 && (
        <button
        // className={`w-8 h-8 border border-royal-blue text-royal-blue rounded-md`}
        >
          ...
        </button>
      )}
      {paginas
        .filter(
          (pagina) =>
            pagina === paginaActual ||
            pagina === paginaActual + 1 ||
            pagina === paginaActual - 1
        )
        .map((pagina) => (
          <button
            className={`w-8 h-8 border border-royal-blue text-royal-blue rounded-md ${
              paginaActual === pagina ? "bg-royal-blue text-white" : ""
            }`}
            key={pagina}
            onClick={() => onCambioPagina(pagina)}
          >
            {pagina}
          </button>
        ))}
      {paginaActual < totalPaginas - 1 && <button>...</button>}

      <button
        onClick={() => onPaginaSiguiente(paginaActual)}
        className="rounded-md border border-royal-blue hover:bg-royal-blue text-white disabled:bg-gray-200 disabled:border-gray-400"
        disabled={deshabilitarSiguiente ? true : undefined}
      >
        <CaretRight
          className={`transition-all transition-300ms  ${
            deshabilitarSiguiente
              ? "text-gray-400"
              : "hover:text-white text-royal-blue"
          }`}
          size={24}
        />
      </button>
    </div>
  );
}
