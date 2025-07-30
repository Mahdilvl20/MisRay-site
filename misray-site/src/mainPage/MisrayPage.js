import { useSpring, animated, config, useTrail } from '@react-spring/web'
import React, { useMemo } from 'react'

const MisrayPage = () => {
    const [flip, setFlip] = React.useState(false)

    // انیمیشن چرخش کارت
    const { transform, opacity } = useSpring({
        opacity: flip ? 1 : 0,
        transform: `perspective(600px) rotateX(${flip ? 180 : 0}deg)`,
        config: config.molasses,
    })

    // انیمیشن کانفی‌ها
    const confetti = useSpring({
        from: { y: -100, opacity: 0 },
        to: { y: 0, opacity: 1 },
        delay: 1000,
        config: config.wobbly,
    })

    // ذرات نورافشان
    const particles = useMemo(() =>
            Array.from({ length: 80 }).map(() => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 1,
                delay: Math.random() * 3000,
                duration: Math.random() * 5000 + 3000,
            }))
        , [])

    // انیمیشن ذرات نورافشان
    const [particleSprings] = useTrail(particles.length, index => ({
        from: { opacity: 0 },
        to: { opacity: 0.7 },
        delay: particles[index].delay,
        config: { duration: particles[index].duration },
        loop: { reverse: true },
    }))

    // گرادیان متحرک پس‌زمینه
    const gradientProps = useSpring({
        from: { backgroundPosition: '0% 50%' },
        to: { backgroundPosition: '100% 50%' },
        config: { duration: 20000 },
        loop: { reverse: true },
    })

    React.useEffect(() => {
        setFlip(true)
    }, [])

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            {/* پس‌زمینه گرادیان متحرک */}
            <animated.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(-45deg, #ff0080, #ff8c00, #40e0d0)',
                    backgroundSize: '400% 400%',
                    ...gradientProps,
                    zIndex: 0,
                }}
            />

            {/* ذرات نورافشان */}
            {particleSprings.map((props, i) => (
                <animated.div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: `${particles[i].x}%`,
                        top: `${particles[i].y}%`,
                        width: `${particles[i].size}px`,
                        height: `${particles[i].size}px`,
                        background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0))',
                        borderRadius: '50%',
                        ...props,
                        zIndex: 1,
                    }}
                />
            ))}

            {/* کارت اصلی */}
            <div
                className="card-container"
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '300px',
                    height: '400px',
                    cursor: 'pointer',
                }}
                onClick={() => setFlip(!flip)}
            >
                <animated.div
                    className="card-front"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backfaceVisibility: 'hidden',
                        opacity: opacity.to(o => 1 - o),
                        transform,
                    }}
                >
                    <h2 style={{ color: '#333', fontSize: '24px' }}>برای شما</h2>
                </animated.div>

                <animated.div
                    className="card-back"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backfaceVisibility: 'hidden',
                        opacity,
                        transform,
                        rotateX: '180deg',
                    }}
                >
                    <h1 style={{ color: '#ff0080', fontSize: '32px', marginBottom: '30px' }}>تولدت مبارک!</h1>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <animated.div style={{ ...confetti, fontSize: '30px' }}>🎊</animated.div>
                        <animated.div style={{ ...confetti, delay: 1200, fontSize: '30px' }}>🎈</animated.div>
                        <animated.div style={{ ...confetti, delay: 1400, fontSize: '30px' }}>🎁</animated.div>
                    </div>
                </animated.div>
            </div>
        </div>
    )
}

export default MisrayPage