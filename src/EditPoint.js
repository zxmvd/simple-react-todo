import React, { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import FiberNewIcon from '@material-ui/icons/FiberNew';
const EditPoint =({handleEdit, points, index})=>{
    const [ editPoint, setEditPoint ] = useState(points)
    const [ editVisibility, setEditVisibility ] = useState(false)
    
    let inputStyle = editVisibility? {display:''}:{display:'none'}

    const handleNewPoints =(e)=>{
        console.log('clicked new points')
        e.preventDefault()
        setEditVisibility(false)
        handleEdit(index, editPoint)
    }

console.log(index)

return (

    <div>
        <div>
        <input 
        value={editPoint}
        type='number'
        placeholder='new point'
        style={inputStyle}
        onChange={({target})=>setEditPoint(target.value)}
        />
        <IconButton 
        style={inputStyle}
        onClick={(e)=>handleNewPoints(e)}
        >
          <FiberNewIcon/>
        </IconButton>
        <IconButton onClick={()=>setEditVisibility(!editVisibility)}>
          <EditIcon/>
        </IconButton>
        </div>
    </div>


)

}

export default EditPoint