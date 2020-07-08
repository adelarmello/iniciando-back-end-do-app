// Métodos que um provedor de Hash precisa ter:
// Gerar um hash a partir de uma string qualquer.
// Compara um texto com algo que já foi hash anteriormente. E retorna true ou false.
export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
