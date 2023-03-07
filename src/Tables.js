import React, { useState } from 'react';
import './Table.css'

const Tables = (props) =>{
    //console.log(props.newjobs)
    //console.log(props.deptNames)
    let dataArray = []
    for(let i = 0 ; i < props.newjobs.length ; i++){
        if(props.newjobs[i].deptName == props.deptNames){
            dataArray = dataArray.concat(props.newjobs[i])
        }
    }
    //console.log(dataArray)
    return(
        <>
            <h2 className='headingTable'>{props.deptNames}</h2>
            <table>
            <tr style={{"backgroundColor" : "blue" , "color" : "white"}}>
                        <th>Driver ID</th>
                        <th>{props.name}</th>
                        </tr>
                        {dataArray.map((item) => {
                            return(
                                <tr>
                                <td>{item.driverId}</td>
                                <td>{item.cost}</td>
                                </tr>
                            )
                        })}
                        
                        
                        

            </table>
            
        </>
    )
}

export default Tables;

