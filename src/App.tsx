import { useState, useEffect } from 'react'
import './App.css'

interface Producto {
  descripcion: string
  sinStock: boolean
  ultimaActualizacion: string | null
}

function App() {
  const [productoContexto, setProductoContexto] = useState('')
  const [productoList, setProductList] = useState<Producto[]>([])
  const [editIndex, setEditIndex] = useState<number | null>(null)

  useEffect(() => {
    const storedList = localStorage.getItem('todoList')
    if (storedList) {
      setProductList(JSON.parse(storedList))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(productoList))
  }, [productoList])

  const handleChange = (e: any) => {
    setProductoContexto(e.target.value)
  }

  const ordenarProductos = (lista: Producto[]) => {
    const conStock = lista.filter(p => !p.sinStock)
    const sinStock = lista.filter(p => p.sinStock)
    return [...conStock, ...sinStock]
  }

  const handleAdd = () => {
    if (productoContexto.trim() === '') return
    const newProducto: Producto = {
      descripcion: productoContexto,
      sinStock: false,
      ultimaActualizacion: null
    }
    const nuevaLista = ordenarProductos([newProducto, ...productoList])
    setProductList(nuevaLista)
    setProductoContexto('')
  }

  const handleUpdate = () => {
    if (editIndex === null || productoContexto.trim() === '') return
    const updatedList = [...productoList]
    updatedList[editIndex].descripcion = productoContexto
    const nuevaLista = ordenarProductos(updatedList)
    setProductList(nuevaLista)
    setEditIndex(null)
    setProductoContexto('')
  }

  const handleRemove = () => {
    if (editIndex === null) return
    const updatedList = [...productoList]
    updatedList.splice(editIndex, 1)
    setProductList(updatedList)
    setEditIndex(null)
    setProductoContexto('')
  }

  const handleClearAll = () => {
    setProductList([])
    setEditIndex(null)
    setProductoContexto('')
  }

  const handleSelect = (index: number) => {
    setEditIndex(index)
    setProductoContexto(productoList[index].descripcion)
  }

  const handleMarkOutOfStock = () => {
    if (editIndex === null) return

    const updatedList = [...productoList]
    const item = updatedList[editIndex]

    if (!item.sinStock) {
      item.sinStock = true
      item.ultimaActualizacion = new Date().toLocaleString()
      const nuevaLista = ordenarProductos(updatedList)
      setProductList(nuevaLista)
    }
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <div>
        <input
          type='text'
          value={productoContexto}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <div style={{ marginTop: 10 }}>
          <button onClick={handleAdd} style={{ marginLeft: 10 }}>Añadir</button>
          <button onClick={handleUpdate} style={{ marginLeft: 10 }}>Actualizar</button>
          <button onClick={handleRemove} style={{ marginLeft: 10 }}>Eliminar</button>
          <button onClick={handleMarkOutOfStock} style={{ marginLeft: 10, backgroundColor: '#ffb6c1' }}>
            Marcar Sin Stock
          </button>
          <button onClick={handleClearAll} style={{ marginLeft: 10, backgroundColor: '#ff5c5c', color: 'white' }}>
            Limpiar Página
          </button>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>Lista de Productos:</div>
      <ul>
        {productoList.map((producto, index) => (
          <li
            key={index}
            onClick={() => handleSelect(index)}
            style={{
              cursor: 'pointer',
              fontWeight: editIndex === index ? 'bold' : 'normal',
            }}
          >
            {producto.descripcion}
            {producto.sinStock && (
              <div style={{ fontSize: '0.8em', color: '#cc0000' }}>
                Sin stock desde: {producto.ultimaActualizacion}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
