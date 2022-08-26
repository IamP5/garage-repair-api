/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Maintenence` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "maintenance_status" AS ENUM ('WAITING', 'IN_PROGRESS', 'DONE');

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Maintenence" DROP CONSTRAINT "Maintenence_carId_fkey";

-- DropForeignKey
ALTER TABLE "Maintenence" DROP CONSTRAINT "Maintenence_customerId_fkey";

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Maintenence";

-- DropEnum
DROP TYPE "MaintenenceStatus";

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "plate" VARCHAR(7) NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance" (
    "id" TEXT NOT NULL,
    "status" "maintenance_status" NOT NULL DEFAULT 'IN_PROGRESS',
    "car_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_cpf_key" ON "customer"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "car_plate_key" ON "car"("plate");

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
