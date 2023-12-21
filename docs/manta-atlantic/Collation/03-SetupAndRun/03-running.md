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

  `host_path:/container_path` => `~/my-manta-db:/manta`

  `your_collator_name` => `Community-Collator-1`

  You may want to consider the following:
  - if using http (not configured for ssl with certbot) for metrics, add ports
  `-p 9615:9615 -p 9616:9616`
  - add auto restart to ensure start on system boot or reboot
  `--restart=unless-stopped`
  - remove unsafe-rpb-external when you are ready for production
  - change rpc-methods to safe when ready for production
  `--rpc-methods=safe`
  - additional Pokadot configuration. at the end of your command stack, add -- to designate Pokadot configuration, then add telemetry-url
  `-- --telemetry-url 'wss://api.telemetry.manta.systems/submit/ 0'`

  Ensure you can see a line of log like this:

  ```bash
  👤 Role: AUTHORITY
  ```

</TabItem>
<TabItem value="fedora" label="fedora">

- check the status of the manta service:

  ```bash
  #!/bin/bash

  systemctl status manta.service
  ```

- enable manta service (the service will start automatically on system boot):

  ```bash
  #!/bin/bash

  sudo systemctl enable manta.service
  ```

- start manta service:

  ```bash
  #!/bin/bash

  sudo systemctl start manta.service
  ```

- stop manta service:

  ```bash
  #!/bin/bash

  sudo systemctl stop manta.service
  ```

- tail the manta service logs:

  ```bash
  #!/bin/bash

  journalctl -u manta.service -f
  ```

- debug manta service configuration (run manta as the manta user, to quickly check for runtime errors):

  ```bash
  #!/bin/bash

  sudo -H -u manta bash -c '/usr/bin/manta --chain /usr/share/substrate/manta.json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/a1.manta.systems/tcp/30333/p2p/12D3KooWCpnkG834s9ETesFTWtGqRDjs6Te1UCXHib3iD8GEmXLU /dns/a4.manta.systems/tcp/30333/p2p/12D3KooWN9Zud842idiiUypJF9nzQfNrSsuWQRdtRA8D6sqsPXMb /dns/a5.manta.systems/tcp/30333/p2p/12D3KooWM6Txo8orkxGsSTPByzzWhtTSfdFi2u9KJtd9eWCkry3k /dns/a7.manta.systems/tcp/30333/p2p/12D3KooWFKMcE12XRLZfktX3crfkZyyBetpHsffDjPopYVhQLXwP /dns/c1.manta.systems/tcp/30333/p2p/12D3KooWSNwD7tJkqKGdMfCVTJbbzrGFTGbXoeMFZCTwEytpFCM4 /dns/c2.manta.systems/tcp/30333/p2p/12D3KooWSyPTkVytQwurRBt73wPQDTgypw88bdhsE4Rb6RnQvCJ9 /dns/c3.manta.systems/tcp/30333/p2p/12D3KooWJwHqCEjTF46eAUDspKKwxa15TMfs7x8DNr3Gs71Qr64j /dns/c4.manta.systems/tcp/30333/p2p/12D3KooWAgZYhwfUo7brgZK2TvArK6XNUtZnzk1cSNfyD9kX1rDE /dns/c5.manta.systems/tcp/30333/p2p/12D3KooWNHVexSGRVeLb7rt7tYS5Y3k5Up9amQn1GyTDCi7L9LLf -- --chain /usr/share/substrate/polkadot.json'
  ```

</TabItem>
<TabItem value="ubuntu" label="ubuntu">

- check the status of the manta service:

  ```bash
  #!/bin/bash

  systemctl status manta.service
  ```

- enable manta service (the service will start automatically on system boot):

  ```bash
  #!/bin/bash

  sudo systemctl enable manta.service
  ```

- start manta service:

  ```bash
  #!/bin/bash

  sudo systemctl start manta.service
  ```

- stop manta service:

  ```bash
  #!/bin/bash

  sudo systemctl stop manta.service
  ```

- tail the manta service logs:

  ```bash
  #!/bin/bash

  journalctl -u manta.service -f
  ```

