import React from 'react';
import ReactLoading from "react-loading";

const Loading = () => {
    return(
        <>
           <div style={{ "marginLeft" : "50%" , "marginTop" : "22%"}}>
            <ReactLoading  type="spin" color="#0000FF"
                height={100} width={80} />
            </div>
        </>
    )
}

export default Loading;