# Leden
<table>
  <tr>
    <td align="center">
      <img src="./images/image.png" width="150" alt="Alex"/><br/>
      <b>Alexandru Poenaru</b>
    </td>
    <td align="center">
      <img src="./images/image-4.png" width="150" alt="Arnaud"/><br/>
      <b>Arnaud Tison</b>
    </td>
    <td align="center">
      <img src="./images/image-2.png" width="150" alt="Bavo"/><br/>
      <b>Bavo Vancoppernolle</b>
    </td>
    <td align="center">
      <img src="./images/image-3.png" width="150" alt="Kyandro"/><br/>
      <b>Kyandro Voet</b>
    </td>
    <td align="center">
      <img src="./images/image-1.png" width="150" alt="Tom"/><br/>
      <b>Tom Kluskens</b>
    </td>
  </tr>
</table>

# Gerealiseerde use cases

### Aanmelden
We hebben een beveiligd authenticatiesysteem geïmplementeerd met JWT tokens. De login-functionaliteit bevindt zich in de front-end (`src/pages/login`) en communiceert met de `/api/sessions` endpoint in de back-end. Er zijn verschillende gebruikersrollen (Manager, Verantwoordelijke, Technieker) met verschillende toegangsniveaus tot functionaliteiten. De authenticatie wordt bewaakt door de `useAuth` context en de `PrivateRoute` component zorgt ervoor dat bepaalde pagina's alleen toegankelijk zijn voor geauthenticeerde gebruikers.

### Raadplegen KPIs
KPIs worden opgehaald van de backend via de `/api/kpi` endpoints en gevisualiseerd met behulp van custom chart componenten (`src/components/charts/`). De gebruiker kan verschillende tijdsperiodes kiezen (dag, week, maand, kwartaal, jaar) via de `TimeFrameFilter` component. KPIs tonen onder andere productieaantallen, scrap, en downtime per site en per machine.

### Raadplegen overzicht site
Gebruikers kunnen sites bekijken via het overzicht (`/sites`) of via de kaartweergave (`/sites/kaart`). De site-detailpagina (`SiteDetails.jsx`) toont alle relevante informatie over een site, inclusief machines, KPIs en onderhoudsinformatie. De componenten `SiteDetailsMachine` en `SiteKPIs` zijn verantwoordelijk voor het weergeven van de machine-informatie en KPIs per site.

### Raadplegen details machine
De machine-detailpagina (`MachineDetails.jsx`) toont gedetailleerde informatie over een specifieke machine, inclusief status, locatie, productie-KPIs en onderhoudsgeschiedenis. De `MachineKPIs` component is verantwoordelijk voor het visualiseren van de KPI-gegevens. De data wordt opgehaald via de `/api/machines/{code}` endpoint.

### Beheren Site(s)
Managers kunnen sites toevoegen, bewerken en beheren via de `AddOrEditSite` component. Deze component maakt gebruik van formuliervalidatie en communiceert met de back-end via de `/api/sites` endpoints. Geocoördinaten worden automatisch opgehaald op basis van het adres voor de kaartweergave.

### Beheren KPIs
KPIs worden dynamisch berekend in de backend (`src/service/kpi.ts`) op basis van productielogs en andere data. De front-end biedt verschillende visualisaties en kan filteren op verschillende timeframes. De `TimeFrameFilter` component laat gebruikers verschillende periodes selecteren (dag, week, maand, kwartaal, jaar).

### Machine stoppen/starten
Techniekers en verantwoordelijken kunnen machines starten of stoppen via de machine-detailpagina. De statuswijziging wordt verzonden naar de `/api/machines/{code}/status` endpoint en verwerkt in de backend. De UI update direct om de nieuwe status weer te geven en er worden notificaties gegenereerd voor relevante gebruikers.

### Rapport genereren + export naar pdf
De `PDFGenerator` component genereert gedetailleerde PDF-rapporten voor onderhoudstaken en machine-prestaties. Deze functie maakt gebruik van de `react-to-pdf` bibliotheek en haalt gegevens op via de `/api/onderhouden/{id}/pdf-data` endpoint die speciaal geformatteerde data voor rapporten levert.

### Raadplegen details onderhoud
De `OnderhoudDetails` pagina toont alle informatie over een onderhoudsactiviteit, inclusief geplande tijd, uitvoerder, status en bijbehorende machine. Gebruikers kunnen ook foto's uploaden van onderhoudswerkzaamheden. De data wordt opgehaald via de `/api/onderhouden/{id}` endpoint.

### Notificaties Raadplegen
Het notificatiesysteem toont belangrijke updates aan gebruikers via de `Notificaties` component. Notificaties worden gecategoriseerd als nieuw, ongelezen en gelezen. Ze worden opgehaald van de backend via de `/api/notificaties` endpoint. De `NotificatieBel` component in de navbar toont het aantal ongelezen notificaties.

# Webservice

## URL online versie en URL documentatie API
- **URL online versie:** https://two025-nodejs-gent14-gxtu.onrender.com/
- **URL documentatie API:** https://two025-nodejs-gent14-gxtu.onrender.com/swagger
- **Lokale ontwikkelomgeving:** http://localhost:9000
- **Lokale API documentatie:** http://localhost:9000/swagger

## Logingegevens voor de verschillende rollen – lokaal en online

### Lokale omgeving
| Rol | E-mail | Wachtwoord |
|-----|--------|------------|
| Manager | sophie.devries@delaware.be | Manager123 |
| Technieker | tom.klein@delaware.be | Technieker123 |
| Verantwoordelijke | lars.smit@delaware.be | Verantwoordelijke123 |

