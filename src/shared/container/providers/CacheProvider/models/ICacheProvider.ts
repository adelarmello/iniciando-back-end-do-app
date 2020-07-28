export default interface ICacheProvider {
  save(key: string, valeu: string): Promise<void>; // Salva os dados do cache
  recover(key: string): Promise<string | null>; // Lista os dados do cache
  invalidate(key: string): Promise<void>; // Deleta os dados do cache
}
