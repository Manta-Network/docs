
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

#  🚄 Setup and run a Calamari collator

## Installation

<Tabs groupId="os">
<TabItem value="docker" label="docker">
- pull the latest calamari container

  ```bash
  #!/bin/bash

  docker pull mantanetwork/calamari:latest
  ```
</TabItem>
<TabItem value="fedora" label="fedora">

the manta .rpm package contains:
- the manta binary (which is also used to run calamari)
- manta and calamari systemd services
- manta, calamari, polkadot and kusama chain specifications
- a script which runs after installation and creates the manta system account which the systemd service runs under

get started (see also: [rpm.manta.systems](https://rpm.manta.systems/)):

- add the manta .rpm repository

  ```bash
  #!/bin/bash

  sudo dnf install dnf-plugins-core
  sudo dnf config-manager --add-repo https://rpm.manta.systems/manta.repo
  sudo dnf config-manager --set-enabled manta
  sudo dnf update
  ```

- install manta

  ```bash
  #!/bin/bash

  sudo dnf install manta
  ```

</TabItem>
<TabItem value="ubuntu" label="ubuntu">

the manta .deb package contains:
- the manta binary (which is also used to run calamari)
- manta and calamari systemd services
- manta, calamari, polkadot and kusama chain specifications
- a script which runs after installation and creates the manta system account which the systemd service runs under

get started (see also: [deb.manta.systems](https://deb.manta.systems/)):

- add the manta .deb repository

  ```bash
  #!/bin/bash

  sudo curl -o /usr/share/keyrings/manta.gpg https://deb.manta.systems/manta.gpg
  sudo curl -o /etc/apt/sources.list.d/manta.list https://deb.manta.systems/manta.list
  sudo apt update
  ```

- install manta

  ```bash
  #!/bin/bash

  sudo apt install manta
  ```

</TabItem>
<TabItem value="linux" label="other linux">

- download binary, chain specifications and systemd unit file

  ```bash
  #!/bin/bash

  # intall jq on ubuntu
  sudo apt install jq

  # or on fedora
  sudo dnf install jq

  # get the latest version of binary
  manta_version=$(curl -s https://api.github.com/repos/Manta-Network/Manta/releases/latest | jq -r .tag_name | cut -c 2-)

  # binary
  sudo curl -Lo /usr/local/bin/manta https://github.com/Manta-Network/Manta/releases/download/v${manta_version}/manta
  sudo ln -srf /usr/local/bin/manta /usr/local/bin/calamari

  # chainspecs
  sudo mkdir -p /usr/share/substrate
  sudo curl -Lo /usr/share/substrate/calamari.json https://raw.githubusercontent.com/Manta-Network/Manta/v3.0.9/genesis/calamari-genesis.json
  sudo curl -Lo /usr/share/substrate/kusama.json https://raw.githubusercontent.com/paritytech/polkadot/master/node/service/res/kusama.json

  # systemd unit file
  sudo curl -Lo /etc/systemd/system/calamari.service https://raw.githubusercontent.com/Manta-Network/Manta/deb-rpm/scripts/package/calamari.service
  ```

- create the manta system account which the systemd service runs under

  ```bash
  #!/bin/bash

  sudo groupadd --system manta
  sudo useradd \
    --system \
    --gid manta \
    --home-dir /var/lib/substrate \
    --create-home \
    --shell /sbin/nologin \
    --comment 'service account for manta and calamari services' \
    manta
  ```
  
</TabItem>
</Tabs>

## Configuration
some extra command line parameters are required or helpful for collating.

<Tabs groupId="os">
<TabItem value="fedora" label="fedora">

edit the calamari service unit file to include collation parameters in the `ExecStart` command.

`/usr/lib/systemd/system/calamari.service`

```ini
ExecStart=/usr/bin/calamari \
    --collator \
    --name 'my parachain collator node name' \
    --chain /usr/share/substrate/calamari.json \
    --base-path /var/lib/substrate \
    --port 31333 \
    --ws-port 9144 \
    --ws-max-connections 100 \
    --rpc-port 9133 \
    --rpc-cors all \
    --rpc-methods auto \
    --prometheus-port 9615 \
    --prometheus-external \
    --state-cache-size 0 \
    --bootnodes \
        /dns/crispy.calamari.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc \
        /dns/crunchy.calamari.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt \
        /dns/hotdog.calamari.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv \
        /dns/tasty.calamari.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu \
        /dns/tender.calamari.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci \
    -- \
    --name 'my embedded relay node name' \
    --chain /usr/share/substrate/kusama.json \
    --port 31334 \
    --ws-port 9145 \
    --rpc-port 9134 \
    --prometheus-port 9616 \
    --prometheus-external \
    --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0'
```

</TabItem>
<TabItem value="ubuntu" label="ubuntu">

edit the calamari service unit file to include collation parameters in the `ExecStart` command.

`/usr/lib/systemd/system/calamari.service`

```ini
ExecStart=/usr/bin/calamari \
    --collator \
    --name 'my parachain collator node name' \
    --chain /usr/share/substrate/calamari.json \
    --base-path /var/lib/substrate \
    --port 31333 \
    --ws-port 9144 \
    --ws-max-connections 100 \
    --rpc-port 9133 \
    --rpc-cors all \
    --rpc-methods auto \
    --prometheus-port 9615 \
    --prometheus-external \
    --state-cache-size 0 \
    --bootnodes \
        /dns/crispy.calamari.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc \
        /dns/crunchy.calamari.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt \
        /dns/hotdog.calamari.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv \
        /dns/tasty.calamari.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu \
        /dns/tender.calamari.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci \
    -- \
    --name 'my embedded relay node name' \
    --chain /usr/share/substrate/kusama.json \
    --port 31334 \
    --ws-port 9145 \
    --rpc-port 9134 \
    --prometheus-port 9616 \
    --prometheus-external \
    --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0'
```

</TabItem>
<TabItem value="linux" label="other linux">

edit the calamari service unit file to include collation parameters in the `ExecStart` command.

`/etc/systemd/system/calamari.service`

```ini
ExecStart=/usr/local/bin/calamari \
    --collator \
    --name 'my parachain collator node name' \
    --chain /usr/share/substrate/calamari.json \
    --base-path /var/lib/substrate \
    --port 31333 \
    --ws-port 9144 \
    --ws-max-connections 100 \
    --rpc-port 9133 \
    --rpc-cors all \
    --rpc-methods auto \
    --prometheus-port 9615 \
    --prometheus-external \
    --state-cache-size 0 \
    --bootnodes \
        /dns/crispy.calamari.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc \
        /dns/crunchy.calamari.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt \
        /dns/hotdog.calamari.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv \
        /dns/tasty.calamari.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu \
        /dns/tender.calamari.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci \
    -- \
    --name 'my embedded relay node name' \
    --chain /usr/share/substrate/kusama.json \
    --port 31334 \
    --ws-port 9145 \
    --rpc-port 9134 \
    --prometheus-port 9616 \
    --prometheus-external \
    --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0'
```

</TabItem>
</Tabs>

### parameters with special significance for collator maintainers
two sets of parameters are supplied to the substrate node binary (calamari), separated by a double-dash (`--`). the first set controls the behavior of the parachain node. the second set controls the behaviour of the embedded relay-chain node.
- significant **parachain** parameters
  - `--collator`: run in collator mode. behaves the same as `--validator` on relay chains. setting this also causes pruning mode to be set to `archive` (like `--pruning archive`).
  - `--name`: parachain node name, displayed on [calamari telemetry](https://telemetry.manta.systems/#list/0x4ac80c99289841dd946ef92765bf659a307d39189b3ce374a92b5f0415ee17a1).
  - `--port`: parachain peer-to-peer port. calamari default is 31333. this port must be accessible over the internet to other calamari nodes.
  - `--prometheus-port`: parachain metrics port. calamari default is 9615. this port must be accessible to the manta metrics monitor at: `18.156.192.254` (`18.156.192.254/32` if you are specifying by subnet)
  - `--prometheus-external`: if you are not reverse proxying metrics over ssl, you may need to set this parameter to tell the embedded metrics server to listen on the *all ips* socket (`0.0.0.0:9615`) rather than *localhost only* (`127.0.0.1:9615`)
- significant **relay-chain** parameters
  - `--name`: relay-chain node name, displayed on [kusama telemetry](https://telemetry.manta.systems/#list/0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe).
  - `--port`: relay-chain peer-to-peer port. calamari-embedded-kusama default is 31334. this port must be accessible over the internet to other kusama nodes.
  - `--prometheus-port`: relay-chain metrics port. calamari-embedded-kusama default is 9616. this port must be accessible to the manta metrics monitor at: `18.156.192.254` (`18.156.192.254/32` if you are specifying by subnet)
  - `--prometheus-external`: if you are not reverse proxying metrics over ssl, you may need to set this parameter to tell the embedded metrics server to listen on the *all ips* socket (`0.0.0.0:9616`) rather than *localhost only* (`127.0.0.1:9616`)

### expose node metrics for monitoring
you should monitor your own collator using the techniques described on the [polkadot wiki](https://wiki.polkadot.network/docs/maintain-guides-how-to-monitor-your-node). the metrics exposed on ports `9615` and `9616` facilitate this, so these ports (or port `443`, if ssl proxied) should be accessible both from your own prometheus/alertmanager server (which you should configure to alert you, using alertmanager) and manta's [pulse server](https://pulse.pelagos.systems) at `18.156.192.254` (which is monitored by manta devops).

#### firewall configuration
several ports are required to be accessible from outside of the node host in order for the collator to function well. for simplicity, the settings documented below use the default ports, however feel free to use alternative ports as required by your infrastructure and network topology.
- **31333**: default calamari peer-to-peer port
- **31334**: default (embedded-relay) kusama peer-to-peer port
- **9615**: default calamari metrics port
- **9616**: default (embedded-relay) kusama metrics port

#### reverse proxy metrics over ssl with letsencrypt and nginx
it is good practice to serve your metrics over:

- **ssl**, so that their authenticity and provenance can be verified
- **dns**, so that changes to your ip address don't require a pulse server update

it also makes it much easier for an alert observer to work out which collators are performing well (or poorly) when they are looking at domain names like `calamari.awesome-host.awesome-collators.com` versus ip addresses and port combinations like `123.123.123.123:987` which may not make it obvious wich collator is being observed and wether the metric in question refers to the relay-chain or parachain.

an easy way to accomplish this is to install certbot and nginx and configure a reverse proxy listening on port 443 and which proxies ssl requests to the local metrics ports.

the example below assumes:
- you administer the domain **example.com**
- its dns is managed by cloudflare or route53
- your nodes hostname is **bob**
- your calamari node uses default ports
- your internet gateway (router) port forwards 443/ssl traffic arriving on the routers wan interface to your collator node
- you have certbot installed

:::note
cloudflare and route53 examples follow. google `python3-certbot-dns-${your_dns_provider}` for other examples
:::

- install certbot and a dns validation plugin

  <Tabs groupId="os">
  <TabItem value="fedora" label="fedora">
  
  ```bash
  #!/bin/bash
  
  sudo dnf install \
    certbot \
    python3-certbot-dns-cloudflare \
    python3-certbot-dns-route53
  ```
  
  </TabItem>
  <TabItem value="ubuntu" label="ubuntu">
  
    ```bash
    #!/bin/bash
    
    sudo apt-get install \
      certbot \
      python3-certbot-dns-cloudflare \
      python3-certbot-dns-route53
    ```
  
  </TabItem>
  </Tabs>

- request a cert using a dns plugin so that certbot is able to automatically renew the cert near the expiry date. manually requested certs must be manually updated to keep ssl certs valid, so they should be avoided.

  <Tabs groupId="certbot">
  <TabItem value="cloudflare" label="cloudflare">

    ```bash
    #!/bin/bash
    
    sudo certbot certonly \
      --dns-cloudflare \
      --dns-cloudflare-credentials .cloudflare-credentials \
      -d bob.example.com \
      -d calamari.metrics.bob.example.com \
      -d kusama.metrics.bob.example.com
    ```

  </TabItem>
  <TabItem value="route53" label="route53">

    ```bash
    #!/bin/bash
    
    sudo certbot certonly \
      --dns-route53 \
      --dns-route53-propagation-seconds 30 \
      -d bob.example.com \
      -d calamari.metrics.bob.example.com \
      -d kusama.metrics.bob.example.com
    ```

  </TabItem>
  </Tabs>

- configure nginx `/etc/nginx/sites-enabled/example.com.conf` to reverse proxy dns subdomains to local metrics ports.
  ```
  server {
    server_name calamari.metrics.bob.example.com;
    listen 443 ssl;
    gzip off;
    location / {
      proxy_pass http://127.0.0.1:9615;
      proxy_http_version 1.1;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
  }

  server {
    server_name kusama.metrics.bob.example.com;
    listen 443 ssl;
    gzip off;
    location / {
      proxy_pass http://127.0.0.1:9616;
      proxy_http_version 1.1;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }
    ssl_certificate /etc/letsencrypt/live/bob.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bob.example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
  }
  ```

<Tabs groupId="os">
<TabItem value="fedora" label="fedora">

```bash
#!/bin/bash

default_zone=$(sudo firewall-cmd --get-default-zone)

# calamari p2p
sudo firewall-cmd \
  --zone=${default_zone} \
  --add-port=31333/tcp \
  --permanent

# kusama p2p
sudo firewall-cmd \
  --zone=${default_zone} \
  --add-port=31334/tcp \
  --permanent

# calamari metrics
sudo firewall-cmd \
  --zone=${default_zone} \
  --add-port=9615/tcp \
  --permanent

# kusama metrics
sudo firewall-cmd \
  --zone=${default_zone} \
  --add-port=9616/tcp \
  --permanent

sudo firewall-cmd --reload
```

</TabItem>
</Tabs>

## Running



<Tabs groupId="os">
<TabItem value="docker" label="docker">

- start your docker node

  ```bash
  docker run \
    -it \
    -p 9933:9933 \
    -p 30333:30333 \
    -v host_path:/container_path \
    --name your_container_name \
    mantanetwork/calamari:latest \
    --base-path /container_path/data \
    --keystore-path /container_path/keystore \
    --name your_collator_name \
    --rpc-cors all \
    --collator \
    --rpc-methods=unsafe \
    --unsafe-rpc-external
  ```

  Examples of these name and paths:

  `host_path:/container_path` => `~/my-calamari-db:/calamari`

  `your_collator_name` => `Community-Collator-1`

  Ensure you can see a line of log like this:

  ```bash
  👤 Role: AUTHORITY
  ```

</TabItem>
<TabItem value="fedora" label="fedora">

- check the status of the calamari service:

  ```bash
  #!/bin/bash

  systemctl status calamari.service
  ```

- enable calamari service (the service will start automatically on system boot):

  ```bash
  #!/bin/bash

  sudo systemctl enable calamari.service
  ```

- start calamari service:

  ```bash
  #!/bin/bash

  sudo systemctl start calamari.service
  ```

- stop calamari service:

  ```bash
  #!/bin/bash

  sudo systemctl stop calamari.service
  ```

- tail the calamari service logs:

  ```bash
  #!/bin/bash

  journalctl -u calamari.service -f
  ```

- debug calamari service configuration (run calamari as the manta user, to quickly check for runtime errors):

  ```bash
  #!/bin/bash

  sudo -H -u manta bash -c '/usr/bin/calamari --chain /usr/share/substrate/calamari.json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/crispy.calamari.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc /dns/crunchy.calamari.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt /dns/hotdog.calamari.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv /dns/tasty.calamari.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu /dns/tender.calamari.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci -- --chain /usr/share/substrate/kusama.json'
  ```

</TabItem>
<TabItem value="ubuntu" label="ubuntu">

- check the status of the calamari service:

  ```bash
  #!/bin/bash

  systemctl status calamari.service
  ```

- enable calamari service (the service will start automatically on system boot):

  ```bash
  #!/bin/bash

  sudo systemctl enable calamari.service
  ```

- start calamari service:

  ```bash
  #!/bin/bash

  sudo systemctl start calamari.service
  ```

- stop calamari service:

  ```bash
  #!/bin/bash

  sudo systemctl stop calamari.service
  ```

- tail the calamari service logs:

  ```bash
  #!/bin/bash

  journalctl -u calamari.service -f
  ```

- debug calamari service configuration (run calamari as the manta user, to quickly check for runtime errors):

  ```bash
  #!/bin/bash

  sudo -H -u manta bash -c '/usr/bin/calamari --chain /usr/share/substrate/calamari.json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/crispy.calamari.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc /dns/crunchy.calamari.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt /dns/hotdog.calamari.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv /dns/tasty.calamari.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu /dns/tender.calamari.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci -- --chain /usr/share/substrate/kusama.json'
  ```

</TabItem>
<TabItem value="linux" label="other linux">

- check the status of the calamari service:

  ```bash
  #!/bin/bash

  systemctl status calamari.service
  ```

- enable calamari service (the service will start automatically on system boot):

  ```bash
  #!/bin/bash

  sudo systemctl enable calamari.service
  ```

- start calamari service:

  ```bash
  #!/bin/bash

  sudo systemctl start calamari.service
  ```

- stop calamari service:

  ```bash
  #!/bin/bash

  sudo systemctl stop calamari.service
  ```

- tail the calamari service logs:

  ```bash
  #!/bin/bash

  journalctl -u calamari.service -f
  ```

- debug calamari service configuration (run calamari as the manta user, to quickly check for runtime errors):

  ```bash
  #!/bin/bash

  sudo -H -u manta bash -c '/usr/local/bin/calamari --chain /usr/share/substrate/calamari.json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/crispy.calamari.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc /dns/crunchy.calamari.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt /dns/hotdog.calamari.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv /dns/tasty.calamari.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu /dns/tender.calamari.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci -- --chain /usr/share/substrate/kusama.json'
  ```

</TabItem>
</Tabs>


## Collator session (aura) keys

to collate, two accounts/keys are required at any given time.
- **collator account**: this is the account that holds the collator bond of 400,000 KMA. it is also the account that the collator's share of transaction fees will be deposited into. the bond cannot be spent while the account is collating. the keys for this account should be protected carefully and should never exist on the filesystem of the collator node.
- **aura session key**: this is a disposable account used by the collator node to author blocks. it is bound to the collator account. it is good practice to rotate the session key on a regular basis and up to once per session. substrate stores the keys for this account in the parachain keystore on the filesystem of the collator node (`/var/lib/substrate/chains/calamari/keystore`) when either of the author_insertKey or author_rotateKeys rpc methods are called.

:::note
both of the following methods (insert, rotate) use an unsafe rpc call to set the node session key. you must stop the service if it is running, then run the node with the `--rpc-methods=unsafe` parameter setting in order for the calls to succeed. don't forget to change the setting back to `safe` afterwards as a node that allows unsafe rpc calls and has an exposed rpc port can easily have its session keys changed by anyone, reulting in transaction fees being paid out somewhere other than where they are intended.
:::

<Tabs groupId="keys">
<TabItem value="insert" label="insert">

this command demonstrates a session key insertion using a key created with [subkey](https://docs.substrate.io/v3/tools/subkey).

- generate an aura key with subkey

  ```bash
  #!/bin/bash
  
  subkey generate \
    --scheme sr25519 \
    --network calamari \
    --output-type json \
    --words 12 \
    > ./aura.json
  ```

- create an author_insertKey rpc payload

  ```bash
  #!/bin/bash
  
  echo '{
      "jsonrpc":"2.0",
      "id":1,
      "method":"author_insertKey",
      "params": [
        "aura",
        "<mnemonic phrase>",
        "<public key>"
      ]
    }' | jq \
      --arg mnemonic "$(jq -r .secretPhrase ./aura.json)" \
      --arg public "$(jq -r .publicKey ./aura.json)" \
      '. | .params[1] = $mnemonic | .params[2] = $public' > ./payload.json
  ```

- execute the author_insertKey rpc payload

  ```bash
  #!/bin/bash
  
  curl \
    --header 'Content-Type: application/json;charset=utf-8' \
    --data @./payload.json \
    http://localhost:9133
  ```

- *validation assertion*: optionally, check that the aura mnemonic in use by the node, matches the one generated

  ```bash
  #!/bin/bash
  
  sudo -H -u manta cat /var/lib/substrate/chains/calamari/keystore/$(sudo -H -u manta ls /var/lib/substrate/chains/calamari/keystore/)
  ```

- *validation assertion*: optionally, check that the service logs show that the node is running with role: `AUTHORITY` (check the timestamps)

  ```bash
  #!/bin/bash
  
  journalctl -u calamari.service -g AUTHORITY
  ```

- *clean up*: remove secrets from the filesystem that were created when generated and for the payload

  ```bash
  #!/bin/bash
  
  rm ./aura.json ./payload.json
  ```

</TabItem>
<TabItem value="rotate" label="rotate">

this command demonstrates a session key rotation. if no session key exists, one is created.

```bash
#!/bin/bash

curl -H 'Content-Type: application/json' --data '{ "jsonrpc":"2.0", "method":"author_rotateKeys", "id":1 }' http://localhost:9933
```

the output from the rpc call should look like this (the `result` property contains the hex representation of the aura session account's *public* key):
```json
{"jsonrpc":"2.0","result":"0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f61","id":1}
```

</TabItem>
</Tabs>

### bind the collator account to the aura session key

:::note
if your collator node logs do not contain both `[Relaychain] 💤 Idle` and `[Parachain] 💤 Idle` messages, your node is still syncing. **do not bind** a collator account to an aura session key for a node whose sync is incomplete. doing so will result in ejection of your collator.
:::

account binding is accomplished on-chain. the simplest way to do this, is with polkadot.js.

- load [calamari/developer/extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics) in a browser:
  ![session.setkeys()](/img/collator-program/session.setkeys.png)
   - in the first box, labelled "using the selected account", select the collator account holding the 400,000 KMA collator bond.
   - in the second (dropdown) box labelled "submit the following extrinsic", select `session`.
   - in the third (dropdown) box, select `setKeys(keys, proof)`
   - in both the fourth box and fifth boxes, labelled `aura: SpConsensusAuraSr25519AppSr25519Public` and `proof: Bytes`, enter the hex public key of the aura session key.
   - click on the `Submit Transaction` button and wait for confirmation (a green tick), to appear in the upper right corner of the browser window.
- verify that the collator account and the aura session key are *bound* by loading [calamari/developer/chain state](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate) in a browser:
  ![session.nextkeys()](/img/collator-program/session.nextkeys.png)
   - in the first (dropdown) box, labelled "selected state query", select `session`.
   - in the second (dropdown) box, select `nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>`.
   - in the third (dropdown) box, select the collator account holding the 400,000 KMA collator bond.
   - leave the `include option` checkbox selected.
   - leave the `blockhash to query at` box set to the default `0x` value.
   - click on the small plus (`+`) icon to the right of the second dropdown box.
   - verify that a new box labelled `session.nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>` appears and contains a json object whose `aura` value is set to the aura session hex public key generated earlier.


## Sync

if you have no peers on the relaychain or your node is failing to verify new blocks, ensure your node’s clock is accurate, ie. by syncing with an ntp timeserver.

you must sync both the calamari parachain and kusama relay-chain before the motion to include your collator is passed. completely synced substrate blockchain nodes will show an idle state in their logs for both `[Relaychain]` and `[Parachain]` and looks like so:

```shell=
2022-03-01 17:18:58 [Parachain] 💤 Idle (49 peers), best: #1037783 (0xa0c5…04a8), finalized #1037781 (0xabd5…1c05), ⬇ 16.7kiB/s ⬆ 14.5kiB/s
2022-03-01 17:18:55 [Relaychain] 💤 Idle (49 peers), best: #11619808 (0x24a5…ad58), finalized #11619804 (0xa362…2df4), ⬇ 478.0kiB/s ⬆ 520.5kiB/s
```

if your collator node logs do not contain both `[Relaychain] 💤 Idle` and `[Parachain] 💤 Idle` messages, your node is still syncing. do not bind a collator account to an aura session key for a node whose sync is incomplete. doing so will result in ejection of your collator.

the best way to sync is to just run your node until the idle messages show up in your logs. doing so may take up to 2 weeks, however it will also give you a perfect, cryptographically validated and complete history of the blockchains you are syncing.

if you cannot wait for the recommended sync mechanism to complete, you may obtain a fast-sync copy of the calamari and kusama blockchains taken from manta's backup nodes. to do so:
- stop your calamari service
- delete your calamari and kusama databases from the basepath (taking care not to delete your keystores which are also under the basepath)
- fetch a copy of the blockchains, extracting if required
- ensure that the entire basepath and all of its contents are owned by the user your node runs under (change ownership recursively if required)
- start your calamari service
- verify that the node is syncing correctly
- wait for both parachain and relay-chain idle messages to appear in the logs

fast-sync commands (requires [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)):
```bash
#!/bin/bash

# stop calamari service
sudo systemctl stop calamari.service

# sync calamari blockchain database
sudo -H -u manta aws s3 sync --region eu-central-1 --no-sign-request --delete s3://calamari-kusama/var/lib/substrate/chains/calamari/db/full /var/lib/substrate/chains/calamari/db/full

# sync kusama blockchain database
sudo -H -u manta aws s3 sync --region eu-central-1 --no-sign-request --delete s3://calamari-kusama/var/lib/substrate/polkadot/chains/ksmcc3/db/full /var/lib/substrate/polkadot/chains/ksmcc3/db/full

# update database `current` manifests
sudo -H -u manta bash -c 'basename $(ls /var/lib/substrate/chains/calamari/db/full/MANIFEST-*) > /var/lib/substrate/chains/calamari/db/full/CURRENT'
sudo -H -u manta bash -c 'basename $(ls /var/lib/substrate/polkadot/chains/ksmcc3/db/full/MANIFEST-*) > /var/lib/substrate/polkadot/chains/ksmcc3/db/full/CURRENT'
sudo -H -u manta bash -c 'basename $(ls /var/lib/substrate/polkadot/chains/ksmcc3/db/full/parachains/db/MANIFEST-*) > /var/lib/substrate/polkadot/chains/ksmcc3/db/full/parachains/db/CURRENT'
```

## Wait

Ensure you have completed the [collator application](https://docs.google.com/forms/d/e/1FAIpQLScizDDMq7jWeOPVVEMr3EY_Z6N6ugdkL8aKgAbZ9lAJX6DEOQ/viewform) form. If approved, Calamari council will submit a motion to promote you as a candidate.

:::note
Candidate doesn’t mean your node is collator. For example, if there are 3 candidate places, and other candidates occupy all places, whilst you’re in 4th position, you have to wait until a node is unregistered or new collator places are opened by the council.
:::

If your collator gets a place, two sessions (`12` to `24` hours) after the candidacy motion passes, you will see blocks produced by your collator in the [explorer](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/explorer).
