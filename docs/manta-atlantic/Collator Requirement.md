# Requirements

## MANTA Bond[](https://docs.calamari.network/docs/calamari/Staking/Collation/Requirements#kma-bond)

400_000 MANTA must be available to post as collator bond

## Hardware and Infrastructure[](https://docs.calamari.network/docs/calamari/Staking/Collation/Requirements#hardware-and-infrastructure)

a. Running on your own hardware and within you own premises (recommended):

-   collator system host (note that a substrate collator will utilize all available system ram and all available cpu cores unless specifically configured not to do so)
    -   cpu: 8 cores
    -   memory: 32 gb of ram (more is better)
    -   disk space: 500 gb of disk space dedicated to the blockchain basepath (more is better)
-   infrastructure and environment

    -   network bandwidth: 100 mbps+
    -   internet-accessible ports:

        -   **31333**: default manta peer-to-peer port
        -   **31334**: default (embedded-relay) polkadot peer-to-peer port
        -   **9615**: default manta metrics port
        -   **9616**: default (embedded-relay) polkadot metrics port

        you should monitor your own collator using the techniques described on the [polkadot wiki](https://wiki.polkadot.network/docs/maintain-guides-how-to-monitor-your-node). the metrics exposed on ports 9615 and 9616 facilitate this, so these ports should be accessible both from your own prometheus/alertmanager server (which should be configured to alert you) and manta devops' [pulse server](https://pulse.pelagos.systems/) at `18.156.192.254` (monitored by manta devops).

    -   an uninterrupted power supply to both the collator node and the network switches and routers that provide its connectivity must be capable of keeping the system online during provider power outages
    -   a failover 4g or 5g router should be included in your network topology to provide connectivity in the event of a wired or fibre connection failure
    -   your network management should include automatic dns updates in the event of changes to your nodes publicly accessible ip addressing

b. Running on AWS EC2

-   instance type: r5ad.xlarge or similar
-   image: Ubuntu 22.04 (latest ubuntu server ami from Canonical/099720109477)

c. Azure/GCP or other cloud/datacenter provider

-   Please use your judgement to match or surpass the requirements for other environments above

# **[SetupAndRun](https://docs.calamari.network/docs/calamari/Staking/Collation/Requirements#)**

# 🚄 Setup and run a Collator

## 🥡 Installation[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/installation#-installation)

-   docker
-   fedora
-   ubuntu
-   other linux
-   pull the latest manta container

`#!/bin/bash*# Depending on your setup, here are some steps to get started# Upgrade to latest version*sudo apt update && sudo apt upgrade -y*# Install docker*sudo apt install docker.io*# Add current user to docker*sudo usermod -aG docker $USER*# Pull the manta image*docker pull mantanetwork/manta:latest`

## 📝 Configuration[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/configuration#-configuration)

some extra command line parameters are required or helpful for collating.

-   fedora
-   ubuntu
-   other linux

edit the manta service unit file to include collation parameters in the `ExecStart` command.

`/usr/lib/systemd/system/manta.service`

for version `>= v4.6.0` (inclusive)
```
ExecStart=/usr/bin/manta \
    --collator \
    --name 'my parachain collator node name' \
    --chain /usr/share/substrate/manta.json \
    --base-path /var/lib/substrate \
    --port 31333 \
    --rpc-max-connections 100 \
    --rpc-port 9144 \
    --rpc-cors all \
    --rpc-methods auto \
    --prometheus-port 9615 \
    --prometheus-external \
    --state-cache-size 0 \
		--bootnodes \
		        /dns/a1.manta.systems/tcp/30333/p2p/12D3KooWCpnkG834s9ETesFTWtGqRDjs6Te1UCXHib3iD8GEmXLU \
		        /dns/a4.manta.systems/tcp/30333/p2p/12D3KooWN9Zud842idiiUypJF9nzQfNrSsuWQRdtRA8D6sqsPXMb \
		        /dns/a5.manta.systems/tcp/30333/p2p/12D3KooWM6Txo8orkxGsSTPByzzWhtTSfdFi2u9KJtd9eWCkry3k \
            /dns/a7.manta.systems/tcp/30333/p2p/12D3KooWFKMcE12XRLZfktX3crfkZyyBetpHsffDjPopYVhQLXwP \
		        /dns/c1.manta.systems/tcp/30333/p2p/12D3KooWSNwD7tJkqKGdMfCVTJbbzrGFTGbXoeMFZCTwEytpFCM4 \
    -- \
    --name 'my embedded relay node name' \
    --chain /usr/share/substrate/polkadot.json \
    --port 31334 \
    --rpc-port 9145 \
    --prometheus-port 9616 \
    --prometheus-external \
    --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0'
```

for version `< v4.6.0` (exclusive)
```
ExecStart=/usr/bin/manta \
    --collator \
    --name 'my parachain collator node name' \
    --chain /usr/share/substrate/manta.json \
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
		        /dns/a1.manta.systems/tcp/30333/p2p/12D3KooWCpnkG834s9ETesFTWtGqRDjs6Te1UCXHib3iD8GEmXLU \
		        /dns/a4.manta.systems/tcp/30333/p2p/12D3KooWN9Zud842idiiUypJF9nzQfNrSsuWQRdtRA8D6sqsPXMb \
		        /dns/a5.manta.systems/tcp/30333/p2p/12D3KooWM6Txo8orkxGsSTPByzzWhtTSfdFi2u9KJtd9eWCkry3k \
            /dns/a7.manta.systems/tcp/30333/p2p/12D3KooWFKMcE12XRLZfktX3crfkZyyBetpHsffDjPopYVhQLXwP \
		        /dns/c1.manta.systems/tcp/30333/p2p/12D3KooWSNwD7tJkqKGdMfCVTJbbzrGFTGbXoeMFZCTwEytpFCM4 \
    -- \
    --name 'my embedded relay node name' \
    --chain /usr/share/substrate/polkadot.json \
    --port 31334 \
    --ws-port 9145 \
    --rpc-port 9134 \
    --prometheus-port 9616 \
    --prometheus-external \
    --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0'

```

### parameters with special significance for collator maintainers[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/configuration#parameters-with-special-significance-for-collator-maintainers)

two sets of parameters are supplied to the substrate node binary (manta), separated by a double-dash (`--`). the first set controls the behavior of the parachain node. the second set controls the behaviour of the embedded relay-chain node.

-   significant **parachain** parameters
    -   `-collator`: run in collator mode. behaves the same as `-validator` on relay chains. setting this also causes pruning mode to be set to `archive` (like `-pruning archive`).
    -   `-name`: parachain node name, displayed on [manta telemetry](https://telemetry.manta.systems/#list/0x4ac80c99289841dd946ef92765bf659a307d39189b3ce374a92b5f0415ee17a1).
    -   `-port`: parachain peer-to-peer port. manta default is 31333. this port must be accessible over the internet to other manta nodes.
    -   `-prometheus-port`: parachain metrics port. manta default is 9615. this port must be accessible to the manta metrics monitor at: `18.156.192.254` (`18.156.192.254/32` if you are specifying by subnet)
    -   `-prometheus-external`: if you are not reverse proxying metrics over ssl, you may need to set this parameter to tell the embedded metrics server to listen on the *all ips* socket (`0.0.0.0:9615`) rather than *localhost only* (`127.0.0.1:9615`)
-   significant **relay-chain** parameters
    -   `-name`: relay-chain node name, displayed on [polkadot telemetry](https://telemetry.manta.systems/#list/0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe).
    -   `-port`: relay-chain peer-to-peer port. manta-embedded-polkadot default is 31334. this port must be accessible over the internet to other polkadot nodes.
    -   `-prometheus-port`: relay-chain metrics port. manta-embedded-polkadot default is 9616. this port must be accessible to the manta metrics monitor at: `18.156.192.254` (`18.156.192.254/32` if you are specifying by subnet)
    -   `-prometheus-external`: if you are not reverse proxying metrics over ssl, you may need to set this parameter to tell the embedded metrics server to listen on the *all ips* socket (`0.0.0.0:9616`) rather than *localhost only* (`127.0.0.1:9616`)

### expose node metrics for monitoring[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/configuration#expose-node-metrics-for-monitoring)

you should monitor your own collator using the techniques described on the [polkadot wiki](https://wiki.polkadot.network/docs/maintain-guides-how-to-monitor-your-node). the metrics exposed on ports `9615` and `9616` facilitate this, so these ports (or port `443`, if ssl proxied) should be accessible both from your own prometheus/alertmanager server (which you should configure to alert you, using alertmanager) and manta's [pulse server](https://pulse.pelagos.systems/) at `18.156.192.254` (which is monitored by manta devops).

### firewall configuration[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/configuration#firewall-configuration)

several ports are required to be accessible from outside of the node host in order for the collator to function well. for simplicity, the settings documented below use the default ports, however feel free to use alternative ports as required by your infrastructure and network topology.

-   docker
-   linux

```
30333: default manta peer-to-peer port
30334: default (embedded-relay) polkadot peer-to-peer port
9615: default mantametrics port
9616: default (embedded-relay) polkadot metrics port

```

### reverse proxy metrics over ssl with letsencrypt and nginx[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/configuration#reverse-proxy-metrics-over-ssl-with-letsencrypt-and-nginx)

it is good practice to serve your metrics over:

-   **ssl**, so that their authenticity and provenance can be verified
-   **dns**, so that changes to your ip address don't require a pulse server update

it also makes it much easier for an alert observer to work out which collators are performing well (or poorly) when they are looking at domain names like `manta.awesome-host.awesome-collators.com` versus ip addresses and port combinations like `123.123.123.123:987` which may not make it obvious wich collator is being observed and wether the metric in question refers to the relay-chain or parachain.

an easy way to accomplish this is to install certbot and nginx and configure a reverse proxy listening on port 443 and which proxies ssl requests to the local metrics ports.

the example below assumes:

-   you administer the domain **example.com**
-   its dns is managed by cloudflare or route53
-   your nodes hostname is **bob**
-   your manta node uses default ports
-   your internet gateway (router) port forwards 443/ssl traffic arriving on the routers wan interface to your collator node
-   you have certbot installed

NOTE

cloudflare and route53 examples follow. google `python3-certbot-dns-${your_dns_provider}` for other examples

-   install certbot and a dns validation plugin

    -   fedora
    -   ubuntu

    ```bash
    #!/bin/bash

    sudo dnf install \
      certbot \
      python3-certbot-dns-cloudflare \
      python3-certbot-dns-route53

    ```

-   request a cert using a dns plugin so that certbot is able to automatically renew the cert near the expiry date. manually requested certs must be manually updated to keep ssl certs valid, so they should be avoided.

    -   cloudflare
    -   route53

    ```bash
    #!/bin/bash

    sudo certbot certonly \
      --dns-cloudflare \
      --dns-cloudflare-credentials .cloudflare-credentials \
      -d bob.example.com \
      -d manta.metrics.bob.example.com \
      -d polkadot.metrics.bob.example.com

    ```

-   configure nginx `/etc/nginx/sites-enabled/example.com.conf` to reverse proxy dns subdomains to local metrics ports.

    ```
    server {
      server_name manta.metrics.bob.example.com;
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
      server_name polkadot.metrics.bob.example.com;
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

-   fedora

```bash
#!/bin/bash

default_zone=$(sudo firewall-cmd --get-default-zone)

*# manta p2p*
sudo firewall-cmd \
  --zone=${default_zone} \
  --add-port=31333/tcp \
  --permanent

*# polkadot p2p*
sudo firewall-cmd \
  --zone=${default_zone} \
  --add-port=31334/tcp \
  --permanent

*# manta metrics*
sudo firewall-cmd \
  --zone=${default_zone} \
  --add-port=9615/tcp \
  --permanent

*# polkadot metrics*
sudo firewall-cmd \
  --zone=${default_zone} \
  --add-port=9616/tcp \
  --permanent
sudo firewall-cmd --reload
```

## **⚙️ Running**

**docker**

-   start your docker node

    ```bash
    #Non production sample
    docker run \
      -it \
      -p 9933:9933 \
      -p 30333:30333 \
      -p 30334:30334 \
      -p 9615:9615 \
      -p 9516:9516 \
      -v host_path:/container_path \
      --name your_container_name \
      mantanetwork/manta:latest \
      --base-path /container_path/data \
      --keystore-path /container_path/keystore \
      --name your_collator_name \
      --rpc-cors all \
      --collator \
      --rpc-methods=unsafe \
      --unsafe-rpc-external

    #Production sample
    docker run \
      -it \
      -p 9933:9933 \
      -p 30333:30333 \
      -p 30334:30334 \
      -v host_path:/container_path \
      --restart=unless-stopped \
      --name your_container_name \
      mantanetwork/manta:latest \
      --base-path /container_path/data \
      --keystore-path /container_path/keystore \
      --name your_collator_name \
      --rpc-cors all \
      --collator \
      --rpc-methods=safe \
      -- \
      --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0'

    ```

    Examples of these name and paths:

    `host_path:/container_path` => `~/my-manta-db:/manta`

    `your_collator_name` => `Community-Collator-1`

    You may want to consider the following:

    -   if using http (not configured for ssl with certbot) for metrics, add ports `p 9615:9615 -p 9616:9616`
    -   add auto restart to ensure start on system boot or reboot `-restart=unless-stopped`
    -   remove unsafe-rpb-external when you are ready for production
    -   change rpc-methods to safe when ready for production `-rpc-methods=safe`
    -   additional polkadot configuration. at the end of your command stack, add -- to designate Polkadotconfiguration, then add telemetry-url `- --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0'`

    Ensure you can see a line of log like this:

    `👤 Role: AUTHORITY`

    **fedora**

    -
    -   check the status of the manta service:

        ```bash
        #!/bin/bash

        systemctl status manta.service

        ```

    -   enable manta service (the service will start automatically on system boot):

        ```bash
        #!/bin/bash

        sudo systemctl enable manta.service

        ```

    -   start manta service:

        ```bash
        #!/bin/bash

        sudo systemctl start manta.service

        ```

    -   stop manta service:

        ```bash
        #!/bin/bash

        sudo systemctl stop manta.service

        ```

    -   tail the manta service logs:

        ```bash
        #!/bin/bash

        journalctl -u manta.service -f

        ```

    -   debug manta service configuration (run manta as the manta user, to quickly check for runtime errors):

    for version `>= v4.6.0` (inclusive)
    ```jsx
    #!/bin/bash

    sudo -H -u manta bash -c '/usr/bin/manta --chain /usr/share/substrate/manta .json --base-path /var/lib/substrate --port 31333 --rpc-max-connections 100 --rpc-port 9144 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/crispy.manta.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc /dns/crunchy.manta.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt /dns/hotdog.manta.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv /dns/tasty.manta.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu /dns/tender.manta.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci -- --chain /usr/share/substrate/polkadot.json'
    ```

    for version `< v4.6.0` (exclusive)
    ```jsx
    #!/bin/bash

    sudo -H -u manta bash -c '/usr/bin/manta --chain /usr/share/substrate/manta .json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/crispy.manta.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc /dns/crunchy.manta.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt /dns/hotdog.manta.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv /dns/tasty.manta.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu /dns/tender.manta.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci -- --chain /usr/share/substrate/polkadot.json'
    ```

    ## 🤝 Sync the relay and para chains[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/sync#-sync-the-relay-and-para-chains)

    if you have no peers on the relaychain or your node is failing to verify new blocks, ensure your node’s clock is accurate, ie. by syncing with an ntp timeserver.

    you must sync both the manta parachain and polkadot relay-chain before the motion to include your collator is passed. completely synced substrate blockchain nodes will show an idle state in their logs for both `[Relaychain]` and `[Parachain]` and looks like so:

    ```
    2022-03-01 17:18:58 [Parachain] 💤 Idle (49 peers), best: #1037783 (0xa0c5…04a8), finalized #1037781 (0xabd5…1c05), ⬇ 16.7kiB/s ⬆ 14.5kiB/s
    2022-03-01 17:18:55 [Relaychain] 💤 Idle (49 peers), best: #11619808 (0x24a5…ad58), finalized #11619804 (0xa362…2df4), ⬇ 478.0kiB/s ⬆ 520.5kiB/s

    ```

    if your collator node logs do not contain both `[Relaychain] 💤 Idle` and `[Parachain] 💤 Idle` messages, your node is still syncing. do not bind a collator account to an aura session key for a node whose sync is incomplete. doing so will result in ejection of your collator.

    the best way to sync is to just run your node until the idle messages show up in your logs. doing so may take up to 2 weeks, however it will also give you a perfect, cryptographically validated and complete history of the blockchains you are syncing.

    if you cannot wait for the recommended sync mechanism to complete, you may obtain a fast-sync copy of the manta and polkadotblockchains taken from manta's backup nodes. to do so:

    -   stop your manta service
    -   delete your manta and polkadotdatabases from the basepath (taking care not to delete your keystores which are also under the basepath)
    -   fetch a copy of the blockchains, extracting if required
    -   ensure that the entire basepath and all of its contents are owned by the user your node runs under (change ownership recursively if required)
    -   start your manta service
    -   verify that the node is syncing correctly
    -   wait for both parachain and relay-chain idle messages to appear in the logs

    fast-sync commands (requires [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)):

    ```bash
    #!/bin/bash

    # install zstd
    sudo apt install zstd # this command might be different accordingly to your distro

    *# stop manta service*
    sudo systemctl stop manta.service

    *# sync manta blockchain database
    lib_path="/var/lib/substrate" # change this accordingly
    identity="$(sudo -H -u manta cat "${lib_path}"*/chains/manta/db/full/IDENTITY*)"
    sudo -H -u manta rm -r "${lib_path}"*/chains/manta/db/full
    *curl -L https://manta-polkadot.s3.amazonaws.com/backup/2023-12-05UTC/manta.tar.zst | sudo -H -u manta tar --zstd -C "${lib_path}"*/chains/manta *-xv*
    echo "${identity}" | sudo -H -u manta tee "*${lib_path}*"/chains/manta/db/full/IDENTITY

    *# sync polkadot blockchain database
    identity_relay="$(sudo -H -u manta cat "${lib_path}"/polkadot/chains/polkadot/db*/full/IDENTITY*)"
    identity_para="$(sudo -H -u manta cat "${lib_path}"/polkadot/chains/polkadot/db/full/parachains/db/*IDENTITY*)"
    sudo -H -u manta rm -r "${lib_path}"/polkadot/chains/polkadot/db*/full
    *curl -L https://manta-polkadot.s3.amazonaws.com/backup/2023-12-05UTC/manta-polkadot.tar.zst | sudo -H -u manta tar --zstd -C "${lib_path}"/polkadot/chains/polkadot* -xv
    echo "${identity_relay}" | sudo -H -u manta tee "*${lib_path}*"*/polkadot/chains/polkadot/db*/full/IDENTITY
    echo "${identity_para}" | sudo -H -u manta tee "*${lib_path}*"*/polkadot/chains/polkadot/db/full/parachains/db/*IDENTITY

    *# update database `current` manifests*
    sudo -H -u manta bash -c 'basename $(ls "*${lib_path}*"/chains/manta/db/full/MANIFEST-*) > "*${lib_path}*"/chains/manta/db/full/CURRENT'
    sudo -H -u manta bash -c 'basename $(ls "*${lib_path}*"/polkadot/chains/*polkadot*/db/full/MANIFEST-*) > "*${lib_path}*"/polkadot/chains/*polkadot*/db/full/CURRENT'
    sudo -H -u manta bash -c 'basename $(ls "*${lib_path}*"/polkadot/chains/polkadot/db/full/parachains/db/MANIFEST-*) > "*${lib_path}*"/polkadot/chains/*polkadot*/db/full/parachains/db/CURRENT'
    ```

    ## 🔑 Collator session keys[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/keys#-collator-session-keys)

    To collate on the manta chain, two accounts/keys are required at any given time:

    -   **Collator Account**: This is the account that holds the collator bond. it is also the account that the collator's share of transaction fees will be deposited into. the bond cannot be spent while the account is collating. the keys for this account should be protected carefully and should never exist on the filesystem of the collator node.
    -   **Nimbus Session Key**: This is a disposable account used to identify your individual node and blocks it has produced with other nodes on the network. Substrate stores this key in the parachain keystore on the filesystem of the collator node (`/var/lib/substrate/chains/manta/keystore`) when either of the author_insertKey or author_rotateKeys RPC methods are called. As this is a hot-wallet key that can be abused to impersonate your node if leaked (potentially leading to slashing of deposited funds in the future) it is good practice to infrequently rotate the session key - typically every half year, once per session at most.

    Both keys are associated with one another to create a bond-node pair for transaction fee reward payouts and (in the future) slashing.

    In addition, your node might have two additional keys in storage:

    -   **Aura Session Key**: Now-unused key to decide eligibility to author blocks *before* v3.3.0
    -   **VRF Session Key**: Placeholder for a future [VRF](https://en.wikipedia.org/wiki/Verifiable_random_function)based block proposer assignment mechanism that is inactive as of v3.2.1. The future mechanism will use the key you set here, so if you set it now, you won't have to touch the node later when it is enabled.

    DANGER

    Both of the following methods (insert, rotate) use an **unsafe** RPC call to set the node session key. In order to use them, you must stop the node if running and start it with a `--rpc-methods=unsafe` CLI parameter. This mode of operation is **unsafe** when exposed to the public internet, restart the node without this CLI parameter when done.

    -   insertKey
    -   rotateKeys

    This command demonstrates a session key insertion using a key created with

    -   Build/Install [subkey](https://docs.substrate.io/reference/command-line-tools/subkey/) for your platform
    -   Install the [jq utility](https://stedolan.github.io/jq/download/) for your platform
    -   Generate a Nimbus (nmbs) key and insert/check payloads with subkey/jq

        ```bash
        #!/bin/bash
        subkey generate \
          --scheme sr25519 \
          --network manta\
          --output-type json \
          --words 12 \
          > ./nmbs.json
        echo '{
          "jsonrpc":"2.0",
          "id":1,
          "method":"author_insertKey",
          "params": [
            "nmbs",
            "nmbs mnemonic phrase",
            "nmbs hex public key"
          ]
        }' | jq \
          --arg mnemonic "$(jq -r .secretPhrase ./nmbs.json)" \
          --arg hex "$(jq -r .publicKey ./nmbs.json)" \
          '. | .params[1] = $mnemonic | .params[2] = $hex' > ./insert-nmbs.json
        echo '{
          "jsonrpc":"2.0",
          "id":1,
          "method":"author_hasKey",
          "params": [
            "nmbs hex public key",
            "nmbs"
          ]
        }' | jq \
          --arg hex "$(jq -r .publicKey ./nmbs.json)" \
          '. | .params[0] = $hex' > ./check-nmbs.json

        ```

    -   Generate a VRF (rand) key and insert/check payloads with subkey/jq

        ```bash
        #!/bin/bash
        subkey generate \
          --scheme sr25519 \
          --network manta \
          --output-type json \
          --words 12 \
          > ./rand.json
        echo '{
          "jsonrpc":"2.0",
          "id":1,
          "method":"author_insertKey",
          "params": [
            "rand",
            "rand mnemonic phrase",
            "rand hex public key"
          ]
        }' | jq \
          --arg mnemonic "$(jq -r .secretPhrase ./rand.json)" \
          --arg hex "$(jq -r .publicKey ./rand.json)" \
          '. | .params[1] = $mnemonic | .params[2] = $hex' > ./insert-rand.json
        echo '{
          "jsonrpc":"2.0",
          "id":1,
          "method":"author_hasKey",
          "params": [
            "rand hex public key",
            "rand"
          ]
        }' | jq \
          --arg hex "$(jq -r .publicKey ./rand.json)" \
          '. | .params[0] = $hex' > ./check-rand.json

        ```

    -   Execute the `author_insertKey` RPC payloads

        ```bash
        #!/bin/bash
        for keyin nmbs rand;do
          curl \
            --header 'Content-Type: application/json;charset=utf-8' \
            --data @./insert-${key}.json \
            http://localhost:9133
        done

        ```

    -   **Validation**: Check that the session keys stored in the node match the generated ones (below command returns a `"result":true` field)

        ```bash
        #!/bin/bash
        for keyin nmbs rand;do
          has_key=$(curl \
            -s \
            --header 'Content-Type: application/json;charset=utf-8' \
            --data @./check-${key}.json \
            http://localhost:9133 )
          echo "${key}: ${has_key}"
        done

        ```

    -   **Validation**: Check that node logs show your node is running with role: `AUTHORITY` (check the timestamps)

        ```bash
        #!/bin/bash
        journalctl -u manta.service -g AUTHORITY

        ```

    -   Note down the `publicKey` fields from `nmbs.json` and `rand.json` and/or back-up these key files to a **secure**, offline location
    -   **Cleanup**: Remove secrets from the filesystem that were created in earlier steps

        ```bash
        #!/bin/bash
        rm ./nmbs.json ./rand.json ./insert-nmbs.json ./insert-rand.json

        ```

    NOTE

    Verify that your node does *NOT* show log lines like `2022-07-19 17:24:18 [Parachain] 🔏 No Nimbus keys available. We will not be able to author.`

    If it does even after restarting the node the procedure above failed, redo the above steps following the instructions closely.

    ### Bind collator account to the Session Keys[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/keys#bind-collator-account-to-the-session-keys)

    NOTE

    If your collator node logs do not contain both `[Relaychain] 💤 Idle` and `[Parachain] 💤 Idle` messages, your node is still syncing. **DO NOT BIND** a collator account to session key if sync is incomplete. Doing so may result in ejection of your collator.

    Account binding is done on-chain. The simplest way to do this is using polkadot.js.

    -   Load [manta/developer/extrinsics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.manta.systems%2F#/extrinsics) in a browser:

        <div style={{textAlign: 'center'}}>
         <img alt="1" src="/img/manta-atlantic/collator/1.png"/>
        </div>

    -   NOTE

        -   In the first box, labelled "using the selected account", select the collator account holding the [collator MANTA bond](https://docs.calamari.network/docs/calamari/Staking/Collation/Requirements#kma-bond).
        -   In the second (dropdown) box labelled "submit the following extrinsic", select `session`.
        -   In the third (dropdown) box, select `setKeys(keys, proof)`
        -   In the fourth box labelled `aura: SpConsensusAuraSr25519AppSr25519Public`, enter the hex public key of the Aura session key you generated earlier or a dummy value, e.g. `0x0000000000000000000000000000000000000000000000000000000000000000`

            NOTE

            `aura` is an inactive key from pre-v3.3.0 versions of the node. The value you provide here will not be used

        -   In the fifth box, labelled `nimbus: NimbusPrimitivesNimbusCryptoPublic`, enter the hex public key of the Nimbus session key you generated earlier.
        -   In the sixth box, labelled `vrf: SessionKeyPrimitivesVrfVrfCryptoPublic`, enter the hex public key of the VRF session key you generated earlier.
        -   In the seventh box labelled `proof: Bytes`, enter the hex public key of the Nimbus session key *again*.
        -   Click on the `Submit Transaction` button and wait for confirmation (a green tick), to appear in the upper right corner of the browser window.

    -   Verfy that the collator account and the Session keys are *bound* by loading [manta/developer/chain state](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.manta.systems%2F#/chainstate) in a browser:

    <div style={{textAlign: 'center'}}>
      <img alt="2" src="/img/manta-atlantic/collator/2.png" />
    </div>

    NOTE

    -   In the first (dropdown) box, labelled "selected state query", select `session`.
    -   In the second (dropdown) box, select `nextKeys(AccountId32): Option<MantaRuntimeOpaqueSessionKeys>`.
    -   In the third (dropdown) box, select the collator account holding the MANTA collator bond.
    -   Leave the `include option` checkbox selected.
    -   Leave the `blockhash to query at` box set to the default `0x` value.
    -   Click on the small plus (`+`) icon to the right of the second dropdown box.
    -   Verify that a new box labelled `session.nextKeys(AccountId32): Option<MantaRuntimeOpaqueSessionKeys>` appears and contains a json object whose `aura`,`nimbus` and `vrf` values are set to the hex public keys generated earlier.

    ## ⏳ Bond MANTA[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/bond#-bond-kma)

    Prospective Collators must post MANTA as a bond on-chain before they are considered collation candidates. This amount must be present as a transferable balance within the collator account at the time that the `joinCandidates` extrinsic is run.

    At launch (Manta v3.4.0), this bond is set to a minimum of **400 Thousand** MANTA. The current candidacy bond amount can be confirmed [on-chain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate/constants) > parachainStaking > minCandidateStk().

    NOTE

    The bonded MANTA are *locked* in the account, i.e. until you remove the lock by exiting the candidate set, they are:

    -   NOT TRANSFERRABLE, but
    -   Available for other on-chain actions like **voting in governance**

    Unlocking these tokens is possible through [unbonding](https://docs.calamari.network/docs/calamari/Staking/Collation/Unbond) and takes a minimum of 7 days

    ### 💓 Starting collation[](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/bond#-starting-collation)

    Run the `joinCandidates` [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.manta.systems%2F#/extrinsics) from the account you set [your session keys](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/keys) to in a browser.

    <div style={{textAlign: 'center'}}>
      <img alt="3" src="/img/manta-atlantic/collator/3.png"/>
    </div>

    NOTE

    **bond** is 400_000_000_000_000_000_000_000 MANTA ( 400 Thousand MANTA with 18 decimals )

    **candidateCount** is a hint for transaction weight ( i.e. gas fee ) that should be larger than the current number of registered collators ( or the transaction will fail ). The current number can be found by counting the entries on the [manta chain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.manta.systems#/chainstate/constants) > parachainStaking > candidatePool(): u128. It is safe to just set a high number, but reducing it as much as possible reduces the estimated gas fees that must be available in your account in addition to the bond amount for the transaction to succeed.

    Your collator will join the set of block producers and become eligible for rewards at the beginning of the next *round* ( i.e. after a maximum of 6 hours ) **if it is in the top 70 of registered node candidates by total stake** ( i.e. your collator bond + sum of all delegations on your node )

    # Maintenance

    ### Manta Binary Upgrades[](https://docs.calamari.network/docs/calamari/Staking/Collation/Maintenance#manta-binary-upgrades)

    Although [forkless upgrades](https://wiki.polkadot.network/docs/learn-runtime-upgrades#forkless-upgrades) largely allow for upgrades without needing to change the node software, every once in a while, chain upgrades will break the client binary and require manual updating.

    ⚠️ Please follow the [Manta node github releases](https://github.com/Manta-Network/Manta/releases) closely for upgrade instructions.

    ### Taking the Collator Offline[](https://docs.calamari.network/docs/calamari/Staking/Collation/Maintenance#taking-the-collator-offline)

    You can (and should) notify the network your collator will be offline **for more than 6 hours** by running `parachainStaking::goOffline()` from your collator account.

    <div style={{textAlign: 'center'}}>
       <img alt="4" src="/img/manta-atlantic/collator/4.png"/>
    </div>

    This will remove you from the set of candidates temporarily without removing your collators It takes effect at the start of the next round after execution (at most 6 hours).

    Neither you, nor your delegators will receive any rewards in the time you are offline (whether you run the above extrinsic or not), so ensure to keep downtimes to a minimum or you will risk losing delegators and thus your spot in the active collator set.

    Conversely, once your maintenance concludes, re-add your collator to the active set with `parachainStaking::goOnline()`

    <div style={{textAlign: 'center'}}>
      <img alt="5" src="/img/manta-atlantic/collator/5.png"/>
    </div>

    Again, this takes effect at the start of the next round after execution (at most 6 hours).

    # Reduce Bond

    ### Reduce Bond[](https://docs.calamari.network/docs/calamari/Staking/Collation/Reduce%20Bond#reduce-bond)

    -   Run the `parachainStaking` extrinsic `scheduleCandidateBondLess` function [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics) from the account you bonded your collator with and enter the desired amount to reduce from bond. Remember polkadot.js needs, the MANTA amount with 12 decmals.
    -   Wait for 7 days.
    -   Run the `parachainStaking` extrinsic `executeCandidateBondLess` function [extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics) from the account you bonded your collator with to withdraw the expected MANTA to the account.

    ## 💔 Leave the Collator Set and Recover the MANTA Bond[](https://docs.calamari.network/docs/calamari/Staking/Collation/Unbond#-leave-the-collator-set-and-recover-the-kma-bond)

    NOTE

    The screenshots below show example values for the `candidateCount` and `candidateDelegationCount` parameters. Ensure the number you provide to

    -   `candidateCount` is larger than the number of currently registered **collators** on the network
    -   `candidateDelegationCount` is larger than the number of **delegators** on the collator you want to unbond

    It is not necessary to be exact, this parameter is a gas fee hint that is used to reserve a gas fee on execution. Unused gas is refunded afterwards, so it is ok to use a large number here if you don't want to count and have enough MANTA

    In order to fully offboard your collator, execute `parachainStaking::scheduleLeaveCandidates`

    <div style={{textAlign: 'center'}}>
      <img alt="6" src="/img/manta-atlantic/collator/6.png" />
    </div>

    This will mark your collator as exiting, making it ineligible for future rewards.

    **After 7 days** you (or anyone else) can execute the removal extrinsic for your collator which will unlock your bonded MANTA

    <div style={{textAlign: 'center'}}>
      <img alt="7" src="/img/manta-atlantic/collator/7.png"/>
    </div>

    If you change your mind, you can always cancel the unbonding (unless you've already sent the `execute` extrinsic above)

    <div style={{textAlign: 'center'}}>
       <img alt="8" src="/img/manta-atlantic/collator/8.png" />
    </div>

    # CollatorFAQ

    ### Q: How to setup and run a Collator?[](https://docs.calamari.network/docs/calamari/Staking/Collation/CollatorFAQ#q-how-to-setup-and-run-a-collator)

    See the [collator setup guide](https://docs.calamari.network/docs/calamari/Staking/Collation/SetupAndRun/installation)

    ### Q: Where can I find the current collators?[](https://docs.calamari.network/docs/calamari/Staking/Collation/CollatorFAQ#q-where-can-i-find-the-current-collators)

    [https://sparta.manta.systems/](https://sparta.calamari.systems/)

    ### Q: Where can I get help?[](https://docs.calamari.network/docs/calamari/Staking/Collation/CollatorFAQ#q-where-can-i-get-help)

    A: Come join us on the Manta & MantaNetwork Discord Community in the #collator-candidates channel and you’ll find both community members who’ve had similar questions before and team members to help out.

    ### Q: What are the different networks?[](https://docs.calamari.network/docs/calamari/Staking/Collation/CollatorFAQ#q-what-are-the-different-networks)

    A: There are two networks, each will require dedicated hardware.

    - Manta Network - production network on Polkadot (Not yet live)
    - Calamari Network - canary network on Kusama

    ### Q: What are Nimbus keys?[](https://docs.calamari.network/docs/calamari/Staking/Collation/CollatorFAQ#q-what-are-nimbus-keys)

    A: A Nimbus key is a type of session key. It is your node’s identification to the block production/verification method on the network, which is called Nimbus. It does NOT store or access funds. The node must always have access to this key in order to collate, so it is a hot key stored on the filesystem. You should keep a backup of this key in a safe - offline - location to be able to transfer your node’s identity to another device should you need to. Find more about nimbus session keys in the docs.

    ### Q: What should I look for in the logs?[](https://docs.calamari.network/docs/calamari/Staking/Collation/CollatorFAQ#q-what-should-i-look-for-in-the-logs)

    A: If everything is running smoothly and your node is ready to become a collator, your node logs should contain repeating mentions of `💤 Idle` with a number of peers larger than 0 for both [Relaychain] and [Parachain], e.g.

    ```
    2022-03-01 17:18:58 [Parachain] 💤 Idle (49 peers), best: #1037783 (0xa0c5…04a8), finalized #1037781 (0xabd5…1c05), ⬇ 16.7kiB/s ⬆ 14.5kiB/s
    2022-03-01 17:18:55 [Relaychain] 💤 Idle (49 peers), best: #11619808 (0x24a5…ad58), finalized #11619804 (0xa362…2df4), ⬇ 478.0kiB/s ⬆ 520.5kiB/s

    ```

    Compare the block number reported in the [Parachain] line to other nodes on the network. They should be equal or very close. See the docs for more on this

    ### Q: How much is the bond to become a collator?[](https://docs.calamari.network/docs/calamari/Staking/Collation/CollatorFAQ#q-how-much-is-the-bond-to-become-a-collator)

    The bond to join the collators pool: 400_000 MANTA

    # Early Collator Program

    In recognition of the early support collators lent to the network through early 2024 when there was little incentive to doing so, we propose the following time-limited Early Collator Program to reward their support and allow them to accrue part of the MANTA amount necessary to continue running collators on the network through staking rewards:

    -   This program is open to anyone (~30 people) with an active collator registered with the previous *Community Collator Program* before launch of staking
    -   An Early Collator will be allowed to join the staking set **_once_** at a 400_000 minimum bond through the rest of 2024.
    -   If the collator leaves the set for any reason, the normal 400_000 MANTA bond will be required rejoin.
    -   There will be no intervention in free-market mechanics beside the above lower entry-bond on behalf of early collators.
    -   Early 2024 will see a runtime upgrade or governance motion that disables this mechanism AND will forcibly off-board any collator in the set below 400_000 MANTA self-bond.
