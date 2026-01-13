import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IAuthService } from "../interfaces/IAuthService.js";
import { IAuthRepository } from "../interfaces/IAuthRepository.js";

export class AuthService implements IAuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async register(email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.authRepository.createUser(email, hashedPassword);
  }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) throw new Error("Utilisateur introuvable");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Mot de passe incorrect");

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    await this.authRepository.saveRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string };
      const user = await this.authRepository.findUserById(payload.userId);

      if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Refresh token invalide");
      }

      const newAccessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return newAccessToken;
    } catch {
      throw new Error("Refresh token expiré ou invalide");
    }
  }

  async logout(userId: string): Promise<void> {
    await this.authRepository.removeRefreshToken(userId);
  }
}
