import { useEffect, useState } from "react";

//  Hook reutilizable para hacer fetch
function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error en fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading };
}

function App() {
  //  Llamadas a cada endpoint
  const { data: compras, loading: loadingCompras } = useFetchData("http://localhost:3001/api/compras");
  const { data: entregas, loading: loadingEntrega } = useFetchData("http://localhost:3001/api/entrega");
  const { data: instalaciones, loading: loadingInstalacion } = useFetchData("http://localhost:3001/api/instalacion");
  const { data: pagos, loading: loadingPago } = useFetchData("http://localhost:3001/api/pago");
  const { data: productos, loading: loadingProducto } = useFetchData("http://localhost:3001/api/producto");
  const { data: proveedores, loading: loadingProveedor } = useFetchData("http://localhost:3001/api/proveedor");
  const { data: soportes, loading: loadingSoporte } = useFetchData("http://localhost:3001/api/soporte");
  const { data: usuarios, loading: loadingUsuario } = useFetchData("http://localhost:3001/api/usuarios");

  return (
    <div className="container m-5">
      <h1> Ecoenergix </h1>
      <hr />

      {/* --- Sección Compras --- */}
      <h2> Compras</h2>
      {loadingCompras ? (
        <p>Cargando compras...</p>
      ) : (
        <div className="container">
          {compras.map(c => (
            <div className="card mb-3 p-3 shadow-sm" key={c.ID_compra}>
              <h3><strong>Usuario:</strong> {c.ID_usuario}</h3>
              <p><strong>Fecha:</strong> {new Date(c.Fecha_compra).toLocaleDateString("es-CO")}</p>
              <p><strong>Monto:</strong> {c.Monto_total.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</p>
              <p><strong>Estado:</strong> {c.Estado}</p>
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* --- Sección Entregas --- */}
      <h2> Entregas </h2>
      {loadingEntrega ? (
        <p>Cargando entregas...</p>
      ) : (
        <div className="container">
          {entregas.map(e => (
            <div className="card mb-3 p-3 shadow-sm" key={e.ID_entrega}>
              <p><strong>ID Entrega:</strong> {e.ID_entrega}</p>
              <p><strong>Fecha:</strong> {new Date(e.Fecha_entrega).toLocaleDateString("es-CO")}</p>
              <p><strong>Usuario:</strong> {e.ID_usuario}</p>
              <p><strong>Producto:</strong> {e.ID_producto}</p>
              <p><strong>Cantidad:</strong> {e.Cantidad}</p>
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* --- Sección Instalaciones --- */}
      <h2> Instalaciones </h2>
      {loadingInstalacion ? (
        <p>Cargando instalaciones...</p>
      ) : (
        <div className="container">
          {instalaciones.map(i => (
            <div className="card mb-3 p-3 shadow-sm" key={i.ID_instalacion}>
              <p><strong>Fecha:</strong> {new Date(i.Fecha_instalacion).toLocaleDateString("es-CO")}</p>
              <p><strong>Duración:</strong> {i.Duracion_instalacion} días</p>
              <p><strong>Costo:</strong> {i.Costo_instalacion}</p>
              <p><strong>Estado:</strong> {i.Estado_instalacion}</p>
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* --- Sección Pagos --- */}
      <h2> Pagos </h2>
      {loadingPago ? (
        <p>Cargando pagos...</p>
      ) : (
        <div className="container">
          {pagos.map(p => (
            <div className="card mb-3 p-3 shadow-sm" key={p.ID_pago}>
              <p><strong>Fecha:</strong> {new Date(p.Fecha_pago).toLocaleDateString("es-CO")}</p>
              <p><strong>Monto:</strong> {p.Monto}</p>
              <p><strong>Método:</strong> {p.Metodo_pago}</p>
              <p><strong>Estado:</strong> {p.Estado_pago}</p>
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* --- Sección Productos --- */}
      <h2> Productos </h2>
      {loadingProducto ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="container">
          {productos.map(p => (
            <div className="card mb-3 p-3 shadow-sm" key={p.ID_producto}>
              <p><strong>Producto:</strong> {p.Nombre_producto}</p>
              <p><strong>Marca:</strong> {p.Marca}</p>
              <p><strong>Precio:</strong> {p.Precio}</p>
              <p><strong>Garantía:</strong> {p.Garantia} meses</p>
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* --- Sección Proveedores --- */}
      <h2> Proveedores </h2>
      {loadingProveedor ? (
        <p>Cargando proveedores...</p>
      ) : (
        <div className="container">
          {proveedores.map(p => (
            <div className="card mb-3 p-3 shadow-sm" key={p.ID_proveedor}>
              <p><strong>Empresa:</strong> {p.Nombre_empresa}</p>
              <p><strong>Teléfono:</strong> {p.Teléfono}</p>
              <p><strong>Email:</strong> {p.Correo_electronico}</p>
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* --- Sección Soporte Técnico --- */}
      <h2> Soporte Técnico </h2>
      {loadingSoporte ? (
        <p>Cargando soporte técnico...</p>
      ) : (
        <div className="container">
          {soportes.map(s => (
            <div className="card mb-3 p-3 shadow-sm" key={s.ID_soporte}>
              <p><strong>Problema:</strong> {s.Descripcion_problema}</p>
              <p><strong>Solicitud:</strong> {new Date(s.Fecha_solicitud).toLocaleDateString("es-CO")}</p>
              {s.Fecha_resolucion && (
                <p><strong>Resolución:</strong> {new Date(s.Fecha_resolucion).toLocaleDateString("es-CO")}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <hr />

      {/* --- Sección Usuarios --- */}
      <h2> Usuarios </h2>
      {loadingUsuario ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="container">
          {usuarios.map(u => (
            <div className="card mb-3 p-3 shadow-sm" key={u.ID_usuario}>
              <p><strong>Nombre:</strong> {u.Nombre}</p>
              <p><strong>Email:</strong> {u.Correo_electronico}</p>
              <p><strong>Rol:</strong> {u.Rol_usuario}</p>
              <p><strong>Documento:</strong> {u.Tipo_documento} {u.Numero_documento}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
