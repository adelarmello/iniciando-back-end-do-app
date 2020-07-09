// Vai definir quais são as propriedades que o envio de email vai
// prover pra nossa aplicação
export default interface IMailProvider {
  sendMail(to: string, body: string): promise<void>;
}
