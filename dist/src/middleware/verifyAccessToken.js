import jwt from "jsonwebtoken";
export function verifyAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token manquant ou invalide" });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ error: "JWT_SECRET non configuré" });
    }
    else {
        try {
            // @ts-ignore
            const decoded = jwt.verify(token, secret);
            if (decoded && typeof decoded === "object" && "userId" in decoded && "role" in decoded) {
                req.user = { userId: decoded.userId, role: decoded.role };
                next();
            }
            else {
                return res.status(403).json({ error: "Token invalide" });
            }
        }
        catch (err) {
            return res.status(403).json({ error: "Token expiré ou invalide" });
        }
    }
}
//# sourceMappingURL=verifyAccessToken.js.map