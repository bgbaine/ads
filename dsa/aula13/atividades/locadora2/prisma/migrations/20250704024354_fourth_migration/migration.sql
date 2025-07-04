-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `codigoRecuperacao` VARCHAR(6) NULL,
    ADD COLUMN `ultimoAcesso` TIMESTAMP(0) NULL;
