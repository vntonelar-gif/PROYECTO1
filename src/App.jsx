import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [planesEstudio, setPlanesEstudio] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [periodosAcademicos, setPeriodosAcademicos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [bloquesHorarios, setBloquesHorarios] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);

const [formularioInscripcion, setFormularioInscripcion] = useState({
  estudiante: "",
  seccion: ""
});

  const [filtrosOferta, setFiltrosOferta] = useState({
  asignatura: "",
  sede: "",
  jornada: "",
  modalidad: "",
  periodoAcademico: ""
});


const [formularioBloque, setFormularioBloque] = useState({
  seccion: "",
  dia: "Lunes",
  horaInicio: "",
  horaTermino: ""
});

const [formularioSeccion, setFormularioSeccion] = useState({
  asignatura: "",
  docente: "",
  sede: "",
  jornada: "Diurna",
  modalidad: "Presencial",
  cupo: "",
  sala: "",
  periodoAcademico: "",
  estado: "Abierta"
});

const [formularioMatricula, setFormularioMatricula] = useState({
  estudiante: "",
  carrera: "",
  planEstudio: "",
  periodoAcademico: "",
  estado: "Activa"
});

const [formularioPeriodo, setFormularioPeriodo] = useState({
  nombre: "",
  fechaInicio: "",
  fechaTermino: "",
  inicioInscripcion: "",
  terminoInscripcion: "",
  estado: "Planificado"
});

const [formularioAsignatura, setFormularioAsignatura] = useState({
  nombre: "",
  codigo: "",
  creditos: "",
  semestre: "",
  planEstudio: "",
  prerrequisitos: []
});

const [formularioPlan, setFormularioPlan] = useState({
  nombre: "",
  anio: "",
  carrera: "",
  estado: "Vigente"
});

const [formularioCarrera, setFormularioCarrera] = useState({
  nombre: "",
  codigo: "",
  sede: ""
});

const [formularioSede, setFormularioSede] = useState({
  nombre: "",
  direccion: "",
  ciudad: ""
});

const [formularioUsuario, setFormularioUsuario] = useState({
  nombre: "",
  email: "",
  password: "",
  rol: "Estudiante"
});

const [formularioLogin, setFormularioLogin] = useState({
  email: "",
  password: ""
});

const [usuarioActual, setUsuarioActual] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    carrera: ""
  });

  const [formularioDocente, setFormularioDocente] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    especialidad: ""
  });

  // =========================
  // ESTUDIANTES
  // =========================

  const cargarEstudiantes = async () => {
    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/estudiantes"
      );

      const datos = await respuesta.json();
      setEstudiantes(datos);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    }
  };

  const cargarUsuarios = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/usuarios");
    const datos = await respuesta.json();
    setUsuarios(datos);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
};

const cargarSedes = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/sedes");
    const datos = await respuesta.json();
    setSedes(datos);
  } catch (error) {
    console.error("Error al cargar sedes:", error);
  }
};

const cargarCarreras = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/carreras");
    const datos = await respuesta.json();
    setCarreras(datos);
  } catch (error) {
    console.error("Error al cargar carreras:", error);
  }
};

  const manejarCambio = (evento) => {
    setFormulario({
      ...formulario,
      [evento.target.name]: evento.target.value
    });
  };

  const iniciarSesion = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/usuarios/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formularioLogin)
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje);
    }

    setUsuarioActual(datos.usuario);

    setFormularioLogin({
      email: "",
      password: ""
    });

    alert(`Bienvenido/a ${datos.usuario.nombre}`);

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
  const guardarUsuario = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/usuarios",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formularioUsuario)
      }
    );

    if (!respuesta.ok) {
      throw new Error("No se pudo guardar el usuario");
    }

    setFormularioUsuario({
      nombre: "",
      email: "",
      password: "",
      rol: "Estudiante"
    });

    cargarUsuarios();

    alert("Usuario registrado correctamente");
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al registrar el usuario");
  }
};

const guardarSede = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/sedes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formularioSede)
      }
    );

    if (!respuesta.ok) {
      throw new Error("No se pudo guardar la sede");
    }

    setFormularioSede({
      nombre: "",
      direccion: "",
      ciudad: ""
    });

    cargarSedes();

    alert("Sede guardada correctamente");
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al guardar la sede");
  }
};

const guardarCarrera = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/carreras",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formularioCarrera)
      }
    );

    if (!respuesta.ok) {
      const datosError = await respuesta.json();
      throw new Error(datosError.error || "No se pudo guardar la carrera");
    }

    setFormularioCarrera({
      nombre: "",
      codigo: "",
      sede: ""
    });

    cargarCarreras();

    alert("Carrera guardada correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const guardarPlanEstudio = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/planes-estudio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formularioPlan,
          anio: Number(formularioPlan.anio)
        })
      }
    );

    if (!respuesta.ok) {
      const datosError = await respuesta.json();
      throw new Error(
        datosError.error || "No se pudo guardar el plan de estudio"
      );
    }

    setFormularioPlan({
      nombre: "",
      anio: "",
      carrera: "",
      estado: "Vigente"
    });

    cargarPlanesEstudio();

    alert("Plan de estudio guardado correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const guardarAsignatura = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/asignaturas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formularioAsignatura,
          creditos: Number(formularioAsignatura.creditos),
          semestre: Number(formularioAsignatura.semestre)
        })
      }
    );

    if (!respuesta.ok) {
      const datosError = await respuesta.json();

      throw new Error(
        datosError.error || "No se pudo guardar la asignatura"
      );
    }

    setFormularioAsignatura({
      nombre: "",
      codigo: "",
      creditos: "",
      semestre: "",
      planEstudio: "",
      prerrequisitos: []
    });

    cargarAsignaturas();

    alert("Asignatura guardada correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const cargarPlanesEstudio = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/planes-estudio");
    const datos = await respuesta.json();
    setPlanesEstudio(datos);
  } catch (error) {
    console.error("Error al cargar planes de estudio:", error);
  }
};

