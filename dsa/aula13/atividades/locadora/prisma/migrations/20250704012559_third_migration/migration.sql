/*
  Warnings:

  - Made the column `usuarioId` on table `clientes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `clientes` DROP FOREIGN KEY `clientes_usuarioId_fkey`;

-- DropIndex
DROP INDEX `clientes_usuarioId_fkey` ON `clientes`;

-- AlterTable
ALTER TABLE `clientes` MODIFY `usuarioId` VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
