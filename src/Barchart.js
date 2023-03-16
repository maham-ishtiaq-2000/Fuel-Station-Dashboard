import React,{useRef,useState} from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import {Bar , getElementsAtEvent} from 'react-chartjs-2';
import Tables from './Tables';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const Barchart = (props) =>{
    console.log(props.minDate)
    console.log(props.maxDate)
    console.log(props.graphName)
    let graphName = props.graphName
    //console.log(props.newObjs1)
    //console.log(props.newObjs2)
    let [deptNames , setDeptNames] = useState("");
    let department = props.department[0]
    let grossCostArr = props.grossCostArr
     department = department
    //console.log(department)
    //console.log(grossCostArr)
    let data = {
        labels : department,
        datasets : [{
            label : graphName,
            data : grossCostArr,
            borderColor : 'black',
            backgroundColor : ['blue' , 'aqua'  ],
            borderWidth : 1
        }]
    }

    const options = {

    }

    const chartRef = useRef();
    const onClick = (event) => {
        if (getElementsAtEvent(chartRef.current , event).length > 0){
            const datasetIndexNum = getElementsAtEvent(chartRef.current , event)[0].datasetIndex;
            const dataPoint = getElementsAtEvent(chartRef.current , event)[0].index;
            //console.log(data.labels[dataPoint])
            setDeptNames(data.labels[dataPoint])
        }
        
    }

    //console.log(deptNames)

    return(
        <>
            <br></br>
         
            <div style={ { padding : '20px'}}>
                <p style={{"color" : "blue" , "fontWeight" : "bold" , "marginLeft" : "35%" , "marginTop" : "2%" , "marginBottom" : "2%"}}>{graphName} between {props.minDate} and {props.maxDate}</p>
                <br></br>
                <Bar
                    data={data}
                    options = {options}
                    onClick = {onClick}
                    ref = {chartRef}
                ></Bar>
            </div>
            <p style={{"marginLeft" : "17%" , "color" : "blue" , "marginTop" : "2%" , "marginBottom" : "5%"}}>Note : Press on the bar of the department whose data you want to display between the selected data.</p>
            <Tables  deptNames={deptNames} newjobs={props.newObjs1} name={props.graphName}></Tables>
        </>
    )
}

export default Barchart;