const cargarAsignaturas = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/asignaturas");
    const datos = await respuesta.json();
    setAsignaturas(datos);
  } catch (error) {
    console.error("Error al cargar asignaturas:", error);
  }
};

const guardarPeriodoAcademico = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/periodos-academicos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formularioPeriodo)
      }
    );

    if (!respuesta.ok) {
      const datosError = await respuesta.json();

      throw new Error(
        datosError.error || "No se pudo guardar el período académico"
      );
    }

    setFormularioPeriodo({
      nombre: "",
      fechaInicio: "",
      fechaTermino: "",
      inicioInscripcion: "",
      terminoInscripcion: "",
      estado: "Planificado"
    });

    cargarPeriodosAcademicos();

    alert("Período académico guardado correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const guardarMatricula = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/matriculas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formularioMatricula)
      }
    );

    if (!respuesta.ok) {
      const datosError = await respuesta.json();

      throw new Error(
        datosError.error || "No se pudo guardar la matrícula"
      );
    }

    setFormularioMatricula({
      estudiante: "",
      carrera: "",
      planEstudio: "",
      periodoAcademico: "",
      estado: "Activa"
    });

    cargarMatriculas();

    alert("Matrícula guardada correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const guardarSeccion = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/secciones",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formularioSeccion,
          cupo: Number(formularioSeccion.cupo)
        })
      }
    );

    if (!respuesta.ok) {
      const datosError = await respuesta.json();

      throw new Error(
        datosError.error || "No se pudo guardar la sección"
      );
    }

    setFormularioSeccion({
      asignatura: "",
      docente: "",
      sede: "",
      jornada: "Diurna",
      modalidad: "Presencial",
      cupo: "",
      sala: "",
      periodoAcademico: "",
      estado: "Abierta"
    });

    cargarSecciones();

    alert("Sección guardada correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const guardarBloqueHorario = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/bloques-horarios",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formularioBloque)
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || "No se pudo guardar el bloque horario"
      );
    }

    setFormularioBloque({
      seccion: "",
      dia: "Lunes",
      horaInicio: "",
      horaTermino: ""
    });

    cargarBloquesHorarios();

    alert("Bloque horario guardado correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  const guardarEstudiante = async (evento) => {
    evento.preventDefault();

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/estudiantes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formulario)
        }
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo guardar el estudiante");
      }

      setFormulario({
        nombre: "",
        apellido: "",
        rut: "",
        email: "",
        carrera: ""
      });

      cargarEstudiantes();

      alert("Estudiante guardado correctamente");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar el estudiante");
    }
  };

  const cargarPeriodosAcademicos = async () => {
  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/periodos-academicos"
    );

    const datos = await respuesta.json();
    setPeriodosAcademicos(datos);
  } catch (error) {
    console.error("Error al cargar períodos académicos:", error);
  }
};

const cargarMatriculas = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/matriculas");
    const datos = await respuesta.json();
    setMatriculas(datos);
  } catch (error) {
    console.error("Error al cargar matrículas:", error);
  }
};

const cargarSecciones = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/secciones");
    const datos = await respuesta.json();
    setSecciones(datos);
  } catch (error) {
    console.error("Error al cargar secciones:", error);
  }
};

const cargarBloquesHorarios = async () => {
  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/bloques-horarios"
    );

    const datos = await respuesta.json();
    setBloquesHorarios(datos);
  } catch (error) {
    console.error("Error al cargar bloques horarios:", error);
  }
};

const cargarInscripciones = async () => {
  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/inscripciones"
    );

    const datos = await respuesta.json();
    setInscripciones(datos);
  } catch (error) {
    console.error("Error al cargar inscripciones:", error);
  }
};

  // =========================
  // DOCENTES
  // =========================

  const cargarDocentes = async () => {
    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/docentes"
      );

      const datos = await respuesta.json();
      setDocentes(datos);
    } catch (error) {
      console.error("Error al cargar docentes:", error);
    }
  };

  const manejarCambioDocente = (evento) => {
    setFormularioDocente({
      ...formularioDocente,
      [evento.target.name]: evento.target.value
    });
  };

  const guardarDocente = async (evento) => {
    evento.preventDefault();

    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/docentes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formularioDocente)
        }
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo guardar el docente");
      }

      setFormularioDocente({
        nombre: "",
        apellido: "",
        rut: "",
        email: "",
        especialidad: ""
      });

      cargarDocentes();

      alert("Docente guardado correctamente");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar el docente");
    }
  };

  // =========================
  // CARGAR DATOS AL INICIAR
  // =========================

  useEffect(() => {
    cargarEstudiantes();
    cargarDocentes();
    cargarUsuarios();
    cargarSedes();
    cargarCarreras();
    cargarPlanesEstudio();
    cargarAsignaturas();
    cargarPeriodosAcademicos();
    cargarMatriculas();
    cargarSecciones();
    cargarBloquesHorarios();
    cargarInscripciones();
  }, []);

const seccionesFiltradas = secciones.filter((seccion) => {
  return (
    (filtrosOferta.asignatura === "" ||
      seccion.asignatura?._id === filtrosOferta.asignatura) &&

    (filtrosOferta.sede === "" ||
      seccion.sede?._id === filtrosOferta.sede) &&

    (filtrosOferta.jornada === "" ||
      seccion.jornada === filtrosOferta.jornada) &&

    (filtrosOferta.modalidad === "" ||
      seccion.modalidad === filtrosOferta.modalidad) &&

    (filtrosOferta.periodoAcademico === "" ||
      seccion.periodoAcademico?._id === filtrosOferta.periodoAcademico)
  );
});

