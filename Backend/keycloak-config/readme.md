# Export Full Keycloak Model

- Start the keycloak container as usual.
- Do all necessary configuration using WebUI
- Start new terminal window
- Plug into running keycloak container
  - `docker exec -it <keycloak_container_name> bash`
- Go into bin directory
  - `cd /opt/keycloak/bin`
- Export using manager script
  - `./kc.sh export --file keycloak-export.json`
- Copy exported config into volume
  - `cp keycloak-export.json /keycloak-config/`
 
# Import Keycloak Config

- Start the keycloak container as usual
- Import master realm from the full export
  - set policy to 'SKIP' if attribute already exists
- Create Ripple-HotSeat realm
- Import Ripple-HotSeat realm from the full export
  - set policy same as for master realm
