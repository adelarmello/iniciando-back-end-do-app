import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1588630727273
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider', // Nome da ForeignKey
        columnNames: ['provider_id'], // Coluna que recebe a chave estrangeira
        referencedColumnNames: ['id'], // Nome da coluna que na tabela de user vai representar o 'provider_id'
        referencedTableName: 'users', // Nome da Table que fa referência
        onDelete: 'SET NULL', // O que acontece com os agendamentos quando o provider_id(o barbeiro) é deletado? Fica null.
        onUpdate: 'CASCADE', // O que acontece quando alterar o id do provider_id? Atualiza tudo.
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider'); // Nome da tabela e da ForeignKey(Da ForeignKey eu posso criar qualquer nome)
    await queryRunner.dropColumn('appointments', 'provider_id'); // Deletar a coluna provider_id

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
