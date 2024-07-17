-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT,
    "email" TEXT,
    "password" TEXT,
    "github_id" TEXT,
    "google_id" TEXT,
    "avatar" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("avatar", "created_at", "email", "github_id", "google_id", "id", "nickname", "password", "updated_at") SELECT "avatar", "created_at", "email", "github_id", "google_id", "id", "nickname", "password", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