- debug manta service configuration (run manta as the manta user, to quickly check for runtime errors):

  ```bash
  #!/bin/bash

  sudo -H -u manta bash -c '/usr/bin/manta --chain /usr/share/substrate/manta.json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/a1.manta.systems/tcp/30333/p2p/12D3KooWCpnkG834s9ETesFTWtGqRDjs6Te1UCXHib3iD8GEmXLU /dns/a4.manta.systems/tcp/30333/p2p/12D3KooWN9Zud842idiiUypJF9nzQfNrSsuWQRdtRA8D6sqsPXMb /dns/a5.manta.systems/tcp/30333/p2p/12D3KooWM6Txo8orkxGsSTPByzzWhtTSfdFi2u9KJtd9eWCkry3k /dns/a7.manta.systems/tcp/30333/p2p/12D3KooWFKMcE12XRLZfktX3crfkZyyBetpHsffDjPopYVhQLXwP /dns/c1.manta.systems/tcp/30333/p2p/12D3KooWSNwD7tJkqKGdMfCVTJbbzrGFTGbXoeMFZCTwEytpFCM4 /dns/c2.manta.systems/tcp/30333/p2p/12D3KooWSyPTkVytQwurRBt73wPQDTgypw88bdhsE4Rb6RnQvCJ9 /dns/c3.manta.systems/tcp/30333/p2p/12D3KooWJwHqCEjTF46eAUDspKKwxa15TMfs7x8DNr3Gs71Qr64j /dns/c4.manta.systems/tcp/30333/p2p/12D3KooWAgZYhwfUo7brgZK2TvArK6XNUtZnzk1cSNfyD9kX1rDE /dns/c5.manta.systems/tcp/30333/p2p/12D3KooWNHVexSGRVeLb7rt7tYS5Y3k5Up9amQn1GyTDCi7L9LLf -- --chain /usr/share/substrate/polkadot.json'
  ```

</TabItem>
<TabItem value="linux" label="other linux">

- check the status of the manta service:

  ```bash
  #!/bin/bash

  systemctl status manta.service
  ```

- enable manta service (the service will start automatically on system boot):

  ```bash
  #!/bin/bash

  sudo systemctl enable manta.service
  ```

- start manta service:

  ```bash
  #!/bin/bash

  sudo systemctl start manta.service
  ```

- stop manta service:

  ```bash
  #!/bin/bash

  sudo systemctl stop manta.service
  ```

- tail the manta service logs:

  ```bash
  #!/bin/bash

  journalctl -u manta.service -f
  ```

- debug manta service configuration (run manta as the manta user, to quickly check for runtime errors):

  ```bash
  #!/bin/bash

  sudo -H -u manta bash -c '/usr/bin/manta --chain /usr/share/substrate/manta.json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/a1.manta.systems/tcp/30333/p2p/12D3KooWCpnkG834s9ETesFTWtGqRDjs6Te1UCXHib3iD8GEmXLU /dns/a4.manta.systems/tcp/30333/p2p/12D3KooWN9Zud842idiiUypJF9nzQfNrSsuWQRdtRA8D6sqsPXMb /dns/a5.manta.systems/tcp/30333/p2p/12D3KooWM6Txo8orkxGsSTPByzzWhtTSfdFi2u9KJtd9eWCkry3k /dns/a7.manta.systems/tcp/30333/p2p/12D3KooWFKMcE12XRLZfktX3crfkZyyBetpHsffDjPopYVhQLXwP /dns/c1.manta.systems/tcp/30333/p2p/12D3KooWSNwD7tJkqKGdMfCVTJbbzrGFTGbXoeMFZCTwEytpFCM4 /dns/c2.manta.systems/tcp/30333/p2p/12D3KooWSyPTkVytQwurRBt73wPQDTgypw88bdhsE4Rb6RnQvCJ9 /dns/c3.manta.systems/tcp/30333/p2p/12D3KooWJwHqCEjTF46eAUDspKKwxa15TMfs7x8DNr3Gs71Qr64j /dns/c4.manta.systems/tcp/30333/p2p/12D3KooWAgZYhwfUo7brgZK2TvArK6XNUtZnzk1cSNfyD9kX1rDE /dns/c5.manta.systems/tcp/30333/p2p/12D3KooWNHVexSGRVeLb7rt7tYS5Y3k5Up9amQn1GyTDCi7L9LLf -- --chain /usr/share/substrate/polkadot.json'
  ```

</TabItem>
</Tabs>
