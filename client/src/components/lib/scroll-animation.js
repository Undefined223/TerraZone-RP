import gsap from "gsap";
import { useEffect } from "react";


export const scrollAnimation = (position, target, onUpdate) => {
    const tl = gsap.timeline();



    tl.to(position, {
        x: 2.1664597729,
        y: 10.53455727,
        z: 7.3194134059,
        scrollTrigger: {
            trigger: '.AboutUs',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: true,
            markers: false
        },
        onUpdate
    })
    tl.to(target, {
        x: 2.1630161245,
        y: 0.1679520623,
        z: 0.3070744505,
        scrollTrigger: {
            trigger: '.AboutUs',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: true
        },

    })







}