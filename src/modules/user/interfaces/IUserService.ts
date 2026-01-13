export interface IUserService {
  // Fonctions utilisateur standard
  getProfile(userId: string): Promise<any>;
  
  // Fonctions de modération (MODERATOR uniquement)
  listAllUsers(): Promise<any[]>;
  promoteToVIP(userId: string): Promise<void>;
  demoteFromVIP(userId: string): Promise<void>;
}