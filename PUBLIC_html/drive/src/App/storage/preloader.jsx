// eslint-disable-next-line no-unused-vars
import React , {useRef} from 'react';
import "./preloader.scss"

const Preloader = (props)=>{
  console.log("preloader")
    console.log(props.display);
// const preloader = useRef(null);
    return (
<div className="preloader" style = {{display:props.display}}>
<div className="wrap">
  <div className="loading">
    <div className="bounceball" />
    <div className="text">NOW LOADING</div>
  </div>
</div>

</div>

    )
}
export default Preloader;