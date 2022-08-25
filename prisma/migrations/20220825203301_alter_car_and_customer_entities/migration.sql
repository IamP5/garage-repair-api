/*
  Warnings:

  - You are about to alter the column `plate` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(7)`.
  - You are about to alter the column `cpf` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "plate" SET DATA TYPE VARCHAR(7);

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(11);
