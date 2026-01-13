export function isModerator(req, res, next) {
    if (req.user?.role !== "MODERATOR") {
        return res.status(403).json({ error: "Accès réservé aux modérateurs" });
    }
    next();
}
//# sourceMappingURL=isModerator.js.map