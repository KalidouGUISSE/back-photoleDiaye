export interface IAuthService {
  // register(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: { id: string; email: string; role: string } }>;
  refreshAccessToken(refreshToken: string): Promise<string>;
  logout(userId: string): Promise<void>;
}