### Online omgeving
| Rol | E-mail | Wachtwoord |
|-----|--------|------------|
| Manager | sophie.devries@delaware.be | Manager123 |
| Technieker | tom.klein@delaware.be | Technieker123 |
| Verantwoordelijke | lars.smit@delaware.be | Verantwoordelijke123 |

## Een voorbeeld van de .env bestanden

### .env
```
NODE_ENV=development
DATABASE_URL = "mysql://root:password@localhost:3306/delaware"
```

### .env.test
```
NODE_ENV=testing
DATABASE_URL = "mysql://root:pwssword@localhost:3306/delaware_test"
```

## Databank schema

```prisma
model Gebruiker {
  id            Int                        @id @default(autoincrement())
  naam          String                     @db.VarChar(255)
  voornaam      String                     @db.VarChar(255)
  geboortedatum DateTime                   @db.DateTime(0)
  straat        String                     @db.VarChar(255)
  huisnummer    Int
  gemeente      String                     @db.VarChar(255)
  email         String                     @unique(map: "idx_gebruiker_email_unique") @db.VarChar(255)
  wachtwoord    String                     @db.VarChar(255)
  gsm           String                     @unique(map: "idx_gebruiker_gsm_unique") @db.VarChar(255)
  sites         Site[]
  rol           Rol
  status        GebruikerStatus            @default(NIEUW)
  logs          Log[]
  notificaties  NotificatieVoorGebruiker[]
  Machine       Machine[]
  Onderhoud     Onderhoud[]

  @@map("gebruiker")
}

model Fabrikant {
  id         Int       @id @default(autoincrement())
  naam       String    @db.VarChar(255)
  straat     String    @db.VarChar(255)
  huisnummer Int
  gemeente   String    @db.VarChar(255)
  email      String?   @unique(map: "idx_fabrikant_email_unique") @db.VarChar(255)
  gsm        String?   @unique(map: "idx_fabrikant_gsm_unique") @db.VarChar(255)
  machines   Machine[]

  @@map("fabrikant")
}

model Log {
  id          Int           @id @default(autoincrement())
  type        TypeLog
  gebruiker   Gebruiker     @relation(fields: [gebruikerId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_log_gebruikerId")
  gebruikerId Int
  machine     Machine?      @relation(fields: [machineId], references: [code], onDelete: NoAction, onUpdate: NoAction, map: "fk_log_machineId")
  machineId   String?       @db.VarChar(255)
  site        Site?         @relation(fields: [siteId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_log_siteId")
  siteId      Int?
  tijdstip    DateTime      @db.DateTime(0)
  info        String        @db.Text
  Notificatie Notificatie[]

  @@map("log")
}

model Notificatie {
  id                       Int                        @id @default(autoincrement())
  verstuurTijdstip         DateTime                   @db.DateTime(0)
  boodschap                String                     @db.Text
  logId                    Int?
  log                      Log?                       @relation(fields: [logId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_notificatie_logId")
  NotificatieVoorGebruiker NotificatieVoorGebruiker[]

  @@map("notificatie")
}

model NotificatieVoorGebruiker {
  notificatie   Notificatie       @relation(fields: [notificatieId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_notificatieVoorGebruiker_notificatieId")
  notificatieId Int
  gebruiker     Gebruiker         @relation(fields: [gebruikerId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "fk_notificatieVoorGebruiker_gebruikerId")
  gebruikerId   Int
  status        NotificatieStatus

  @@id([notificatieId, gebruikerId])
}

model Site {
  id                  Int        @id @default(autoincrement())
  naam                String     @unique(map: "idx_site_naam_unique") @db.VarChar(255)
  straat              String     @unique(map: "idx_site_straat_unique") @db.VarChar(255)
  huisnummer          Int
  gemeente            String     @db.VarChar(255)
  verantwoordelijkeId Int?
  verantwoordelijke   Gebruiker? @relation(fields: [verantwoordelijkeId], references: [id], map: "fk_site_verantwoordelijkeId")
  geocoordinaatX      Float
  geocoordinaatY      Float
  machines            Machine[]
  logs                Log[]
  isActive            Boolean    @default(true)

  @@map("site")
}

model Machine {
  code            String          @id @db.VarChar(255)
  fabrikant       Fabrikant       @relation(fields: [fabrikantId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_machine_fabrikantId")
  fabrikantId     Int
  modelCode       String          @db.VarChar(255)
  machineType     MachineType
  site            Site            @relation(fields: [siteId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_machine_siteId")
  siteId          Int
  locatieCode     String          @db.VarChar(255)
  stockLevel      Int
  status          MachineStatus   @default(GESTOPT)
  productieStatus ProductieStatus
  technieker      Gebruiker       @relation(fields: [techniekerId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_machine_techniekerId")
  techniekerId    Int
  onderhouden     Onderhoud[]
  productLogs     ProductLog[]
  logs            Log[]

  @@map("machine")
}

model Onderhoud {
  id             Int             @id @default(autoincrement())
  startTijdstip  DateTime        @db.DateTime(0)
  eindTijdstip   DateTime        @db.DateTime(0)
  machine        Machine         @relation(fields: [machineId], references: [code], onDelete: Cascade, onUpdate: NoAction, map: "fk_onderhoud_machineId")
  machineId      String          @db.VarChar(255)
  technieker     Gebruiker       @relation(fields: [techniekerId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_onderhoud_techniekerId")
  techniekerId   Int
  onderhoudReden OnderhoudReden
  opmerkingen    String?         @db.Text
  status         OnderhoudStatus

  @@map("onderhoud")
}

model Product {
  id               Int          @id @default(autoincrement())
  code             String       @db.VarChar(255)
  naam             String       @db.VarChar(255)
  beschrijving     String?      @db.Text
  aantalInVoorraad Int
  aankoopprijs     Int
  verkoopprijs     Int
  productLogs      ProductLog[]

  @@map("product")
}

model ProductLog {
  id            Int      @id @default(autoincrement())
  product       Product  @relation(fields: [productId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "fk_productLog_productId")
  productId     Int
  machine       Machine  @relation(fields: [machineId], references: [code], onDelete: NoAction, onUpdate: NoAction, map: "fk_productLog_machineId")
  machineId     String   @db.VarChar(255)
  aantalGoed    Int
  aantalScrap   Int
  startTijdstip DateTime @db.DateTime
  eindTijdstip  DateTime @db.DateTime

  @@map("productLog")
}

enum Rol {
  ADMIN
  TECHNIEKER
  VERANTWOORDELIJKE
  MANAGER
}

enum MachineStatus {
  DRAAIEND
  GESTOPT
  IN_ONDERHOUD
  STARTBAAR
}

enum ProductieStatus {
  GEZOND
  NOOD_AAN_ONDERHOUD
  FALEND
}

enum GebruikerStatus {
  ACTIEF
  INACTIEF
  NIEUW
}

enum TypeLog {
  AANMAAK_ONDERHOUD
  AANPASSING_ONDERHOUD
  VERWIJDEREN_ONDERHOUD
  STARTEN_MACHINE
  STOPPEN_MACHINE
  FALENDE_MACHINE
  TECHNIEKER_MACHINE_TOEGEWEZEN
  TECHNIEKER_MACHINE_GEWIJZIGD
  VERANTWOORDELIJKE_SITE_TOEGEWEZEN
  VERANTWOORDELIJKE_SITE_GEWIJZIGD
}

enum NotificatieStatus {
  ONGELEZEN
  GELEZEN
  NIEUW
}

enum OnderhoudReden {
  ROUTINE_INSPECTIE
  PREVENTIEF_ONDERHOUD
  VERPLICHT_ONDERHOUD
  ONDERHOUD_NA_STORING
  VERVANGING_VAN_ONDERDELEN
  UPGRADES
  CALIBRATIE
  REINIGING
  NOODREPARATIE
}

enum OnderhoudStatus {
  GEPLAND
  IN_UITVOERING
  VOLTOOID
  GEANNULEERD
}

enum MachineType {
  SNIJMACHINE
  VERPAKKINGSMACHINE
  DRUKPERS
  TRANSPORTBAND
  MIXMACHINE
  SPUITGIETMACHINE
  KOELMACHINE
}
```
## Database Extensies (Triggers, Stored Procedures, Events)

