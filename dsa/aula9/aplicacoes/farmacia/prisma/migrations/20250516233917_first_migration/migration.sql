-- CreateTable
CREATE TABLE `medicamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(40) NOT NULL,
    `laboratorio` ENUM('Novara', 'Antonello', 'Municipal', 'Natura') NOT NULL DEFAULT 'Novara',
    `preco` DECIMAL(7, 2) NOT NULL,
    `controlado` BOOLEAN NOT NULL,
    `quantMinima` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(40) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `cidade` VARCHAR(40) NOT NULL,
    `dataNascimento` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `total` INTEGER NOT NULL DEFAULT 0,
    `clienteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itensVenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER UNSIGNED NOT NULL,
    `preco` DECIMAL(7, 2) NOT NULL,
    `produtoId` INTEGER NOT NULL,
    `vendaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `vendas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itensVenda` ADD CONSTRAINT `itensVenda_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `medicamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itensVenda` ADD CONSTRAINT `itensVenda_vendaId_fkey` FOREIGN KEY (`vendaId`) REFERENCES `vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
