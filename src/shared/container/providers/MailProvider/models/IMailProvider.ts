// Vai definir quais são as propriedades que o envio de email vai
// prover pra nossa aplicação
import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
