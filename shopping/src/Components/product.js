import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/product.css'


function Product(){
    const {id}=useParams();
    console.log(id)
    const [product, setProduct]=useState({})
    useEffect(()=>{
        async function retrieveData(){
            const response=await fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+id,{mode:'cors'})
            const tempData=await response.json()
            console.log(tempData)
            setProduct(tempData)
        }
        retrieveData();
    },[])
    console.log(product)
    return Object.keys(product).length>0?(
        <div className="product">
            <h1>Name:{product.name}</h1>
            <img src={product.preview} alt=''></img>
            <p>Brand:{product.brand}</p>
            <p>Price:{product.price}</p>
        </div>
    ):<div>Loading</div>
}

export default Product