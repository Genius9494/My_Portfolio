"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Errors = Record<string, string>;

export default function ProjectRequestForm() {
    const router = useRouter();
    const containerRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    // Animation عند ظهور الفورم
    useEffect(() => {
        if (!containerRef.current) return;
        const fields = Array.from(containerRef.current.children) as HTMLElement[];
        fields.forEach((field, idx) => {
            gsap.fromTo(
                field,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, delay: idx * 0.1, ease: "power3.out" }
            );
        });
    }, []);

    const validateForm = (formData: FormData) => {
        const newErrors: Errors = {};

        // Required fields
        ["name", "email", "phone", "project_type", "budget", "details"].forEach((field) => {
            if (!formData.get(field)?.toString().trim()) {
                newErrors[field] = "This field is required";
            }
        });

        // Email regex صارم
        const emailValue = formData.get("email")?.toString() || "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gmail|outlook|yahoo)$/i;
        if (emailValue && !emailRegex.test(emailValue)) newErrors.email = "Please enter a valid email";

        // Phone regex
        const phoneValue = formData.get("phone")?.toString() || "";
        const phoneRegex = /^\+?[1-9]\d{7,14}$/;
        if (phoneValue && !phoneRegex.test(phoneValue)) newErrors.phone = "Please enter a valid phone number";

        // File size
        const attachment = formData.get("attachment") as File | null;
        if (attachment && attachment.size > 3 * 1024 * 1024) newErrors.attachment = "File must be ≤ 3MB";

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        const formData = new FormData(e.currentTarget);

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            // Shake effect للحقل الذي فيه خطأ
            Object.keys(validationErrors).forEach((field) => {
                const el = e.currentTarget.querySelector(`[name="${field}"]`) as HTMLElement;
                if (el) gsap.fromTo(el, { x: -5 }, { x: 5, duration: 0.1, repeat: 5, yoyo: true });
            });
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/send-form", { method: "POST", body: formData });
            const data = await res.json();

            if (res.ok) {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    y: -50,
                    duration: 0.8,
                    onComplete: () => {
                        toast.success("Your project request was sent successfully!");
                        router.push("/");
                    },
                });
            } else {
                toast.error(data.error || "Failed to send request");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="forms w-full bg-black text-white flex items-center justify-center py-20 px-6"
        >
            <form
                ref={containerRef}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="w-full max-w-2xl flex flex-col gap-6 p-10 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl"
            >
                {/* Name */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        name="name"
                        placeholder="Enter full name"
                        className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.name}
                        </motion.p>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                        className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.email}
                        </motion.p>
                    )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        type="tel"
                        name="phone"
                        placeholder="+1234567890"
                        className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.phone}
                        </motion.p>
                    )}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="company">Company</Label>
                    <Input name="company" placeholder="Optional" />
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="project_type">Project Type</Label>
                    <select
                        name="project_type"
                        className={`p-3 rounded-lg bg-neutral-800 text-white border border-white/20 focus:outline-none ${errors.project_type ? "border-red-500" : ""
                            }`}
                    >
                        <option value="">Select a type</option>
                        <option value="Website">Website</option>
                        <option value="E-commerce Store">E-commerce Store</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Dashboard / Web App">Dashboard / Web App</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.project_type && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.project_type}
                        </motion.p>
                    )}
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="budget">Budget</Label>
                    <select
                        name="budget"
                        className={`p-3 rounded-lg bg-neutral-800 text-white border border-white/20 focus:outline-none ${errors.budget ? "border-red-500" : ""
                            }`}
                    >
                        <option value="">Select budget</option>
                        <option value="$300 - $700">$300 - $700</option>
                        <option value="$700 - $1500">$700 - $1500</option>
                        <option value="$1500 - $3000">$1500 - $3000</option>
                        <option value="$3000+">$3000+</option>
                    </select>
                    {errors.budget && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.budget}
                        </motion.p>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="details">Project Details</Label>
                    <Textarea
                        name="details"
                        placeholder="Explain your project idea..."
                        className={errors.details ? "border-red-500" : ""}
                    />
                    {errors.details && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.details}
                        </motion.p>
                    )}
                </div>

                {/* Attachment */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="attachment">Attach File (≤3MB)</Label>
                    <Input
                        type="file"
                        name="attachment"
                        className={errors.attachment ? "border-red-500" : ""}
                    />
                    {errors.attachment && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm"
                        >
                            {errors.attachment}
                        </motion.p>
                    )}
                </div>
                    <Button className=" w-full bg-green-600 hover:bg-green-500 text-lg rounded-tl-2xl rounded-br-2xl hover:rounded-tr-2xl hover:rounded-bl-2xl hover:rounded-tl-none hover:rounded-br-none " type="submit" disabled={loading}>
                        {loading ? "...Submitting" : "Submit Request"}
                    </Button>
            </form>
        </motion.section>
    );
}