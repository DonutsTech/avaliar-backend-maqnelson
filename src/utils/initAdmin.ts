import { userModel } from "../models/user";
import { userService } from "../services/user";

export async function initADM() {
  try {
    const admin = await userModel.findBy({ where: { ROLE: 'ADMIN' } });

    if (!admin) {
      await userService.createUser({
        ROLE: 'ADMIN',
        EMAIL: 'paulofanini@maqnelson.com.br',
        PASSWORD: process.env.ADMIN_PASSWORD || '8CK[)026H]}v',
      });
      await userService.createUser({
        ROLE: 'ADMIN',
        EMAIL: 'reginaldosantos@maqnelsonagricola.com.br',
        PASSWORD: process.env.ADMIN_PASSWORD || '8CK[)026H]}v',
      });
      await userService.createUser({
        ROLE: 'USER',
        EMAIL: 'cem@cem.com.br',
        PASSWORD: process.env.ADMIN_PASSWORD || '8CK[)026H]}v',
      });
      console.log('Usuário ADMIN criado!');
    }

    console.log('Usuário ADMIN já existe.');
  } catch (error) {
    console.error('Erro ao verificar/criar usuário ADMIN:', error);
  }
}
