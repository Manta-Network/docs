---
sidebar_position: 2
sidebar_label: 📝 Configuration
title: 🚄 Setup and run a Collator
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Installation](installation) > Configuration > [Running](running) > [Session keys](keys) > [Sync](sync) > [Wait](wait)

## 📝 Configuration
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

<Tabs groupId="firewallports">
<TabItem value="docker" label="docker">

```
30333: default calamari peer-to-peer port
30334: default (embedded-relay) kusama peer-to-peer port
9615: default calamari metrics port
9616: default (embedded-relay) kusama metrics port
```

</TabItem>
<TabItem value="linux" label="linux">

```
31333: default calamari peer-to-peer port
31334: default (embedded-relay) kusama peer-to-peer port
9615: default calamari metrics port
9616: default (embedded-relay) kusama metrics port
```

</TabItem>
</Tabs>

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
