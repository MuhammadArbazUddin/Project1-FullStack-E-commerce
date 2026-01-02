import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [images, setImages] = useState([false, false, false, false])
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img)
      })

      // --- DEBUGGING: LOG FRONTEND DATA ---
      console.log("--- Frontend FormData Content ---");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(backendUrl + "/api/products/add", formData, { headers: { token } })

      console.log("Backend Response:", response.data);

      if (response.data.success) {
        toast.success(response.data.message)
        setName(''); setDescription(''); setPrice('');
        setImages([false, false, false, false]); setSizes([]);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
        console.error("Submission Error:", error);
        toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 text-gray-600'>
      
      <div>
        <p className='mb-2 font-medium'>Upload Images</p>
        <div className='flex gap-2'>
          {images.map((img, index) => (
            <label key={index} htmlFor={`image${index + 1}`} className='cursor-pointer'>
              <img 
                className='w-20 h-20 object-cover border-2 border-dashed border-gray-300 rounded' 
                src={!img ? assets.upload_area : URL.createObjectURL(img)} 
                alt="" 
              />
              <input 
                onChange={(e) => handleImageChange(e, index)} 
                type="file" 
                id={`image${index + 1}`} 
                hidden 
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2 font-medium'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border rounded' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2 font-medium'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border rounded' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div className='flex-1 max-w-[500px]'>
          <p className='mb-2 font-medium'>Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 border rounded'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className='flex-1 max-w-[500px]'>
          <p className='mb-2 font-medium'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2 border rounded'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className='flex-1 max-w-[500px]'>
          <p className='mb-2 font-medium'>Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 border rounded sm:w-[120px]' type="Number" placeholder='25' required />
        </div>
      </div>

      <div>
        <p className='mb-2 font-medium'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} onClick={() => toggleSize(size)}>
              <p className={`${sizes.includes(size) ? "bg-pink-100 border-pink-400" : "bg-slate-200"} px-3 py-1 cursor-pointer border rounded transition-all`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2 items-center'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='w-4 h-4' />
        <label className='cursor-pointer font-medium' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white rounded active:bg-gray-700 transition-colors uppercase font-bold'>ADD</button>
    </form>
  )
}

export default Add