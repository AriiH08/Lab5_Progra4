import { useState } from 'react'
import './App.css'

interface Producto {
  descripcion: string
}

function App() {
  const [productoContexto, setProductoContexto] = useState('')
  const [productoList, setProductList] = useState<Producto[]>([])
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const handleChange = (e: any) => {
    setProductoContexto(e.target.value)
  }

  const handleAdd = () => {
    if (productoContexto.trim() === '') return
    const newProducto: Producto = {
      descripcion: productoContexto,
    }
    setProductList([newProducto, ...productoList])
    setProductoContexto('')
  }

  const handleUpdate = () => {
    if (editIndex === null || productoContexto.trim() === '') return
    const updatedList = [...productoList]
    updatedList[editIndex].descripcion = productoContexto
    setProductList(updatedList)
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

  const handleSelect = (index: number) => {
    setEditIndex(index)
    setProductoContexto(productoList[index].descripcion)
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