Naast het Prisma schema hebben we verschillende database extensies geïmplementeerd om de functionaliteit van onze applicatie te versterken.

### Triggers

#### Log Triggers
Deze triggers houden de logboeken bij wanneer er belangrijke acties plaatsvinden in het systeem:

- **logNieuwOnderhoud.sql**:
```sql
DELIMITER //
CREATE TRIGGER log_nieuw_onderhoud 
AFTER INSERT ON onderhoud
FOR EACH ROW
BEGIN
    DECLARE log_id INT;
    
    -- Voeg een log toe voor het nieuwe onderhoud
    INSERT INTO log (type, gebruikerId, machineId, tijdstip, info)
    VALUES ('AANMAAK_ONDERHOUD', NEW.techniekerId, NEW.machineId, NOW(), 
           CONCAT('Nieuw onderhoud gepland voor machine ', NEW.machineId, 
                  ' op ', DATE_FORMAT(NEW.startTijdstip, '%d-%m-%Y %H:%i'), 
                  ' tot ', DATE_FORMAT(NEW.eindTijdstip, '%d-%m-%Y %H:%i')));
    
    SET log_id = LAST_INSERT_ID();
END //
DELIMITER ;
```

- **logOnderhoudGeannuleerd.sql**:
```sql
DELIMITER //
CREATE TRIGGER log_onderhoud_geannuleerd
AFTER UPDATE ON onderhoud
FOR EACH ROW
BEGIN
    IF OLD.status != 'GEANNULEERD' AND NEW.status = 'GEANNULEERD' THEN
        INSERT INTO log (type, gebruikerId, machineId, tijdstip, info)
        VALUES ('AANPASSING_ONDERHOUD', NEW.techniekerId, NEW.machineId, NOW(),
               CONCAT('Onderhoud (ID: ', NEW.id, ') voor machine ', NEW.machineId, 
                      ' is geannuleerd. Het was oorspronkelijk gepland voor ', 
                      DATE_FORMAT(NEW.startTijdstip, '%d-%m-%Y %H:%i'), 
                      ' tot ', DATE_FORMAT(NEW.eindTijdstip, '%d-%m-%Y %H:%i')));
    END IF;
END //
DELIMITER ;
```

- **logOnderhoudGewijzigd.sql**:
```sql
DELIMITER //
CREATE TRIGGER log_onderhoud_gewijzigd
AFTER UPDATE ON onderhoud
FOR EACH ROW
BEGIN
    IF (OLD.startTijdstip != NEW.startTijdstip OR 
        OLD.eindTijdstip != NEW.eindTijdstip OR 
        OLD.techniekerId != NEW.techniekerId OR 
        OLD.onderhoudReden != NEW.onderhoudReden OR 
        OLD.opmerkingen != NEW.opmerkingen OR
        (OLD.status != NEW.status AND NEW.status != 'GEANNULEERD')) THEN
        
        INSERT INTO log (type, gebruikerId, machineId, tijdstip, info)
        VALUES ('AANPASSING_ONDERHOUD', NEW.techniekerId, NEW.machineId, NOW(),
               CONCAT('Onderhoud (ID: ', NEW.id, ') voor machine ', NEW.machineId, 
                      ' is aangepast. Nieuwe planning: ', 
                      DATE_FORMAT(NEW.startTijdstip, '%d-%m-%Y %H:%i'), 
                      ' tot ', DATE_FORMAT(NEW.eindTijdstip, '%d-%m-%Y %H:%i'),
                      '. Status: ', NEW.status));
    END IF;
END //
DELIMITER ;
```

