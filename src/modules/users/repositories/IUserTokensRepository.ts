// Gerar um token pra um usuário específico.

import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  // user_id: Id do usuário que eu quero gerar o token.
  generate(user_id: string): Promise<UserToken>;
}
