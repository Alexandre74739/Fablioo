-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "tech" TEXT[],
    "image" TEXT NOT NULL,
    "site_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecifiqueProject" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "contexte" TEXT NOT NULL,
    "objectifs" TEXT NOT NULL,
    "cibles" TEXT NOT NULL,
    "contraintes" TEXT NOT NULL,
    "resultats" TEXT NOT NULL,
    "avant" TEXT[],
    "apres" TEXT[],
    "illustrations" TEXT[],

    CONSTRAINT "SpecifiqueProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_slug_key" ON "Projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SpecifiqueProject_project_id_key" ON "SpecifiqueProject"("project_id");

-- AddForeignKey
ALTER TABLE "SpecifiqueProject" ADD CONSTRAINT "SpecifiqueProject_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