- **logTechniekerGewijzigdMachine.sql**:
```sql
DELIMITER //
CREATE TRIGGER log_technieker_gewijzigd_machine
AFTER UPDATE ON machine
FOR EACH ROW
BEGIN
    DECLARE oude_technieker_naam VARCHAR(512);
    DECLARE nieuwe_technieker_naam VARCHAR(512);
    
    IF OLD.techniekerId != NEW.techniekerId THEN
        -- Haal namen op van oude en nieuwe technieker
        SELECT CONCAT(voornaam, ' ', naam) INTO oude_technieker_naam 
        FROM gebruiker 
        WHERE id = OLD.techniekerId;
        
        SELECT CONCAT(voornaam, ' ', naam) INTO nieuwe_technieker_naam 
        FROM gebruiker 
        WHERE id = NEW.techniekerId;
        
        -- Log de wijziging
        INSERT INTO log (type, gebruikerId, machineId, siteId, tijdstip, info)
        VALUES ('TECHNIEKER_MACHINE_GEWIJZIGD', NEW.techniekerId, NEW.code, NEW.siteId, NOW(),
               CONCAT('Technieker voor machine ', NEW.code, 
                      ' is gewijzigd van ', oude_technieker_naam, 
                      ' naar ', nieuwe_technieker_naam));
    END IF;
END //
DELIMITER ;
```

- **logTechniekerToewijzenMachine.sql**:
```sql
DELIMITER //
CREATE TRIGGER log_technieker_toewijzen_machine
AFTER INSERT ON machine
FOR EACH ROW
BEGIN
    DECLARE technieker_naam VARCHAR(512);
    
    -- Haal technieker naam op
    SELECT CONCAT(voornaam, ' ', naam) INTO technieker_naam 
    FROM gebruiker 
    WHERE id = NEW.techniekerId;
    
    -- Log de toewijzing
    INSERT INTO log (type, gebruikerId, machineId, siteId, tijdstip, info)
    VALUES ('TECHNIEKER_MACHINE_TOEGEWEZEN', NEW.techniekerId, NEW.code, NEW.siteId, NOW(),
           CONCAT('Technieker ', technieker_naam, 
                  ' is toegewezen aan machine ', NEW.code));
END //
DELIMITER ;
```

- **logVerantwoordelijkeGewijzigdSite.sql**:
```sql
DELIMITER //
CREATE TRIGGER log_verantwoordelijke_gewijzigd_site
AFTER UPDATE ON site
FOR EACH ROW
BEGIN
    DECLARE oude_verantwoordelijke_naam VARCHAR(512);
    DECLARE nieuwe_verantwoordelijke_naam VARCHAR(512);
    
    IF (OLD.verantwoordelijkeId IS NOT NULL AND NEW.verantwoordelijkeId IS NOT NULL 
        AND OLD.verantwoordelijkeId != NEW.verantwoordelijkeId) THEN
        
        -- Haal namen op van oude en nieuwe verantwoordelijke
        SELECT CONCAT(voornaam, ' ', naam) INTO oude_verantwoordelijke_naam 
        FROM gebruiker 
        WHERE id = OLD.verantwoordelijkeId;
        
        SELECT CONCAT(voornaam, ' ', naam) INTO nieuwe_verantwoordelijke_naam 
        FROM gebruiker 
        WHERE id = NEW.verantwoordelijkeId;
        
        -- Log de wijziging
        INSERT INTO log (type, gebruikerId, siteId, tijdstip, info)
        VALUES ('VERANTWOORDELIJKE_SITE_GEWIJZIGD', NEW.verantwoordelijkeId, NEW.id, NOW(),
               CONCAT('Verantwoordelijke voor site ', NEW.naam, 
                      ' is gewijzigd van ', oude_verantwoordelijke_naam, 
                      ' naar ', nieuwe_verantwoordelijke_naam));
    END IF;
END //
DELIMITER ;
```

- **logVerantwoordelijkeToewijzenSite.sql**:
```sql
DELIMITER //
CREATE TRIGGER log_verantwoordelijke_toewijzen_site
AFTER UPDATE ON site
FOR EACH ROW
BEGIN
    DECLARE verantwoordelijke_naam VARCHAR(512);
    
    IF OLD.verantwoordelijkeId IS NULL AND NEW.verantwoordelijkeId IS NOT NULL THEN
        -- Haal verantwoordelijke naam op
        SELECT CONCAT(voornaam, ' ', naam) INTO verantwoordelijke_naam 
        FROM gebruiker 
        WHERE id = NEW.verantwoordelijkeId;
        
        -- Log de toewijzing
        INSERT INTO log (type, gebruikerId, siteId, tijdstip, info)
        VALUES ('VERANTWOORDELIJKE_SITE_TOEGEWEZEN', NEW.verantwoordelijkeId, NEW.id, NOW(),
               CONCAT('Verantwoordelijke ', verantwoordelijke_naam, 
                      ' is toegewezen aan site ', NEW.naam));
    END IF;
END //
DELIMITER ;
```

