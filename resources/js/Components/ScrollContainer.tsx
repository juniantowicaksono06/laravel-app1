import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { useState, useRef } from "react"
import { RootState } from "../Store/store"
const ScrollContainer = (props:  {
    children: React.ReactNode
}) => {

    const containerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

    let mobileBottomBarHeight = useSelector<RootState, number>((state) => state.appView.mobileBottomBarHeight)
    let [containerHeight, setContainerHeight] = useState(0)
    function calculateViewHeight() {
        const windowHeight = window.innerHeight
        let result = window.innerHeight
        if(window.innerWidth < 992) {
            result -= mobileBottomBarHeight
        }
        setContainerHeight(result)
    }

    useEffect(() => {
        calculateViewHeight()
        window.addEventListener('resize', () => {
            calculateViewHeight()
        })
    }, [])


    return (
        <>
            <div className="px-5 scroll-container" ref={containerRef} style={{
                height: `${containerHeight}px`
            }}>
                {props.children}
            </div>
        </>
    )
}

export default ScrollContainer