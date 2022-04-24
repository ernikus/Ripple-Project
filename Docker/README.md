# Docker
Backend aplikacji jest gotowy do uruchomienia w formie kontenerów dockera, które można odpalić pojedyńczą komendą:
- `docker-compose up -d`

## Uwagi
- Aktualnie nie ma możliwości konfigurowania nazwy użytkownika i hasła w docker-compose wykorzystywanych przez backend i muszą być one "hardcoded" tak jak są teraz.
- Backend zależy również od nazwy usługi bazy danych wystawianej przez docker-compose, jeśli zostanie ona zmieniona to backend przestanie się łączyć z bazą (aktualnie usługa nazywa się mongodb_container)
- Backend posiada ustawiony wolumen na pliki w katalogu `Backend/hello-world`, po to aby można było obserwować wprowadzane zmiany w trakcie rozwoju backendu od razu po odświeżeniu przeglądarki, bez konieczności restartowania lub przebudowywania obrazu. 