#### Notificatie Triggers
Deze triggers genereren automatisch notificaties voor gebruikers bij belangrijke gebeurtenissen:

- **notificatieMachineGestart.sql**:
```sql
DELIMITER //
CREATE TRIGGER notificatie_machine_gestart
AFTER UPDATE ON machine
FOR EACH ROW
BEGIN
    DECLARE log_id INT;
    DECLARE notificatie_id INT;
    DECLARE site_verantwoordelijke_id INT;
    
    IF OLD.status = 'GESTOPT' AND NEW.status = 'DRAAIEND' THEN
        -- Creëer log
        INSERT INTO log (type, gebruikerId, machineId, siteId, tijdstip, info)
        VALUES ('STARTEN_MACHINE', NEW.techniekerId, NEW.code, NEW.siteId, NOW(),
               CONCAT('Machine ', NEW.code, ' is gestart'));
        
        SET log_id = LAST_INSERT_ID();
        
        -- Creëer notificatie
        INSERT INTO notificatie (verstuurTijdstip, boodschap, logId)
        VALUES (NOW(), CONCAT('Machine ', NEW.code, ' op site ', 
                             (SELECT naam FROM site WHERE id = NEW.siteId), 
                             ' is gestart'), log_id);
        
        SET notificatie_id = LAST_INSERT_ID();
        
        -- Voeg notificatie toe voor technieker
        INSERT INTO NotificatieVoorGebruiker (notificatieId, gebruikerId, status)
        VALUES (notificatie_id, NEW.techniekerId, 'NIEUW');
        
        -- Voeg notificatie toe voor site verantwoordelijke (indien aanwezig)
        SELECT verantwoordelijkeId INTO site_verantwoordelijke_id 
        FROM site 
        WHERE id = NEW.siteId;
        
        IF site_verantwoordelijke_id IS NOT NULL AND site_verantwoordelijke_id != NEW.techniekerId THEN
            INSERT INTO NotificatieVoorGebruiker (notificatieId, gebruikerId, status)
            VALUES (notificatie_id, site_verantwoordelijke_id, 'NIEUW');
        END IF;
    END IF;
END //
DELIMITER ;
```

- **notificatieMachineGestopt.sql**:
```sql
DELIMITER //
CREATE TRIGGER notificatie_machine_gestopt
AFTER UPDATE ON machine
FOR EACH ROW
BEGIN
    DECLARE log_id INT;
    DECLARE notificatie_id INT;
    DECLARE site_verantwoordelijke_id INT;
    
    IF OLD.status = 'DRAAIEND' AND NEW.status = 'GESTOPT' THEN
        -- Creëer log
        INSERT INTO log (type, gebruikerId, machineId, siteId, tijdstip, info)
        VALUES ('STOPPEN_MACHINE', NEW.techniekerId, NEW.code, NEW.siteId, NOW(),
               CONCAT('Machine ', NEW.code, ' is gestopt'));
        
        SET log_id = LAST_INSERT_ID();
        
        -- Creëer notificatie
        INSERT INTO notificatie (verstuurTijdstip, boodschap, logId)
        VALUES (NOW(), CONCAT('Machine ', NEW.code, ' op site ', 
                             (SELECT naam FROM site WHERE id = NEW.siteId), 
                             ' is gestopt'), log_id);
        
        SET notificatie_id = LAST_INSERT_ID();
        
        -- Voeg notificatie toe voor technieker
        INSERT INTO NotificatieVoorGebruiker (notificatieId, gebruikerId, status)
        VALUES (notificatie_id, NEW.techniekerId, 'NIEUW');
        
        -- Voeg notificatie toe voor site verantwoordelijke (indien aanwezig)
        SELECT verantwoordelijkeId INTO site_verantwoordelijke_id 
        FROM site 
        WHERE id = NEW.siteId;
        
        IF site_verantwoordelijke_id IS NOT NULL AND site_verantwoordelijke_id != NEW.techniekerId THEN
            INSERT INTO NotificatieVoorGebruiker (notificatieId, gebruikerId, status)
            VALUES (notificatie_id, site_verantwoordelijke_id, 'NIEUW');
        END IF;
    END IF;
END //
DELIMITER ;
```

- **notificatieNieuwOnderhoud.sql**:
```sql
DELIMITER //
CREATE TRIGGER notificatie_nieuw_onderhoud
AFTER INSERT ON onderhoud
FOR EACH ROW
BEGIN
    DECLARE log_id INT;
    DECLARE notificatie_id INT;
    DECLARE site_verantwoordelijke_id INT;
    DECLARE site_id INT;
    
    -- Haal site ID op
    SELECT siteId INTO site_id 
    FROM machine 
    WHERE code = NEW.machineId;
    
    -- Zoek meest recente log voor deze actie
    SELECT id INTO log_id 
    FROM log 
    WHERE machineId = NEW.machineId AND type = 'AANMAAK_ONDERHOUD' 
    ORDER BY tijdstip DESC LIMIT 1;
    
    -- Creëer notificatie
    INSERT INTO notificatie (verstuurTijdstip, boodschap, logId)
    VALUES (NOW(), CONCAT('Nieuw onderhoud gepland voor machine ', NEW.machineId, 
                          ' op ', DATE_FORMAT(NEW.startTijdstip, '%d-%m-%Y %H:%i'), 
                          ' tot ', DATE_FORMAT(NEW.eindTijdstip, '%d-%m-%Y %H:%i')), 
            log_id);
    
    SET notificatie_id = LAST_INSERT_ID();
    
    -- Voeg notificatie toe voor technieker
    INSERT INTO NotificatieVoorGebruiker (notificatieId, gebruikerId, status)
    VALUES (notificatie_id, NEW.techniekerId, 'NIEUW');
    
    -- Voeg notificatie toe voor site verantwoordelijke (indien aanwezig)
    SELECT verantwoordelijkeId INTO site_verantwoordelijke_id 
    FROM site 
    WHERE id = site_id;
    
    IF site_verantwoordelijke_id IS NOT NULL AND site_verantwoordelijke_id != NEW.techniekerId THEN
        INSERT INTO NotificatieVoorGebruiker (notificatieId, gebruikerId, status)
        VALUES (notificatie_id, site_verantwoordelijke_id, 'NIEUW');
    END IF;
END //
DELIMITER ;
```

