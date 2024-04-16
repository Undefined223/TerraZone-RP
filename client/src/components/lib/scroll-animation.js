import gsap from "gsap";
import { useEffect } from "react";


export const scrollAnimation = (position, target, onUpdate) => {
    const tl = gsap.timeline();

    tl.to(position, {
        x: 2.1711933512,
        y: 12.5323708234,
        z: 1.0227330534,
        scrollTrigger: {
            trigger: '.AboutUs',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: false
        },
        onUpdate
    })
    tl.to(target, {
        x: 2.2375413962,
        y: 0.0000007599,
        z: 0.2824674798,
        scrollTrigger: {
            trigger: '.AboutUs',
            start: 'top bottom',
            end: 'top top',
            scrub: 2,
            immediateRender: false
        },

    })
        .to('.AboutUs', {
            opacity: 0,
            scrollTrigger: {
                trigger: '.AboutUs',
                start: 'top bottom',
                end: 'top top',
                scrub: 5,
                immediateRender: false
            },
            onUpdate
        })
        .to('.AboutUs', {
            opacity: 1,
            scrollTrigger: {
                trigger: '.AboutUs',
                start: 'top bottom',
                end: 'top top',
                scrub: 5,
                immediateRender: false
            },
        })






        }