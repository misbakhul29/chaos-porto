"use client";

import { Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Projectile {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
}

interface Entity {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: "enemy";
    size: number;
    rotation: number;
    rotationSpeed: number;
    health: number;
    createdAt: number;
}

interface Explosion {
    id: number;
    x: number;
    y: number;
    color: string;
}

interface ComboPopup {
    id: number;
    x: number;
    y: number;
    text: string;
}

export default function SpaceshipCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [projectiles, setProjectiles] = useState<Projectile[]>([]);
    const [entities, setEntities] = useState<Entity[]>([]);
    const [explosions, setExplosions] = useState<Explosion[]>([]);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [comboPopups, setComboPopups] = useState<ComboPopup[]>([]);
    const [isPlaying, setIsPlaying] = useState(true);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const [shipRotation, setShipRotation] = useState(0);
    const lastPos = useRef({ x: 0, y: 0 });
    const lastKillTime = useRef<number>(0);
    const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const bgmRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        bgmRef.current = new Audio("/sounds/good_b_music-perfect-beauty-191271.mp3");
        if (bgmRef.current) {
            bgmRef.current.loop = true;
            bgmRef.current.volume = 0.4;
        }
        return () => {
            if (bgmRef.current) {
                bgmRef.current.pause();
                bgmRef.current = null;
            }
        };
    }, []);

    const toggleMusic = () => {
        if (!bgmRef.current) return;
        if (isPlaying) {
            bgmRef.current.pause();
        } else {
            bgmRef.current.play().catch(() => { });
        }
        setIsPlaying(!isPlaying);
    };

    const handleKill = useCallback((enemyX: number, enemyY: number) => {
        const now = Date.now();
        const timeSinceLastKill = now - lastKillTime.current;
        lastKillTime.current = now;

        setCombo(prev => {
            const nextCombo = timeSinceLastKill < 2000 ? prev + 1 : 1;
            setScore(s => s + (10 * nextCombo));

            if (nextCombo > 1) {
                const popupId = Math.random();
                setComboPopups(p => [...p, { id: popupId, x: enemyX, y: enemyY, text: `+${nextCombo} COMBO` }]);
                setTimeout(() => {
                    setComboPopups(p => p.filter(item => item.id !== popupId));
                }, 800);
            }
            return nextCombo;
        });

        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
        comboTimeoutRef.current = setTimeout(() => {
            setCombo(0);
        }, 2000);
    }, []);

    useAnimationFrame((time, delta) => {
        if (typeof window === "undefined") return;

        setProjectiles(prev => prev.map(p => ({
            ...p,
            x: p.x + p.vx * (delta / 16),
            y: p.y + p.vy * (delta / 16)
        })).filter(p => p.x > -100 && p.x < window.innerWidth + 100 && p.y > -100 && p.y < window.innerHeight + 100));

        setEntities(prev => prev.map(e => ({
            ...e,
            x: e.x + e.vx * (delta / 16),
            y: e.y + e.vy * (delta / 16),
            rotation: e.rotation + e.rotationSpeed * (delta / 16)
        })).filter(e =>
            e.x > -200 && e.x < window.innerWidth + 200 &&
            e.y > -200 && e.y < window.innerHeight + 200 &&
            (Date.now() - e.createdAt < 3000)
        ));

        setProjectiles(currentProjectiles => {
            let hitProjectileIds = new Set<number>();
            setEntities(currentEntities => {
                let newEntities = [...currentEntities];
                let hitEntityIds = new Set<number>();
                currentProjectiles.forEach(p => {
                    newEntities.forEach((e) => {
                        const dist = Math.hypot(p.x - e.x, p.y - e.y);
                        if (dist < e.size / 2 + 10) {
                            hitProjectileIds.add(p.id);
                            e.health -= 1;
                            if (e.health <= 0) {
                                hitEntityIds.add(e.id);
                                createExplosion(e.x, e.y, "var(--color-hot-pink)");
                                handleKill(e.x, e.y);
                            }
                        }
                    });
                });
                return newEntities.filter(e => !hitEntityIds.has(e.id));
            });
            return currentProjectiles.filter(p => !hitProjectileIds.has(p.id));
        });
    });

    const createExplosion = (x: number, y: number, color: string) => {
        const id = Math.random();
        setExplosions(prev => [...prev, { id, x, y, color }]);
        setTimeout(() => setExplosions(prev => prev.filter(exp => exp.id !== id)), 500);
    };

    const spawnEntity = useCallback(() => {
        if (typeof window === "undefined" || !isVisible) return;
        const type = "enemy"; const size = 40;
        let spawnX, spawnY, vx, vy;
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { spawnX = Math.random() * window.innerWidth; spawnY = -size; vx = (Math.random() - 0.5) * 2; vy = 1 + Math.random() * 2; }
        else if (side === 1) { spawnX = window.innerWidth + size; spawnY = Math.random() * window.innerHeight; vx = -(1 + Math.random() * 2); vy = (Math.random() - 0.5) * 2; }
        else if (side === 2) { spawnX = Math.random() * window.innerWidth; spawnY = window.innerHeight + size; vx = (Math.random() - 0.5) * 2; vy = -(1 + Math.random() * 2); }
        else { spawnX = -size; spawnY = Math.random() * window.innerHeight; vx = 1 + Math.random() * 2; vy = (Math.random() - 0.5) * 2; }
        setEntities(prev => [...prev, { id: Math.random(), x: spawnX, y: spawnY, vx, vy, type, size, rotation: Math.random() * 360, rotationSpeed: (Math.random() - 0.5) * 5, health: 2, createdAt: Date.now() }]);
    }, [isVisible]);

    useEffect(() => {
        const interval = setInterval(spawnEntity, 2000);
        return () => clearInterval(interval);
    }, [spawnEntity]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            
            // Auto-start music on first interaction if enabled
            if (isPlaying && bgmRef.current && bgmRef.current.paused) {
                bgmRef.current.play().catch(() => {});
            }

            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) { setShipRotation(Math.atan2(dy, dx) * (180 / Math.PI) + 90); }
            mouseX.set(e.clientX); mouseY.set(e.clientY);
            lastPos.current = { x: e.clientX, y: e.clientY };
        };

        const shootSound = typeof Audio !== "undefined" ? new Audio("/sounds/35686__jobro__laser9.wav") : null;
        const handleClick = (e: MouseEvent) => {
            if (e.button === 0) {
                if (shootSound) { const sound = shootSound.cloneNode() as HTMLAudioElement; sound.volume = 0.2; sound.play().catch(() => { }); }
                const rad = (shipRotation * Math.PI) / 180; const speed = 15;
                setProjectiles(prev => [...prev, { id: Math.random(), x: mouseX.get(), y: mouseY.get(), vx: Math.sin(rad) * speed, vy: -Math.cos(rad) * speed, rotation: shipRotation }]);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleClick);
        return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mousedown", handleClick); };
    }, [mouseX, mouseY, isVisible, shipRotation]);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* HUD */}
            <div className="absolute top-20 right-8 flex flex-col items-end gap-3 font-glitch select-none mix-blend-difference">
                <div className="flex gap-6 items-center">
                    {/* Score with Scanner Effect */}
                    <div className="relative py-2 px-4 border-r-4 border-acid-green bg-acid-green/5 group">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-dirty-white"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-acid-green"></div>

                        <div className="text-[10px] font-mono text-dirty-white/40 mb-1 tracking-[0.2em]">STATUS_CONNECTED</div>
                        <div className="text-dirty-white text-3xl tracking-tighter leading-none">
                            <span className="opacity-50 text-xs mr-2 font-mono">SC:</span>
                            <span className="text-acid-green">{score.toString().padStart(6, '0')}</span>
                        </div>

                        {/* Glitch lines */}
                        <div className="absolute -left-1 top-1/4 w-[2px] h-1/2 bg-hot-pink/50 animate-pulse"></div>
                    </div>

                    {/* Audio Toggle - Refined */}
                    <button
                        onClick={toggleMusic}
                        className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 border border-dirty-white/30 hover:border-acid-green transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-acid-green/0 group-hover:bg-acid-green/10 transition-colors"></div>
                        <div className="relative z-10">
                            {isPlaying ? (
                                <Volume2 className="text-dirty-white group-hover:text-acid-green transition-colors" size={20} />
                            ) : (
                                <VolumeX className="text-hot-pink group-hover:scale-110 transition-transform" size={20} />
                            )}
                        </div>

                        {/* Diagonal corner cut */}
                        <div className="absolute top-0 right-0 w-3 h-3 bg-dirty-white/20 -rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                    </button>
                </div>

                <AnimatePresence>
                    {combo > 1 && (
                        <motion.div
                            initial={{ x: 50, opacity: 0, skewX: 20 }}
                            animate={{ x: 0, opacity: 1, skewX: -10 }}
                            exit={{ x: 50, opacity: 0 }}
                            className="text-white text-4xl font-medium italic"
                        >
                            {combo}X_MULT
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Projectiles */}
            {projectiles.map(p => (
                <div key={p.id} className="absolute bg-acid-green shadow-[0_0_10px_var(--color-acid-green)] rounded-full" style={{ width: 4, height: 20, left: p.x, top: p.y, transform: `translate(-50%, -50%) rotate(${p.rotation}deg)` }} />
            ))}

            {/* Enemies */}
            {entities.map(e => {
                const age = Date.now() - e.createdAt;
                const opacity = age > 2000 ? Math.max(0, 1 - (age - 2000) / 1000) : 1;
                return (
                    <div key={e.id} className="absolute flex items-center justify-center" style={{ left: e.x, top: e.y, width: e.size, height: e.size, transform: `translate(-50%, -50%) rotate(${e.rotation}deg)`, opacity }}>
                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-[0_0_8px_var(--color-hot-pink)]">
                            <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="black" stroke="var(--color-hot-pink)" strokeWidth="2" />
                            <circle cx="12" cy="12" r="3" fill="var(--color-hot-pink)" />
                        </svg>
                    </div>
                );
            })}

            {/* Popups & Explosions */}
            <AnimatePresence>
                {comboPopups.map(pop => (
                    <motion.div key={pop.id} initial={{ y: pop.y, x: pop.x, opacity: 1, scale: 0.5 }} animate={{ y: pop.y - 100, opacity: 0, scale: 1.5 }} className="absolute font-glitch text-acid-green text-xl whitespace-nowrap pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}>
                        {pop.text}
                    </motion.div>
                ))}
            </AnimatePresence>
            <AnimatePresence>
                {explosions.map(exp => (
                    <motion.div key={exp.id} initial={{ scale: 0, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }} className="absolute w-10 h-10 border-2 rounded-full" style={{ left: exp.x, top: exp.y, borderColor: exp.color, transform: 'translate(-50%, -50%)' }} />
                ))}
            </AnimatePresence>

            {/* Spaceship */}
            <motion.div className="fixed top-0 left-0 z-[10000] pointer-events-none" style={{ x, y, opacity: isVisible ? 1 : 0, translateX: "-50%", translateY: "-50%", }}>
                <motion.div animate={{ rotate: shipRotation }} className="relative">
                    <div className="absolute inset-0 bg-electric-blue/20 blur-xl rounded-full scale-150 animate-pulse"></div>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_var(--color-acid-green)]">
                        <path d="M12 2L4 21L12 17L20 21L12 2Z" fill="black" stroke="var(--color-acid-green)" strokeWidth="2" />
                        <path d="M12 17V12" stroke="var(--color-hot-pink)" strokeWidth="2" strokeLinecap="round" />
                        <motion.path animate={{ opacity: [0.6, 1, 0.6], scaleY: [1, 1.8, 1] }} transition={{ duration: 0.05, repeat: Infinity }} d="M8 21L12 25L16 21" stroke="var(--color-electric-blue)" strokeWidth="2" fill="var(--color-electric-blue)" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
}
