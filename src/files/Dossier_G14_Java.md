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
- Aanmelden
  - Iedereen
- Beheren gebruikers
  - Admin
- Raadplegen logs
  - Admin
- Beheren site
  - Verantwoordelijke
- Beheren notificaties
  - Verantwoordelijke
- Onderhoud plannen
  - Verantwoordelijke
- Raadplegen details onderhoud
  - Verantwoordelijke
- Onderhoud uitvoeren
  - Technieker
- Beheren machines
  - Verantwoordelijke
- Rapport toevoegen
  - Technieker

Alle use cases zijn gerealiseerd.

## Extra
- Wachtwoord instellen na eerste keer inloggen
- Filtering logs
- Zoeken op alles van gebruiker

# Klassendiagram

![klassendiagram](images/domein.png)

# Databank schema

![DatabankSchema](images/DatabankSchema.png)

# Screenshots applicatie
## Algemeen
### LogIn
*Scherm dat gebruikers toelaat om in te loggen in de applicatie met email en wachtwoord*
![aamnmelden](images/aanmelden.png)

## Admin
### Keuzescherm
*Hoofdmenu voor administrators dat de beschikbare opties weergeeft na het inloggen*
![alt text](images/keuzescherm.png)

### Beheren gebruikers
*Overzicht van alle gebruikers in het systeem, georganiseerd op status (nieuw, actief, inactief)*
![alt text](images/beherenGebruikers.png)

### Gebruiker toevoegen
*Functionaliteit die administrators toelaat om nieuwe gebruikers toe te voegen aan het systeem*
![alt text](image.png)
![alt text](image-1.png)

### Gebruiker details
*Scherm dat gedetailleerde informatie weergeeft over een geselecteerde gebruiker*
![alt text](image-2.png)
![alt text](image-3.png)

### Gebruiker bewerken
*Scherm dat een formulier biedt om bestaande gebruikersinformatie te wijzigen*
![alt text](image-4.png)
![alt text](image-5.png)

### Raadplegen logs
*Scherm dat systeemactiviteitslogboeken weergeeft met filteropties*
![alt text](image-6.png)

## Algemeen
### LogOut
*Functionaliteit die gebruikers toelaat om veilig uit te loggen uit de applicatie*
![alt text](image-7.png)

## Verantwoordelijke
### Details Site
*Scherm dat gedetailleerde informatie over een site weergeeft, inclusief bijbehorende machines*
![alt text](image-8.png)

### Machine Toevoegen
*Scherm dat een formulier biedt voor het toevoegen van nieuwe machines aan een site*
![alt text](image-9.png)
![alt text](image-10.png)

### Machine Bewerken
*Functionaliteit die sitebeheerders toelaat om informatie voor bestaande machines bij te werken*
![alt text](image-11.png)
![alt text](image-12.png)

### Notificaties Beheren
*Scherm dat gebruikers toelaat om notificatievoorkeuren te configureren*
![alt text](image-13.png)
![alt text](image-14.png)

### Overzicht Onderhouden
*Scherm dat een overzicht van onderhoudstaken weergeeft*
![alt text](image-15.png)

### Onderhoud Inplannen
*Scherm dat een formulier biedt voor het plannen van nieuwe onderhoudstaken*
![alt text](image-16.png)
![alt text](image-17.png)

### Onderhoud Details
*Scherm dat gedetailleerde informatie over een specifieke onderhoudstaak weergeeft*
![alt text](image-18.png)
![alt text](image-19.png)

## Technieker
### Overzicht Onderhouden
*Overzicht van onderhoudstaken toegewezen aan een technicus*
![alt text](image-20.png)

### Onderhoud Details
*Scherm dat gedetailleerde informatie over een onderhoudstaak voor technici weergeeft*
![alt text](image-21.png)
![alt text](image-22.png)
![alt text](image-23.png)
![alt text](image-24.png)
![alt text](image-25.png)
![alt text](image-26.png)

### Exporteer PDF
*Functionaliteit die het genereren van een PDF-rapport voor voltooid onderhoud mogelijk maakt*
![alt text](image-27.png)
![alt text](image-28.png)
![alt text](image-29.png)
![alt text](image-30.png)
![alt text](image-31.png)

## Algemeen
### Wachtwoord veranderen na eerste inlog
*Scherm dat nieuwe gebruikers vraagt om hun wachtwoord te wijzigen na hun eerste aanmelding*
![alt text](image-32.png)
![alt text](image-33.png)

# Unit testen
## Fabrikant en Machine testen
![Test1](images/test4.png)

## Gebruiker en product testen
![Test2](images/test1.png)

## Onderhoud testen
![Test3](images/test2.png)

## Log en site testen
![Test4](images/test3.png)

# Tijdsregistratie
## Arnaud

## Alex

## Kyandro
- **Totale uren:** 44 uur
- **Samenvatting:**
  - Inlogscherm aangemaakt
  - Backend voor inloggen
  - Overzicht onderhouden pagina voor Verantwoordelijke
  - Overzicht onderhouden pagina voor Technieker
  - Pagina om wachtwoord aan te passen
  

## Tom
- **Totale uren:** 47 uur
- **Samenvatting:**
  - Form voor machine toevoegen / bewerken
  - Form gebruiker aanmaken / bewerken
  - Form onderhoud inplannen
  - Export onderhoud naar pdf
  - Styling overzicht onderhouden
  - Raadplegen logs tabel met Bavo


## Bavo