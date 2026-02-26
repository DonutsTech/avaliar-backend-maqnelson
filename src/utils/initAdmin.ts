import { userModel } from "../models/user";
import { userService } from "../services/user";


export async function initADM() {
  try {
    const admin = await userModel.findBy({ ROLE: 'ADMIN' });

    if (!admin) {
      await userService.createUser({
        ROLE: 'ADMIN',
        EMAIL: 'admin@maqnelson.com.br',
        PASSWORD: 'senhaSegura',
      });
      console.log('Usuário ADMIN criado!');
    }

    console.log('Usuário ADMIN já existe.');
  } catch (error) {
    console.error('Erro ao verificar/criar usuário ADMIN:', error);
  }
}