### Stored Procedures

- **ProductieSimulatie.sql**:
```sql
DELIMITER //
CREATE PROCEDURE ProductieSimulatie(
    IN p_machine_code VARCHAR(255), 
    IN p_product_id INT,
    IN p_dagen_geleden INT,
    IN p_uren INT
)
BEGIN
    DECLARE start_tijd DATETIME;
    DECLARE eind_tijd DATETIME;
    DECLARE aantal_goed INT;
    DECLARE aantal_scrap INT;
    DECLARE machine_status VARCHAR(50);
    
    -- Bepaal start- en eindtijd op basis van de aantal dagen geleden en uren
    SET start_tijd = DATE_SUB(DATE_SUB(NOW(), INTERVAL p_dagen_geleden DAY), INTERVAL p_uren HOUR);
    SET eind_tijd = DATE_SUB(DATE_SUB(NOW(), INTERVAL p_dagen_geleden DAY), INTERVAL (p_uren - 1) HOUR);
    
    -- Controleer de huidige machine status
    SELECT status INTO machine_status FROM machine WHERE code = p_machine_code;
    
    -- Alleen productielogs genereren als de machine DRAAIEND of GESTOPT is (niet IN_ONDERHOUD)
    IF machine_status != 'IN_ONDERHOUD' THEN
        -- Genereer willekeurige aantallen voor goede en scrap producten
        -- Voor draaiende machines maken we meer goede producten
        IF machine_status = 'DRAAIEND' THEN
            SET aantal_goed = FLOOR(RAND() * 900) + 100; -- 100-1000 goede producten
            SET aantal_scrap = FLOOR(RAND() * 50); -- 0-50 scrap producten
        ELSE -- Voor gestopte machines slechts beperkte productie
            SET aantal_goed = FLOOR(RAND() * 200); -- 0-200 goede producten
            SET aantal_scrap = FLOOR(RAND() * 20); -- 0-20 scrap producten
        END IF;
        
        -- Voeg productlog toe
        INSERT INTO productLog (productId, machineId, aantalGoed, aantalScrap, startTijdstip, eindTijdstip)
        VALUES (p_product_id, p_machine_code, aantal_goed, aantal_scrap, start_tijd, eind_tijd);
    END IF;
END //
DELIMITER ;
```

### Events

- **EventProductieSimulatie.sql**:
```sql
DELIMITER //
CREATE EVENT ProductieSimulatieEvent
ON SCHEDULE EVERY 15 MINUTE
DO
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE m_code VARCHAR(255);
    DECLARE p_id INT;
    DECLARE cur CURSOR FOR 
        SELECT m.code, p.id
        FROM machine m
        CROSS JOIN product p
        WHERE m.status = 'DRAAIEND'
        ORDER BY RAND()
        LIMIT 10; -- Maximaal 10 machine-product combinaties per run
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO m_code, p_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Genereer productiegegevens voor huidige uur
        CALL ProductieSimulatie(m_code, p_id, 0, HOUR(NOW()));
        
        -- Soms ook historische gegevens genereren (voor de KPI grafieken)
        IF RAND() < 0.3 THEN -- 30% kans
            CALL ProductieSimulatie(m_code, p_id, 1, FLOOR(RAND() * 24)); -- Gisteren
        END IF;
        
        IF RAND() < 0.2 THEN -- 20% kans
            CALL ProductieSimulatie(m_code, p_id, FLOOR(RAND() * 7) + 1, FLOOR(RAND() * 24)); -- Afgelopen week
        END IF;
        
        IF RAND() < 0.1 THEN -- 10% kans
            CALL ProductieSimulatie(m_code, p_id, FLOOR(RAND() * 30) + 1, FLOOR(RAND() * 24)); -- Afgelopen maand
        END IF;
    END LOOP;
    
    CLOSE cur;
END //
DELIMITER ;
```

Deze database extensies zorgen samen voor:
1. Uitgebreide logging van alle belangrijke systeemgebeurtenissen
2. Automatische notificaties voor gebruikers op basis van hun rol en betrokkenheid
3. Simulatie van productiegegevens om realistische testomgevingen te creëren
4. Consistente bedrijfsregels die op databaseniveau worden afgedwongen

## Een oplijsting van de API calls, groepeer per entiteit

### Session
- `POST /api/sessions` - Aanmelden (login)
- `GET /api/sessions/valideer` - Valideer sessie

### Sites
- `GET /api/sites` - Alle sites ophalen
- `GET /api/sites/:id/machines` - Machines van site ophalen
- `GET /api/sites/:naam` - Site ophalen op naam
- `GET /api/sites/:id/onderhouden` - Onderhouden van site ophalen
- `PUT /api/sites/:id` - Site updaten (Manager)
- `GET /api/sites/:naam/downtime` - Downtime van site ophalen per view (dag/week/maand/kwartaal/jaar)
- `POST /api/sites` - Nieuwe site aanmaken (Manager)
- `DELETE /api/sites/:id` - Site verwijderen (Manager)

