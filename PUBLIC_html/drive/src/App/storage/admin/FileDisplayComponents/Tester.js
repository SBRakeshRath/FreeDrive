import React from "react";
const Tester = React.memo(({data,impRef})=>{
    const testerRef = React.useRef(null)
    console.log()
    React.useEffect(()=>{
        console.log("Tester 00000000000000000 useEffect");
        // console.log(section);
        console.log(data);
        console.log(impRef);
        console.log(testerRef);
    })
    console.log("Tester Component ========================================")
    return <h1 ref = {testerRef}> Tester</h1>
  })
  export default Tester