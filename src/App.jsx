import { useEffect, useState } from 'react';

function App() {
  const [compras, setCompras] = useState([]);
  const [entrega, setEntrega] = useState([]);
  const [loadingCompras, setLoadingCompras] = useState(true);
  const [loadingEntrega, setLoadingEntrega] = useState(true);

  // ----- Fetch Compras -----
  const fetchCompras = async () => {
    try { 
      const response = await fetch('http://localhost:3001/api/compras');
      if (!response.ok) {
        throw new Error(`Error al obtener las compras: ${response.statusText}`);
      }
      const data = await response.json();
      setCompras(data); 
    } catch (error) {
      console.log('Error al obtener las compras!!', error);
    } finally {
      setLoadingCompras(false);
    }
  };

  // ----- Fetch Entregas -----
  const fetchEntrega = async () => {
    try { 
      const response = await fetch('http://localhost:3001/api/entrega');
      if (!response.ok) {
        throw new Error(`Error al obtener las entregas: ${response.statusText}`);
      }
      const data = await response.json();
      setEntrega(data); 
    } catch (error) {
      console.log('Error al obtener las entregas!!', error);
    } finally {
      setLoadingEntrega(false);
    }
  };

  useEffect(() => {
    fetchCompras();
    fetchEntrega();
  }, []);

  return (
    <div className="container m-5">
      <h1>Ecoenergix</h1>
      <hr/>

      {/* --- Sección Compras --- */}
      <h2>Compras</h2>
      {loadingCompras ? (
        <p>Cargando compras...</p>
      ) : (
        <div className="container">
          {compras.map(c => (
            <div className="card mb-3 p-3 shadow-sm" key={c.ID_compra}>
              <h3><strong>Usuario:</strong> {c.ID_usuario}</h3>
              <p><strong>Fecha:</strong> {new Date(c.Fecha_compra).toLocaleDateString("es-CO")}</p>
              <p>
                <strong>Monto:</strong>{' '}
                {c.Monto_total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
              </p>
              <p><strong>Estado:</strong> {c.Estado}</p>
            </div> 
          ))}
        </div>
      )}

      <hr/>

      {/* --- Sección Entregas --- */}
      <h2>Entregas</h2>
      {loadingEntrega ? (
        <p>Cargando entregas...</p>
      ) : (
        <div className="container">
          {entrega.map(e => (
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
    </div>
  );
}

export default App;