### Machines
- `GET /api/machines` - Alle machines ophalen
- `GET /api/machines/:code` - Machine ophalen op code
- `GET /api/machines/:code/onderhouden` - Onderhouden van machine ophalen
- `PUT /api/machines/:code` - Machine updaten
- `PUT /api/machines/:code/status` - Machine status updaten
- `GET /api/machines/:code/productie` - Productie van machine ophalen per view
- `GET /api/machines/:code/scrap` - Scrap van machine ophalen per view
- `GET /api/machines/:code/downtime` - Downtime van machine ophalen per view

### Onderhoud
- `GET /api/onderhouden` - Alle onderhouden ophalen
- `GET /api/onderhouden/:id` - Onderhoud ophalen op id
- `POST /api/onderhouden` - Nieuw onderhoud aanmaken
- `PUT /api/onderhouden/:id` - Onderhoud updaten
- `DELETE /api/onderhouden/:id` - Onderhoud verwijderen
- `POST /api/onderhouden/:id/fotos` - Foto's uploaden voor onderhoud
- `GET /api/onderhouden/:id/pdf-data` - PDF-gegevens van onderhoud ophalen

### Gebruikers
- `GET /api/gebruikers` - Alle gebruikers ophalen
- `GET /api/gebruikers/:id` - Gebruiker ophalen op id
- `POST /api/gebruikers` - Nieuwe gebruiker aanmaken
- `PUT /api/gebruikers/:id` - Gebruiker updaten
- `DELETE /api/gebruikers/:id` - Gebruiker verwijderen
- `GET /api/gebruikers/technieker` - Alle techniekers ophalen
- `GET /api/gebruikers/verantwoordelijke` - Alle verantwoordelijken ophalen

### KPIs
- `GET /api/kpi/productie` - Productie-KPIs ophalen
- `GET /api/kpi/scrap` - Scrap-KPIs ophalen
- `GET /api/kpi/downtime` - Downtime-KPIs ophalen

### Notificaties
- `GET /api/notificaties` - Alle notificaties van gebruiker ophalen
- `PUT /api/notificaties/:id/status` - Status van notificatie updaten
- `GET /api/notificaties/stats` - Notificatiestatistieken ophalen

### Health
- `GET /api/health` - Health check van de API

## Testen: printscreen van de testresultaten en coverage

SCREENSHOT TESTEN + COVERAGE

## Overzicht van de gebruikte technologieën

- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript superset
- **Koa** - Lichtgewicht web framework
- **Prisma ORM** - Type-safe database access
- **MySQL** - Relationele database
- **JWT** - JSON Web Tokens voor authenticatie
- **Joi** - Schema validatie
- **Swagger/OpenAPI** - API documentatie
- **Jest** - Test framework

# React applicatie

## URL online versie
- **URL online versie:** https://two025-react-gent14.onrender.com

## Logingegevens voor de verschillende rollen – lokaal en online

### Lokale omgeving
| Rol | E-mail | Wachtwoord |
|-----|--------|------------|
| Manager | sophie.devries@delaware.be | Manager123 |
| Technieker | tom.klein@delaware.be | Technieker123 |
| Verantwoordelijke | lars.smit@delaware.be | Verantwoordelijke123 |

### Online omgeving
| Rol | E-mail | Wachtwoord |
|-----|--------|------------|
| Manager | sophie.devries@delaware.be | Manager123 |
| Technieker | tom.klein@delaware.be | Technieker123 |
| Verantwoordelijke | lars.smit@delaware.be | Verantwoordelijke123 |

## Een voorbeeld van de .env bestanden

### .env.development
```
VITE_API_URL=http://localhost:9000/api
```

### .env.production
```
VITE_API_URL=https://two025-nodejs-gent14-gxtu.onrender.com/api
```

## Per use case: screenshots van de schermen en korte uitleg

### Aanmelden
![Login](./images/image-5.png)

Het loginscherm biedt een eenvoudige interface waar gebruikers hun e-mailadres en wachtwoord kunnen invoeren. De authenticatie wordt afgehandeld door de `useAuth` context, die JWT-tokens gebruikt om gebruikers ingelogd te houden. Na succesvolle authenticatie worden gebruikers doorgestuurd naar hun respectieve dashboards op basis van hun rol.

### Dashboard & Raadplegen KPIs
![Dashboard](./images/image-6.png)
Het Manager Dashboard toont een overzicht van alle belangrijke KPIs in het systeem:
- Productiecijfers per periode
- Scrap-statistieken
- Productie per product
- Scrap per product
- Downtime percentages

Managers kunnen via de TimeFrameFilter verschillende periodes selecteren (dag, week, maand, kwartaal, jaar) om de gegevens te bekijken.

### Raadplegen overzicht site
![Overzicht sites](./images/image-7.png)
Het site-overzicht toont alle locaties in zowel lijst- als rasterweergave. Elke site-kaart bevat:
- Naam van de site
- Verantwoordelijke persoon
- Aantal machines
- KPI-visualisaties (productie, scrap)

Managers kunnen tussen grid- en lijstweergave schakelen en hebben de mogelijkheid om sites toe te voegen of te bewerken.

### Kaartweergave sites
![Kaart](./images/image-8.png)

De kaartweergave toont alle sites op een interactieve kaart van België. Elke site wordt weergegeven als een marker met de volgende functionaliteiten:
- Klikken op een marker toont een pop-up met basisinformatie over de site
- Een link naar de detailpagina van de site
- Gekleurde indicators op basis van de status van machines op die locatie

### Site details
![Site details](./images/image-9.png)