const guardarInscripcion = async (evento) => {
  evento.preventDefault();

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/inscripciones",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formularioInscripcion)
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(
        datos.mensaje || "No se pudo realizar la inscripción"
      );
    }

    setFormularioInscripcion({
      estudiante: "",
      seccion: ""
    });

    cargarInscripciones();
    cargarSecciones();

    alert("Asignatura inscrita correctamente");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  // =========================
  // INTERFAZ
  // =========================

  return (
    <div className="app">

      <header className="encabezado">
        <h1>Gestión Académica</h1>
        <p>Administración académica</p>
      </header>

<section className="tarjeta">
  <h2>Iniciar sesión</h2>

  <form onSubmit={iniciarSesion}>

    <div className="grupo">
      <label>Email</label>

      <input
        type="email"
        value={formularioLogin.email}
        onChange={(evento) =>
          setFormularioLogin({
            ...formularioLogin,
            email: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Contraseña</label>

      <input
        type="password"
        value={formularioLogin.password}
        onChange={(evento) =>
          setFormularioLogin({
            ...formularioLogin,
            password: evento.target.value
          })
        }
        required
      />
    </div>

    <button type="submit">
      Iniciar sesión
    </button>

  </form>

  {usuarioActual && (
    <div className="usuario-logueado">
      <p>
        Sesión iniciada como: <strong>{usuarioActual.nombre}</strong>
      </p>

      <p>
        Rol: <strong>{usuarioActual.rol}</strong>
      </p>
    </div>
  )}

</section>

<section className="tarjeta">
  <h2>Registrar usuario</h2>

  <form onSubmit={guardarUsuario}>

    <div className="grupo">
      <label>Nombre</label>
      <input
        type="text"
        name="nombre"
        value={formularioUsuario.nombre}
        onChange={(evento) =>
          setFormularioUsuario({
            ...formularioUsuario,
            nombre: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formularioUsuario.email}
        onChange={(evento) =>
          setFormularioUsuario({
            ...formularioUsuario,
            email: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Contraseña</label>
      <input
        type="password"
        name="password"
        value={formularioUsuario.password}
        onChange={(evento) =>
          setFormularioUsuario({
            ...formularioUsuario,
            password: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Rol</label>

      <select
        name="rol"
        value={formularioUsuario.rol}
        onChange={(evento) =>
          setFormularioUsuario({
            ...formularioUsuario,
            rol: evento.target.value
          })
        }
      >
        <option value="Estudiante">Estudiante</option>
        <option value="Docente">Docente</option>
        <option value="Coordinador Académico">
          Coordinador Académico
        </option>
        <option value="Administrador">Administrador</option>
      </select>
    </div>

    <button type="submit">
      Registrar usuario
    </button>

  </form>
</section>

<section className="tarjeta">
  <h2>Registrar sede</h2>

  <form onSubmit={guardarSede}>
    <div className="grupo">
      <label>Nombre</label>
      <input
        type="text"
        value={formularioSede.nombre}
        onChange={(evento) =>
          setFormularioSede({
            ...formularioSede,
            nombre: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Dirección</label>
      <input
        type="text"
        value={formularioSede.direccion}
        onChange={(evento) =>
          setFormularioSede({
            ...formularioSede,
            direccion: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Ciudad</label>
      <input
        type="text"
        value={formularioSede.ciudad}
        onChange={(evento) =>
          setFormularioSede({
            ...formularioSede,
            ciudad: evento.target.value
          })
        }
        required
      />
    </div>

    <button type="submit">
      Guardar sede
    </button>
  </form>
</section>

<section className="tarjeta">
  <h2>Sedes registradas</h2>

  {sedes.length === 0 ? (
    <p>No hay sedes registradas.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Ciudad</th>
          </tr>
        </thead>

        <tbody>
          {sedes.map((sede) => (
            <tr key={sede._id}>
              <td>{sede.nombre}</td>
              <td>{sede.direccion}</td>
              <td>{sede.ciudad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

      <main className="contenido">

        {/* ================= carreras ================= */}

        <section className="tarjeta">
  <h2>Registrar carrera</h2>

  <form onSubmit={guardarCarrera}>
    <div className="grupo">
      <label>Nombre</label>
      <input
        type="text"
        value={formularioCarrera.nombre}
        onChange={(evento) =>
          setFormularioCarrera({
            ...formularioCarrera,
            nombre: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Código</label>
      <input
        type="text"
        value={formularioCarrera.codigo}
        onChange={(evento) =>
          setFormularioCarrera({
            ...formularioCarrera,
            codigo: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Sede</label>

      <select
        value={formularioCarrera.sede}
        onChange={(evento) =>
          setFormularioCarrera({
            ...formularioCarrera,
            sede: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione una sede</option>

        {sedes.map((sede) => (
          <option key={sede._id} value={sede._id}>
            {sede.nombre} - {sede.ciudad}
          </option>
        ))}
      </select>
    </div>

    <button type="submit">
      Guardar carrera
    </button>
  </form>
</section>

<section className="tarjeta">
  <h2>Carreras registradas</h2>

  {carreras.length === 0 ? (
    <p>No hay carreras registradas.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Sede</th>
          </tr>
        </thead>

        <tbody>
          {carreras.map((carrera) => (
            <tr key={carrera._id}>
              <td>{carrera.nombre}</td>
              <td>{carrera.codigo}</td>
              <td>
                {carrera.sede
                  ? `${carrera.sede.nombre} - ${carrera.sede.ciudad}`
                  : "Sin sede"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

{/* ================= planestudio ================= */}

<section className="tarjeta">
  <h2>Registrar plan de estudio</h2>

  <form onSubmit={guardarPlanEstudio}>
    <div className="grupo">
      <label>Nombre</label>
      <input
        type="text"
        value={formularioPlan.nombre}
        onChange={(evento) =>
          setFormularioPlan({
            ...formularioPlan,
            nombre: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Año</label>
      <input
        type="number"
        value={formularioPlan.anio}
        onChange={(evento) =>
          setFormularioPlan({
            ...formularioPlan,
            anio: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Carrera</label>

      <select
        value={formularioPlan.carrera}
        onChange={(evento) =>
          setFormularioPlan({
            ...formularioPlan,
            carrera: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione una carrera</option>

        {carreras.map((carrera) => (
          <option key={carrera._id} value={carrera._id}>
            {carrera.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Estado</label>

      <select
        value={formularioPlan.estado}
        onChange={(evento) =>
          setFormularioPlan({
            ...formularioPlan,
            estado: evento.target.value
          })
        }
      >
        <option value="Vigente">Vigente</option>
        <option value="Inactivo">Inactivo</option>
      </select>
    </div>

    <button type="submit">
      Guardar plan de estudio
    </button>
  </form>
</section>

<section className="tarjeta">
  <h2>Planes de estudio registrados</h2>

  {planesEstudio.length === 0 ? (
    <p>No hay planes de estudio registrados.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Año</th>
            <th>Carrera</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {planesEstudio.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.nombre}</td>
              <td>{plan.anio}</td>
              <td>
                {plan.carrera
                  ? plan.carrera.nombre
                  : "Sin carrera"}
              </td>
              <td>{plan.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

{/* ================= asignaturass ================= */}

<section className="tarjeta">
  <h2>Registrar asignatura</h2>

  <form onSubmit={guardarAsignatura}>
    <div className="grupo">
      <label>Nombre</label>
      <input
        type="text"
        value={formularioAsignatura.nombre}
        onChange={(evento) =>
          setFormularioAsignatura({
            ...formularioAsignatura,
            nombre: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Código</label>
      <input
        type="text"
        value={formularioAsignatura.codigo}
        onChange={(evento) =>
          setFormularioAsignatura({
            ...formularioAsignatura,
            codigo: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Créditos</label>
      <input
        type="number"
        min="1"
        value={formularioAsignatura.creditos}
        onChange={(evento) =>
          setFormularioAsignatura({
            ...formularioAsignatura,
            creditos: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Semestre</label>
      <input
        type="number"
        min="1"
        value={formularioAsignatura.semestre}
        onChange={(evento) =>
          setFormularioAsignatura({
            ...formularioAsignatura,
            semestre: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Plan de estudio</label>

      <select
        value={formularioAsignatura.planEstudio}
        onChange={(evento) =>
          setFormularioAsignatura({
            ...formularioAsignatura,
            planEstudio: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione un plan de estudio</option>

        {planesEstudio.map((plan) => (
          <option key={plan._id} value={plan._id}>
            {plan.nombre}
          </option>
        ))}
      </select>
    </div>

<div className="grupo">
  <label>Prerrequisitos</label>

  <select
    multiple
    value={formularioAsignatura.prerrequisitos}
    onChange={(evento) => {
      const seleccionados = Array.from(
        evento.target.selectedOptions,
        (opcion) => opcion.value
      );

      setFormularioAsignatura({
        ...formularioAsignatura,
        prerrequisitos: seleccionados
      });
    }}
  >
    {asignaturas.map((asignatura) => (
      <option key={asignatura._id} value={asignatura._id}>
        {asignatura.codigo} - {asignatura.nombre}
      </option>
    ))}
  </select>
</div>

    <button type="submit">
      Guardar asignatura
    </button>
  </form>
</section>

<section className="tarjeta">
  <h2>Asignaturas registradas</h2>
  {asignaturas.length === 0 ? (
    <p>No hay asignaturas registradas.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Créditos</th>
            <th>Semestre</th>
            <th>Plan de estudio</th>
            <th>Prerrequisitos</th>
          </tr>
        </thead>

        <tbody>
          {asignaturas.map((asignatura) => (
  <tr key={asignatura._id}>
    <td>{asignatura.codigo}</td>
    <td>{asignatura.nombre}</td>
    <td>{asignatura.creditos}</td>
    <td>{asignatura.semestre}</td>

    <td>
      {asignatura.planEstudio
        ? asignatura.planEstudio.nombre
        : "Sin plan"}
    </td>

    <td>
      {asignatura.prerrequisitos &&
      asignatura.prerrequisitos.length > 0
        ? asignatura.prerrequisitos
            .map(
              (prerrequisito) =>
                `${prerrequisito.codigo} - ${prerrequisito.nombre}`
            )
            .join(", ")
        : "Sin prerrequisitos"}
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  )}
</section>

{/* ================= PERÍODOS ACADÉMICOS ================= */}

<section className="tarjeta">
  <h2>Registrar período académico</h2>

  <form onSubmit={guardarPeriodoAcademico}>
    <div className="grupo">
      <label>Nombre</label>
      <input
        type="text"
        value={formularioPeriodo.nombre}
        onChange={(evento) =>
          setFormularioPeriodo({
            ...formularioPeriodo,
            nombre: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Fecha de inicio</label>
      <input
        type="date"
        value={formularioPeriodo.fechaInicio}
        onChange={(evento) =>
          setFormularioPeriodo({
            ...formularioPeriodo,
            fechaInicio: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Fecha de término</label>
      <input
        type="date"
        value={formularioPeriodo.fechaTermino}
        onChange={(evento) =>
          setFormularioPeriodo({
            ...formularioPeriodo,
            fechaTermino: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Inicio de inscripción</label>
      <input
        type="date"
        value={formularioPeriodo.inicioInscripcion}
        onChange={(evento) =>
          setFormularioPeriodo({
            ...formularioPeriodo,
            inicioInscripcion: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Término de inscripción</label>
      <input
        type="date"
        value={formularioPeriodo.terminoInscripcion}
        onChange={(evento) =>
          setFormularioPeriodo({
            ...formularioPeriodo,
            terminoInscripcion: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Estado</label>

      <select
        value={formularioPeriodo.estado}
        onChange={(evento) =>
          setFormularioPeriodo({
            ...formularioPeriodo,
            estado: evento.target.value
          })
        }
      >
        <option value="Planificado">Planificado</option>
        <option value="Activo">Activo</option>
        <option value="Finalizado">Finalizado</option>
      </select>
    </div>

    <button type="submit">
      Guardar período académico
    </button>
  </form>
</section>

<section className="tarjeta">
  <h2>Períodos académicos registrados</h2>

  {periodosAcademicos.length === 0 ? (
    <p>No hay períodos académicos registrados.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Inicio</th>
            <th>Término</th>
            <th>Inscripción</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {periodosAcademicos.map((periodo) => (
            <tr key={periodo._id}>
              <td>{periodo.nombre}</td>

              <td>
                {new Date(periodo.fechaInicio).toLocaleDateString()}
              </td>

              <td>
                {new Date(periodo.fechaTermino).toLocaleDateString()}
              </td>

              <td>
                {new Date(periodo.inicioInscripcion).toLocaleDateString()}
                {" - "}
                {new Date(periodo.terminoInscripcion).toLocaleDateString()}
              </td>

              <td>{periodo.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

{/* ================= MATRÍCULAS ================= */}

<section className="tarjeta">
  <h2>Registrar matrícula</h2>

  <form onSubmit={guardarMatricula}>
    <div className="grupo">
      <label>Estudiante</label>

      <select
        value={formularioMatricula.estudiante}
        onChange={(evento) =>
          setFormularioMatricula({
            ...formularioMatricula,
            estudiante: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione un estudiante</option>

        {estudiantes.map((estudiante) => (
          <option key={estudiante._id} value={estudiante._id}>
            {estudiante.nombre} {estudiante.apellido}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Carrera</label>

      <select
        value={formularioMatricula.carrera}
        onChange={(evento) =>
          setFormularioMatricula({
            ...formularioMatricula,
            carrera: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione una carrera</option>

        {carreras.map((carrera) => (
          <option key={carrera._id} value={carrera._id}>
            {carrera.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Plan de estudio</label>

      <select
        value={formularioMatricula.planEstudio}
        onChange={(evento) =>
          setFormularioMatricula({
            ...formularioMatricula,
            planEstudio: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione un plan de estudio</option>

        {planesEstudio.map((plan) => (
          <option key={plan._id} value={plan._id}>
            {plan.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Período académico</label>

      <select
        value={formularioMatricula.periodoAcademico}
        onChange={(evento) =>
          setFormularioMatricula({
            ...formularioMatricula,
            periodoAcademico: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione un período</option>

        {periodosAcademicos.map((periodo) => (
          <option key={periodo._id} value={periodo._id}>
            {periodo.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Estado</label>

      <select
        value={formularioMatricula.estado}
        onChange={(evento) =>
          setFormularioMatricula({
            ...formularioMatricula,
            estado: evento.target.value
          })
        }
      >
        <option value="Activa">Activa</option>
        <option value="Suspendida">Suspendida</option>
        <option value="Finalizada">Finalizada</option>
      </select>
    </div>

    <button type="submit">
      Guardar matrícula
    </button>
  </form>
</section>

<section className="tarjeta">
  <h2>Matrículas registradas</h2>

  {matriculas.length === 0 ? (
    <p>No hay matrículas registradas.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Carrera</th>
            <th>Plan</th>
            <th>Período</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {matriculas.map((matricula) => (
            <tr key={matricula._id}>
              <td>
                {matricula.estudiante
                  ? `${matricula.estudiante.nombre} ${matricula.estudiante.apellido}`
                  : "Sin estudiante"}
              </td>

              <td>
                {matricula.carrera
                  ? matricula.carrera.nombre
                  : "Sin carrera"}
              </td>

              <td>
                {matricula.planEstudio
                  ? matricula.planEstudio.nombre
                  : "Sin plan"}
              </td>

              <td>
                {matricula.periodoAcademico
                  ? matricula.periodoAcademico.nombre
                  : "Sin período"}
              </td>

              <td>{matricula.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

{/* ================= SECCIONES ================= */}

<section className="tarjeta">
  <h2>Registrar sección</h2>

  <form onSubmit={guardarSeccion}>
    <div className="grupo">
      <label>Asignatura</label>

      <select
        value={formularioSeccion.asignatura}
        onChange={(evento) =>
          setFormularioSeccion({
            ...formularioSeccion,
            asignatura: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione una asignatura</option>

        {asignaturas.map((asignatura) => (
          <option key={asignatura._id} value={asignatura._id}>
            {asignatura.codigo} - {asignatura.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Docente</label>

      <select
        value={formularioSeccion.docente}
        onChange={(evento) =>
          setFormularioSeccion({
            ...formularioSeccion,
            docente: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione un docente</option>

        {docentes.map((docente) => (
          <option key={docente._id} value={docente._id}>
            {docente.nombre} {docente.apellido}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Sede</label>

      <select
        value={formularioSeccion.sede}
        onChange={(evento) =>
          setFormularioSeccion({
            ...formularioSeccion,
            sede: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione una sede</option>

        {sedes.map((sede) => (
          <option key={sede._id} value={sede._id}>
            {sede.nombre} - {sede.ciudad}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Jornada</label>

      <select
        value={formularioSeccion.jornada}
        onChange={(evento) =>
          setFormularioSeccion({
            ...formularioSeccion,
            jornada: evento.target.value
          })
        }
      >
        <option value="Diurna">Diurna</option>
        <option value="Vespertina">Vespertina</option>
      </select>
    </div>

    <div className="grupo">
      <label>Modalidad</label>

      <select
        value={formularioSeccion.modalidad}
        onChange={(evento) =>
          setFormularioSeccion({
            ...formularioSeccion,
            modalidad: evento.target.value
          })
        }
      >
        <option value="Presencial">Presencial</option>
        <option value="Online">Online</option>
        <option value="Híbrida">Híbrida</option>
      </select>
    </div>

    <div className="grupo">
      <label>Cupo</label>

      <input
        type="number"
        min="1"
        value={formularioSeccion.cupo}
        onChange={(evento) =>
          setFormularioSeccion({
            ...formularioSeccion,
            cupo: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Sala</label>

      <input
        type="text"
        value={formularioSeccion.sala}
        onChange={(evento) =>
          setFormularioSeccion({
            ...formularioSeccion,
            sala: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Período académico</label>

      <select
        value={formularioSeccion.periodoAcademico}
        onChange={(evento) =>
          setFormularioSeccion({
            ...formularioSeccion,
            periodoAcademico: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione un período</option>

        {periodosAcademicos.map((periodo) => (
          <option key={periodo._id} value={periodo._id}>
            {periodo.nombre}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Estado</label>

      <select
        value={formularioSeccion.estado}
        onChange={(evento) =>
          setFormularioSeccion({
            ...formularioSeccion,
            estado: evento.target.value
          })
        }
      >
        <option value="Abierta">Abierta</option>
        <option value="Cerrada">Cerrada</option>
      </select>
    </div>

    <button type="submit">
      Guardar sección
    </button>
  </form>
</section>

<section className="tarjeta">
  <h2>Secciones registradas</h2>

  {secciones.length === 0 ? (
    <p>No hay secciones registradas.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Asignatura</th>
            <th>Docente</th>
            <th>Sede</th>
            <th>Jornada</th>
            <th>Modalidad</th>
            <th>Cupo</th>
            <th>Sala</th>
            <th>Período</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {secciones.map((seccion) => (
            <tr key={seccion._id}>
              <td>
                {seccion.asignatura
                  ? `${seccion.asignatura.codigo} - ${seccion.asignatura.nombre}`
                  : "Sin asignatura"}
              </td>

              <td>
                {seccion.docente
                  ? `${seccion.docente.nombre} ${seccion.docente.apellido}`
                  : "Sin docente"}
              </td>

              <td>
                {seccion.sede
                  ? seccion.sede.nombre
                  : "Sin sede"}
              </td>

              <td>{seccion.jornada}</td>
              <td>{seccion.modalidad}</td>
              <td>{seccion.cupo}</td>
              <td>{seccion.sala}</td>

              <td>
                {seccion.periodoAcademico
                  ? seccion.periodoAcademico.nombre
                  : "Sin período"}
              </td>

              <td>{seccion.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

{/* ================= BLOQUES HORARIOS ================= */}

<section className="tarjeta">
  <h2>Registrar bloque horario</h2>

  <form onSubmit={guardarBloqueHorario}>
    <div className="grupo">
      <label>Sección</label>

      <select
        value={formularioBloque.seccion}
        onChange={(evento) =>
          setFormularioBloque({
            ...formularioBloque,
            seccion: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione una sección</option>

        {secciones.map((seccion) => (
          <option key={seccion._id} value={seccion._id}>
            {seccion.asignatura
              ? `${seccion.asignatura.codigo} - ${seccion.asignatura.nombre}`
              : "Sin asignatura"}
            {" | "}
            {seccion.docente
              ? `${seccion.docente.nombre} ${seccion.docente.apellido}`
              : "Sin docente"}
            {" | Sala "}
            {seccion.sala}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Día</label>

      <select
        value={formularioBloque.dia}
        onChange={(evento) =>
          setFormularioBloque({
            ...formularioBloque,
            dia: evento.target.value
          })
        }
      >
        <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miércoles">Miércoles</option>
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Viernes</option>
        <option value="Sábado">Sábado</option>
      </select>
    </div>

    <div className="grupo">
      <label>Hora de inicio</label>

      <input
        type="time"
        value={formularioBloque.horaInicio}
        onChange={(evento) =>
          setFormularioBloque({
            ...formularioBloque,
            horaInicio: evento.target.value
          })
        }
        required
      />
    </div>

    <div className="grupo">
      <label>Hora de término</label>

      <input
        type="time"
        value={formularioBloque.horaTermino}
        onChange={(evento) =>
          setFormularioBloque({
            ...formularioBloque,
            horaTermino: evento.target.value
          })
        }
        required
      />
    </div>

    <button type="submit">
      Guardar bloque horario
    </button>
  </form>
</section>

<section className="tarjeta">
  <h2>Bloques horarios registrados</h2>

  {bloquesHorarios.length === 0 ? (
    <p>No hay bloques horarios registrados.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Asignatura</th>
            <th>Docente</th>
            <th>Sala</th>
            <th>Día</th>
            <th>Inicio</th>
            <th>Término</th>
          </tr>
        </thead>

        <tbody>
          {bloquesHorarios.map((bloque) => (
            <tr key={bloque._id}>
              <td>
                {bloque.seccion?.asignatura
                  ? `${bloque.seccion.asignatura.codigo} - ${bloque.seccion.asignatura.nombre}`
                  : "Sin asignatura"}
              </td>

              <td>
                {bloque.seccion?.docente
                  ? `${bloque.seccion.docente.nombre} ${bloque.seccion.docente.apellido}`
                  : "Sin docente"}
              </td>

              <td>
                {bloque.seccion
                  ? bloque.seccion.sala
                  : "Sin sala"}
              </td>

              <td>{bloque.dia}</td>
              <td>{bloque.horaInicio}</td>
              <td>{bloque.horaTermino}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

{/* ================= CONSULTAR OFERTA ACADÉMICA ================= */}

<section className="tarjeta">
  <h2>Consultar oferta académica</h2>

  <div className="grupo">
    <label>Asignatura</label>
    <select
      value={filtrosOferta.asignatura}
      onChange={(evento) =>
        setFiltrosOferta({
          ...filtrosOferta,
          asignatura: evento.target.value
        })
      }
    >
      <option value="">Todas</option>

      {asignaturas.map((asignatura) => (
        <option key={asignatura._id} value={asignatura._id}>
          {asignatura.codigo} - {asignatura.nombre}
        </option>
      ))}
    </select>
  </div>

  <div className="grupo">
    <label>Sede</label>
    <select
      value={filtrosOferta.sede}
      onChange={(evento) =>
        setFiltrosOferta({
          ...filtrosOferta,
          sede: evento.target.value
        })
      }
    >
      <option value="">Todas</option>

      {sedes.map((sede) => (
        <option key={sede._id} value={sede._id}>
          {sede.nombre}
        </option>
      ))}
    </select>
  </div>

  <div className="grupo">
    <label>Jornada</label>
    <select
      value={filtrosOferta.jornada}
      onChange={(evento) =>
        setFiltrosOferta({
          ...filtrosOferta,
          jornada: evento.target.value
        })
      }
    >
      <option value="">Todas</option>
      <option value="Diurna">Diurna</option>
      <option value="Vespertina">Vespertina</option>
    </select>
  </div>

  <div className="grupo">
    <label>Modalidad</label>
    <select
      value={filtrosOferta.modalidad}
      onChange={(evento) =>
        setFiltrosOferta({
          ...filtrosOferta,
          modalidad: evento.target.value
        })
      }
    >
      <option value="">Todas</option>
      <option value="Presencial">Presencial</option>
      <option value="Online">Online</option>
      <option value="Híbrida">Híbrida</option>
    </select>
  </div>

  <div className="grupo">
    <label>Período académico</label>
    <select
      value={filtrosOferta.periodoAcademico}
      onChange={(evento) =>
        setFiltrosOferta({
          ...filtrosOferta,
          periodoAcademico: evento.target.value
        })
      }
    >
      <option value="">Todos</option>

      {periodosAcademicos.map((periodo) => (
        <option key={periodo._id} value={periodo._id}>
          {periodo.nombre}
        </option>
      ))}
    </select>
  </div>

  <button
    type="button"
    onClick={() =>
      setFiltrosOferta({
        asignatura: "",
        sede: "",
        jornada: "",
        modalidad: "",
        periodoAcademico: ""
      })
    }
  >
    Limpiar filtros
  </button>
</section>

<section className="tarjeta">
  <h2>Oferta académica disponible</h2>

  {seccionesFiltradas.length === 0 ? (
    <p>No hay secciones que coincidan con los filtros.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Asignatura</th>
            <th>Docente</th>
            <th>Sede</th>
            <th>Jornada</th>
            <th>Modalidad</th>
            <th>Cupo</th>
            <th>Sala</th>
            <th>Período</th>
            <th>Horario</th>
          </tr>
        </thead>

        <tbody>
          {seccionesFiltradas.map((seccion) => {
            const horariosSeccion = bloquesHorarios.filter(
              (bloque) => bloque.seccion?._id === seccion._id
            );

            return (
              <tr key={seccion._id}>
                <td>
                  {seccion.asignatura
                    ? `${seccion.asignatura.codigo} - ${seccion.asignatura.nombre}`
                    : "Sin asignatura"}
                </td>

                <td>
                  {seccion.docente
                    ? `${seccion.docente.nombre} ${seccion.docente.apellido}`
                    : "Sin docente"}
                </td>

                <td>
                  {seccion.sede
                    ? seccion.sede.nombre
                    : "Sin sede"}
                </td>

                <td>{seccion.jornada}</td>
                <td>{seccion.modalidad}</td>
                <td>{seccion.cupo}</td>
                <td>{seccion.sala}</td>

                <td>
                  {seccion.periodoAcademico
                    ? seccion.periodoAcademico.nombre
                    : "Sin período"}
                </td>

                <td>
                  {horariosSeccion.length > 0
                    ? horariosSeccion
                        .map(
                          (bloque) =>
                            `${bloque.dia} ${bloque.horaInicio}-${bloque.horaTermino}`
                        )
                        .join(", ")
                    : "Sin horario"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
</section>

{/* ================= INSCRIPCIONES ================= */}

<section className="tarjeta">
  <h2>Inscribir asignatura</h2>

  <form onSubmit={guardarInscripcion}>
    <div className="grupo">
      <label>Estudiante</label>

      <select
        value={formularioInscripcion.estudiante}
        onChange={(evento) =>
          setFormularioInscripcion({
            ...formularioInscripcion,
            estudiante: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione un estudiante</option>

        {estudiantes.map((estudiante) => (
          <option key={estudiante._id} value={estudiante._id}>
            {estudiante.nombre} {estudiante.apellido}
          </option>
        ))}
      </select>
    </div>

    <div className="grupo">
      <label>Sección</label>

      <select
        value={formularioInscripcion.seccion}
        onChange={(evento) =>
          setFormularioInscripcion({
            ...formularioInscripcion,
            seccion: evento.target.value
          })
        }
        required
      >
        <option value="">Seleccione una sección</option>

        {secciones.map((seccion) => (
          <option key={seccion._id} value={seccion._id}>
            {seccion.asignatura
              ? `${seccion.asignatura.codigo} - ${seccion.asignatura.nombre}`
              : "Sin asignatura"}
            {" | "}
            {seccion.docente
              ? `${seccion.docente.nombre} ${seccion.docente.apellido}`
              : "Sin docente"}
            {" | "}
            {seccion.jornada}
            {" | "}
            {seccion.modalidad}
          </option>
        ))}
      </select>
    </div>

    <button type="submit">
      Inscribir asignatura
    </button>
  </form>
</section>

<section className="tarjeta">
  <h2>Inscripciones registradas</h2>

  {inscripciones.length === 0 ? (
    <p>No hay inscripciones registradas.</p>
  ) : (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Asignatura</th>
            <th>Docente</th>
            <th>Período</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {inscripciones.map((inscripcion) => (
            <tr key={inscripcion._id}>
              <td>
                {inscripcion.estudiante
                  ? `${inscripcion.estudiante.nombre} ${inscripcion.estudiante.apellido}`
                  : "Sin estudiante"}
              </td>

              <td>
                {inscripcion.seccion?.asignatura
                  ? `${inscripcion.seccion.asignatura.codigo} - ${inscripcion.seccion.asignatura.nombre}`
                  : "Sin asignatura"}
              </td>

              <td>
                {inscripcion.seccion?.docente
                  ? `${inscripcion.seccion.docente.nombre} ${inscripcion.seccion.docente.apellido}`
                  : "Sin docente"}
              </td>

              <td>
                {inscripcion.seccion?.periodoAcademico
                  ? inscripcion.seccion.periodoAcademico.nombre
                  : "Sin período"}
              </td>

              <td>{inscripcion.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</section>

        {/* ================= EESTUDIANTES ================= */}

        <section className="tarjeta">

          <h2>Registrar estudiante</h2>

          <form onSubmit={guardarEstudiante}>

            <div className="grupo">
              <label>Nombre</label>

              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="grupo">
              <label>Apellido</label>

              <input
                type="text"
                name="apellido"
                value={formulario.apellido}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="grupo">
              <label>RUT</label>

              <input
                type="text"
                name="rut"
                value={formulario.rut}
                onChange={manejarCambio}
                placeholder="12.345.678-9"
                required
              />
            </div>

            <div className="grupo">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={manejarCambio}
                required
              />
            </div>

            <div className="grupo">
              <label>Carrera</label>

              <input
                type="text"
                name="carrera"
                value={formulario.carrera}
                onChange={manejarCambio}
                required
              />
            </div>

            <button type="submit">
              Guardar estudiante
            </button>

          </form>

        </section>


        {/* ================= LISTA ESTUDIANTES ================= */}

        <section className="tarjeta">

          <h2>Estudiantes registrados</h2>

          {estudiantes.length === 0 ? (

            <p>No hay estudiantes registrados.</p>

          ) : (

            <div className="tabla-contenedor">

              <table>

                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>RUT</th>
                    <th>Email</th>
                    <th>Carrera</th>
                  </tr>
                </thead>

                <tbody>

                  {estudiantes.map((estudiante) => (

                    <tr key={estudiante._id}>

                      <td>{estudiante.nombre}</td>

                      <td>{estudiante.apellido}</td>

                      <td>{estudiante.rut}</td>

                      <td>{estudiante.email}</td>

                      <td>{estudiante.carrera}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* ================= DOCENTES ================= */}

        <section className="tarjeta">

          <h2>Registrar docente</h2>

          <form onSubmit={guardarDocente}>

            <div className="grupo">
              <label>Nombre</label>

              <input
                type="text"
                name="nombre"
                value={formularioDocente.nombre}
                onChange={manejarCambioDocente}
                required
              />
            </div>

            <div className="grupo">
              <label>Apellido</label>

              <input
                type="text"
                name="apellido"
                value={formularioDocente.apellido}
                onChange={manejarCambioDocente}
                required
              />
            </div>

            <div className="grupo">
              <label>RUT</label>

              <input
                type="text"
                name="rut"
                value={formularioDocente.rut}
                onChange={manejarCambioDocente}
                placeholder="12.345.678-9"
                required
              />
            </div>

            <div className="grupo">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formularioDocente.email}
                onChange={manejarCambioDocente}
                required
              />
            </div>

            <div className="grupo">
              <label>Especialidad</label>

              <input
                type="text"
                name="especialidad"
                value={formularioDocente.especialidad}
                onChange={manejarCambioDocente}
                required
              />
            </div>

            <button type="submit">
              Guardar docente
            </button>

          </form>

        </section>


        {/* ================= LISTA DOCENTES ================= */}

        <section className="tarjeta">

          <h2>Docentes registrados</h2>

          {docentes.length === 0 ? (

            <p>No hay docentes registrados.</p>

          ) : (

            <div className="tabla-contenedor">

              <table>

                <thead>

                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>RUT</th>
                    <th>Email</th>
                    <th>Especialidad</th>
                  </tr>

                </thead>

                <tbody>

                  {docentes.map((docente) => (

                    <tr key={docente._id}>

                      <td>{docente.nombre}</td>

                      <td>{docente.apellido}</td>

                      <td>{docente.rut}</td>

                      <td>{docente.email}</td>

                      <td>{docente.especialidad}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;