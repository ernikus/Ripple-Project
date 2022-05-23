# Export Full Keycloak Model

- Start the keycloak container as usual.
- Do all necessary configuration using WebUI
- Start new terminal window
- Plug into running keycloak container
  - `docker exec -it <keycloak_container_name> bash`
- Go into bin directory
  - `cd /opt/keycloak/bin`
- Export each configured realm to a seperate file using manager script. **Realm names are case sensitive!**
  - `./kc.sh export --file <your-realm-name>-export.json --realm <your-realm-name>`
- Copy each exported realm into volume
  - `cp <your-realm-name>-export.json /opt/keycloak/data/import`


Keycloak version 18 contains a bug and exported realms can't be imported straight-away. It is necessary to remove JSON objects from "policies" attribute.

Reference to this issue: https://github.com/keycloak/keycloak/issues/11664#issuecomment-1111062102

Find "type": "js" in the json file and remove all objects from the JSON list.


# Import Keycloak Config

Import is configured to work automatically when the keycloak container is starting. 

Reference: https://www.keycloak.org/server/importExport


## Manual import

- Start the keycloak container as usual
- Launch keycloak WebUI
- Import master realm from the master realm export
  - set policy to 'SKIP' if attribute already exists
- Click "Add Realm" and import Ripple-HotSeat realm from the Ripple-HotSeat realm export file
  - set policy same as for master realm

