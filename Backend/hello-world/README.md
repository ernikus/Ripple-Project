# Backend Hello World
Prosta implementacja, która wykonuje połączenie z bazą danych i udostępnia 3 podstawowe endpointy:
- / (przywitanie, domyślna strona)
- /desks (zwraca wszystkie dostępne biurka w bazie danych)
- /add-desk (dodaje losowo wygenerowane biurko)

## Uruchomienie
- Przejdź do katalogu Docker
- `docker-compose up - d`
- Uruchom przeglądarkę internetową pod adresem: http://localhost:50000

## Development
Aktualnie obraz backendu jest tak ustawiony, żeby można było w prosty sposób obserwować wprowadzane zmiany w kodzie. Aktualnie wystarczy odświeżyć przeglądarkę i już można zobaczyć wprowadzone zmiany.
