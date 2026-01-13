export function isNotModerator(req, res, next) {
    if (req.user?.role === "MODERATOR") {
        return res.status(403).json({
            error: "Les modérateurs ne peuvent pas créer d'annonces. Seuls les utilisateurs inscrits peuvent publier."
        });
    }
    next();
}
//# sourceMappingURL=isNotModerator.js.map