"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Marquee from "./Marquee";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: unknown) => {
        setIsSubmitting(true);
        setIsError(false);

        const accessKey = process.env.NEXT_PUBLIC_W3_FORMS_ACCESS_KEY;

        if (!accessKey) {
            console.error("Access Key missing!");
            setIsError(true);
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey, 
                    name: (data as Record<string, unknown>).name as string,
                    email: (data as Record<string, unknown>).email as string,
                    message: (data as Record<string, unknown>).message as string,
                    subject: "New Message from Chaos Portfolio",
                }),
            });

            const result = await res.json();

            if (result.success) {
                setIsSuccess(true);
                reset();
                setTimeout(() => setIsSuccess(false), 5000);
            } else {
                console.error("Web3Forms Error:", result);
                setIsError(true);
            }
        } catch (err) {
            console.error("Network Error:", err);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center overflow-hidden">
            <Marquee />

            <section id="contact" className="max-w-2xl mx-auto px-6 py-16 relative flex flex-col items-center justify-center">
                <div className="font-glitch text-6xl md:text-[6rem] text-dirty-white opacity-10 z-0 select-none pointer-events-none overflow-hidden leading-none">
                    CONNECT
                </div>

                <div className="relative bg-void-black border-2 border-dirty-white p-6 md:p-8 shadow-[10px_10px_0px_var(--color-electric-blue)] z-10">
                    {/* Tape Decoration */}
                    <div className="tape -top-3 left-1/2 -translate-x-1/2 scale-75"></div>
                    <div className="tape bottom-3 -right-3 rotate-45 bg-hot-pink/50 scale-75"></div>

                    <div className="mb-6 text-center">
                        <h2 className="font-glitch text-4xl md:text-5xl text-dirty-white mb-1">
                            DROP_A_<span className="text-acid-green">SIGNAL</span>
                        </h2>
                        <p className="font-mono text-xs md:text-sm text-dirty-white/70">
                            {`// Interested in collaboration? Send encrypted data.`}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative group">
                            <label className="block font-mono text-[10px] font-bold text-hot-pink mb-1 uppercase tracking-widest">
                                [01] Identity / Name
                            </label>
                            <input
                                type="text"
                                placeholder="Who are you?"
                                {...register("name", { required: true })}
                                className={`
                w-full bg-white/5 border border-dirty-white/30 p-3 
                text-dirty-white font-sans text-sm outline-none
                focus:border-acid-green focus:bg-white/10 transition-all
                placeholder:text-dirty-white/20
                ${errors.name ? "border-hot-pink animate-pulse" : ""}
              `}
                            />
                            {errors.name && (
                                <span className="absolute right-0 top-0 text-hot-pink text-[10px] font-mono font-bold">
                                    * REQUIRED
                                </span>
                            )}
                        </div>

                        <div className="relative group">
                            <label className="block font-mono text-[10px] font-bold text-electric-blue mb-1 uppercase tracking-widest">
                                [02] Frequency / Email
                            </label>
                            <input
                                type="email"
                                placeholder="where@to.reply"
                                {...register("email", {
                                    required: true,
                                    pattern: /^\S+@\S+$/i
                                })}
                                className={`
                w-full bg-white/5 border border-dirty-white/30 p-3 
                text-dirty-white font-sans text-sm outline-none
                focus:border-electric-blue focus:bg-white/10 transition-all
                placeholder:text-dirty-white/20
                ${errors.email ? "border-hot-pink animate-pulse" : ""}
              `}
                            />
                            {errors.email && (
                                <span className="absolute right-0 top-0 text-hot-pink text-[10px] font-mono font-bold">
                                    * INVALID
                                </span>
                            )}
                        </div>

                        <div className="relative group">
                            <label className="block font-mono text-[10px] font-bold text-acid-green mb-1 uppercase tracking-widest">
                                [03] Packet / Message
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Initiate handshake protocol..."
                                {...register("message", { required: true })}
                                className={`
                w-full bg-white/5 border border-dirty-white/30 p-3 
                text-dirty-white font-sans text-sm outline-none resize-none
                focus:border-acid-green focus:bg-white/10 transition-all
                placeholder:text-dirty-white/20
                ${errors.message ? "border-hot-pink animate-pulse" : ""}
              `}
                            ></textarea>
                            {errors.message && (
                                <span className="absolute right-0 top-0 text-hot-pink text-[10px] font-mono font-bold">
                                    * EMPTY
                                </span>
                            )}
                        </div>

                        <input type="checkbox" className="hidden" style={{ display: 'none' }} {...register("botcheck")} />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full glitch-btn py-3 text-sm md:text-base font-bold tracking-[0.2em] mt-6 hover:cursor-cell"
                        >
                            {isSubmitting ? "TRANSMITTING..." : "SEND_DATA"}
                        </button>

                        {isSuccess && (
                            <div className="p-3 border border-acid-green bg-acid-green/10 text-acid-green font-mono text-xs text-center animate-in fade-in slide-in-from-bottom-2">
                                <span className="font-bold">✓ SYSTEM:</span> RECEIVED.
                            </div>
                        )}

                        {isError && (
                            <div className="p-3 border border-hot-pink bg-hot-pink/10 text-hot-pink font-mono text-xs text-center animate-in fade-in slide-in-from-bottom-2">
                                <span className="font-bold">⚠ ERROR:</span> FAILED.
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </div>
    );
}