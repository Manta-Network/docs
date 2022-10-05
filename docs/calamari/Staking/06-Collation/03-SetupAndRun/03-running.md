---
sidebar_position: 3
sidebar_label: ⚙️ Running
title: 🚄 Setup and run a Collator
hide_title: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Installation](installation) > [Configuration](configuration) > Running > [Sync](sync) > [Session keys](keys) > [Bond](bond)

## ⚙️ Running

<Tabs groupId="os">
<TabItem value="docker" label="docker">

- start your docker node

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
    mantanetwork/calamari:latest \
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
    mantanetwork/calamari:latest \
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

  `host_path:/container_path` => `~/my-calamari-db:/calamari`

  `your_collator_name` => `Community-Collator-1`

  You may want to consider the following:
  - if using http (not configured for ssl with certbot) for metrics, add ports
  `-p 9615:9615 -p 9616:9616`
  - add auto restart to ensure start on system boot or reboot
  `--restart=unless-stopped`
  - remove unsafe-rpb-external when you are ready for production
  - change rpc-methods to safe when ready for production
  `--rpc-methods=safe`
  - additional Kusama configuration. at the end of your command stack, add -- to designate Kusama configuration, then add telemetry-url
  `-- --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0'`

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
