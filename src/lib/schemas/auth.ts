import { z } from "$lib/zod";

export const signUpSchema = z.object({
    name: z.string().max(100),
    nim: z.string().length(9, "NIM tidak valid"),
    email: z.string().email(),
    password: z.string().min(6, "Panjang password minimal 6 karakter")
})

export const signInSchema = z.object({
    username: z.string({ required_error: "Bidang ini tidak boleh kosong" }),
    password: z.string()
})