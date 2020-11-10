import React from 'react'
import { CircularProgress } from '@material-ui/core'
import "./loading.css";
const Loading = () => {
    console.log("dfsdo");

    return (
        <div className="loading-modal">
            <CircularProgress color="secondary" />
        </div>
    )
}
export default Loading;