export function isVIP(req, res, next) {
    if (req.user?.role !== "VIP") {
        return res.status(403).json({ error: "Accès réservé aux VIP" });
    }
    next();
}
//# sourceMappingURL=isVIP.js.map