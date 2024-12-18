import { useState, useEffect } from 'react';

const products = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honey'
]

function Buscador() {
  const [termino, setTermino] = useState('');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [items, setItems] = useState([])

  useEffect(() => {
    if (termino === '') {
      setResultado(null);
      return;
    }

    setResultado(`Resultados para "${termino}"`);
    setItems(products.filter(product => product.toLowerCase().includes(termino)))
  }, [termino]);

  return (
    <div>
      <input
        type="text"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="Escribe algo para buscar"
      />
      {cargando && <p>Cargando...</p>}
      {resultado && <p>{resultado}</p>}
      <ul>
        {items.map(item => (
          <li><a href="#">{item}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default Buscador;
