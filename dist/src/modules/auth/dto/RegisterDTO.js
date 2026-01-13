import { z } from "zod";
export const RegisterDTO = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});
//# sourceMappingURL=RegisterDTO.js.map