De site-detailpagina bevat uitgebreide informatie over een specifieke locatie:
- Algemene site-informatie (adres, verantwoordelijke)
- Lijst van alle machines met status en filteropties
- KPI-grafieken voor productie, scrap en downtime
- Tabblad voor onderhoudstaken op de site
- Beheeropties voor managers (bewerken, verwijderen)

### Raadplegen details machine
![Machine details](./images/image-10.png)
De machine-detailpagina toont alle informatie over een specifieke machine:
- Technische specificaties (model, type, fabrikant)
- Huidige status en productie-informatie
- KPI-grafieken specifiek voor deze machine
- Onderhoudsgeschiedenis en geplande onderhoudstaken
- Bedieningselementen om de machine te starten of te stoppen (voor Techniekers en Verantwoordelijken)

### Machine stoppen/starten
![Starten/Stoppen](./images/image-19.png)
Techniekers en Verantwoordelijken kunnen machines besturen via de detailpagina:
- Start/stop knoppen afhankelijk van de huidige status
- Bevestigingsdialoog met redenselectie
- Real-time statusupdates
- Automatische notificatiegeneratie bij statuswijzigingen

### Beheren Site(s)
![Beheren sites](./images/image-11.png)
Managers kunnen sites toevoegen en bewerken via een uitgebreid formulier:
- Invoervelden voor alle site-informatie
- Validatie van ingevoerde gegevens
- Dropdown voor toewijzing van een verantwoordelijke+-
- Automatische geocodering van het adres voor de kaartweergave
- Bevestigingsmeldingen na succesvol opslaan

### Raadplegen details onderhoud
![overzicht onderhouden](./images/image-12.png)
![details onderhouden](./images/image-13.png)
De onderhoud-detailpagina toont alle informatie over een specifieke onderhoudstaak:
- Planning (start- en eindtijd)
- Betrokken machine
- Toegewezen technieker
- Status van het onderhoud
- Opmerkingen en foto's
- Mogelijkheid om een rapport te genereren

### Rapport genereren + export naar pdf
![alt text](./images/image-14.png)
![alt text](./images/image-15.png)
Gebruikers kunnen onderhoudsrapporten exporteren naar PDF:
- Een modal voor het uploaden van foto's bij het rapport
- Voorbeeldweergave van het rapport
- De gegenereerde PDF bevat alle relevante informatie over het onderhoud
- De PDF kan worden opgeslagen of afgedrukt

### Notificaties Raadplegen
![Noti Popup](./images/image-20.png)
![All notis](./images/image-21.png)
Het notificatiesysteem houdt gebruikers op de hoogte van belangrijke gebeurtenissen:
- Een notificatiebel in de navigatiebalk toont het aantal nieuwe notificaties
- De notificatiepagina categoriseert meldingen als nieuw, ongelezen en gelezen
- Per notificatie worden details getoond (tijd, locatie, inhoud)
- Gebruikers kunnen notificaties markeren als gelezen
- Notificaties bevatten directe links naar de relevante pagina's (machines, sites, onderhoud)

## Testen: printscreen van de testresultaten

SCREENSHOT TESTEN

## Overzicht van de gebruikte technologieën

### Frontend Frameworks & Libraries
- **React** - JavaScript UI library voor het bouwen van de gebruikersinterface
- **Vite** - Snelle build tool en development server
- **React Router** - Bibliotheek voor client-side routing
- **Context API** - Voor state management (auth, notificaties)
- **SWR** - React Hooks voor data fetching met caching en revalidatie

### UI & Styling
- **SCSS/Sass** - CSS preprocessor voor geavanceerde styling

### Visualisatie & Interactie
- **Recharts** - Bibliotheken voor data visualisatie
- **Leaflet** - Voor interactieve kaarten
- **Sonner** - Voor toast notifications
- **React Hook Form** - Voor formuliervalidatie en -beheer

### API Communicatie
- **Axios** - HTTP client voor API-aanroepen
- **SWR Mutation** - Voor het optimistisch updaten van UI-state

### Testing & QA
- **Cypress** - End-to-end testframework

### Build & Deployment
- **GitHub Actions** - CI/CD pipeline
- **Render** - Cloud hosting platform
- **ESLint** & **Prettier** - Code quality en formatting

# De tijdsregistratie per student

### Tom
- **Totaal aantal uren:** 81 uur
- **Gerealiseerde use cases:**
  - Notificaties raadplegen
  - Machine starten/stoppen
  - Sites beheren
  - Export naar PDF
- Recharts gevonden en uitgezocht

### Kyandro

### Alexandru

### Arnaut

### Kyandro




# Reflectie per student

### Tom
Ik ben erg tevreden over hoe het groepswerk verlopen is. Aangezien we allemaal bevriend zijn, bestond het risico dat we minder serieus zouden werken, maar gelukkig was dat bij ons absoluut niet het geval. De samenwerking en communicatie verliepen bijzonder vlot, en iedereen nam zijn verantwoordelijkheid op, waardoor het steeds duidelijk was wat van elk groepslid werd verwacht. De vrijheid die we kregen tijdens het uitvoeren van de opdracht vond ik erg positief, omdat dit ruimte gaf voor eigen initiatief en creativiteit. Sterker nog, het samenwerken verliep zó goed dat we besloten hebben om volgend jaar met ons vijven samen op stage naar Italië te gaan.

Een verbeterpunt blijft echter de communicatie vanuit de school: deze verliep moeizaam en had duidelijk beter gekund. Zo was bijvoorbeeld de eerste week al verstreken voordat we zelfs maar de use cases ontvingen.

### Kyandro

### Alexandru

### Arnaud

### Kyandro