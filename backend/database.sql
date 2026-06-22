DROP DATABASE IF EXISTS mjfacility;
CREATE DATABASE mjfacility;
USE mjfacility;

CREATE TABLE Users (
    id          INT                         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pseudo      VARCHAR(255)                NOT NULL UNIQUE,
    email       VARCHAR(255)                NOT NULL UNIQUE,
    password    VARCHAR(255)                NOT NULL,
    role        ENUM('joueur', 'admin')     NOT NULL DEFAULT 'joueur',
    aAcces      BOOLEAN                     NOT NULL DEFAULT FALSE,
    ficheId     VARCHAR(255)                DEFAULT NULL,
    createdAt   TIMESTAMP                   DEFAULT CURRENT_TIMESTAMP,
    updatedAt   TIMESTAMP                   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Logs (
    id          INT                                     NOT NULL AUTO_INCREMENT PRIMARY KEY,
    action      ENUM('acces_accorde', 'acces_revoque')  NOT NULL,
    adminId     INT                                     NOT NULL,
    joueurId    INT                                     NOT NULL,
    createdAt   TIMESTAMP                               DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_logs_admin
        FOREIGN KEY     (adminId)
        REFERENCES      Users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_logs_joueurs
        FOREIGN KEY     (joueurId)
        REFERENCES      Users(id)
        ON DELETE CASCADE
);