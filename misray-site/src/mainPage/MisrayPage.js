
import {Box} from "@mui/material";
import {useSpring as Spring,animated} from "@react-spring/web";
import {useEffect, useState} from "react";


const MisrayPage=()=>{

    const [click,setClick]=Spring(()=>({
        from:{x:0,y:0},
    }))

    const handleclick=()=>{
        setClick.start({
            from:{x:0,y:0},
            to:{x:900,y:500},
        })
    }

    return(


    <Box >
        <animated.div
            onClick={handleclick}
            style={{
                width: 80,
                height: 80,
                background: '#ff6d6d',
                borderRadius: 8,
                ...click,
            }}
        />
    </Box>

    )
}

export default MisrayPage;