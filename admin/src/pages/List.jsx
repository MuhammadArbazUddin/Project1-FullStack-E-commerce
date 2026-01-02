import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/products/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.post(backendUrl + '/api/products/remove', { id }, { headers: { token } })
        if (response.data.success) {
          toast.success(response.data.message)
          await fetchList();
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='p-4 sm:p-0'>
      <div className='flex items-center justify-between mb-4'>
        <p className='text-xl font-semibold text-gray-800'>All Products List</p>
        <span className='bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-600'>
          Total: {list.length}
        </span>
      </div>

      <div className='flex flex-col gap-2'>
        {/* ------- Table Header: Only visible on Medium+ screens ------- */}
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr_0.5fr] items-center py-3 px-4 border bg-gray-50 text-gray-700 font-bold text-sm rounded-t-lg shadow-sm'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Sub Category</span>
          <span>Price</span>
          <span className='text-center'>Sizes</span>
          <span className='text-right'>Action</span>
        </div>

        {/* ------- Product Rows ------- */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div 
              key={index} 
              className='grid  grid-cols-[1fr_2fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr_0.5fr] items-center gap-4 py-3 px-4 border border-gray-700 hover:bg-gray-50 transition-all rounded-lg md:rounded-none shadow-sm md:shadow-none bg-white'
            >
              {/* Image */}
              <img 
                className='w-14 h-14 object-contain rounded bg-gray-50 border' 
                src={item.images[0]} 
                alt={item.name} 
              />

              {/* Name */}
              <div className='flex flex-col'>
                <p className='font-medium text-gray-800 truncate'>{item.name}</p>
                <p className='md:hidden text-xs text-gray-500'>{item.category} | {item.subCategory}</p>
              </div>

              {/* Desktop Only Columns */}
              <p className='hidden md:block text-gray-600'>{item.category}</p>
              <p className='hidden md:block text-gray-600 text-xs'>{item.subCategory}</p>
              
              {/* Price (Visible on mobile too) */}
              <p className='text-gray-800 font-semibold md:font-normal'>
                {currency}{item.price}
              </p>

              {/* Sizes (Desktop Only) */}
              <div className='hidden md:flex flex-wrap gap-1 justify-center'>
                 {item.size.map((s, i) => (
                   <span key={i} className='bg-gray-200 text-[10px] px-1.5 py-0.5 rounded'>{s}</span>
                 ))}
              </div>

              {/* Delete Button */}
              <div className='flex justify-end'>
                <button 
                  onClick={() => removeProduct(item._id)} 
                  className='text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer'
                  title="Delete Product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300'>
            <p className='text-gray-400 italic'>No products found in the database.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default List