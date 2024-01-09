---
sidebar_position: 2
sidebar_label: 🦾 Full Node
title: 🚄 Setup and run a Full Node
hide_title: false
--

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 🥡 Full Node

<Tabs groupId="os">
<TabItem value="docker" label="docker">

-   pull the latest manta container

```bash
#!/bin/bash

# Depending on your setup, here are some steps to get started

# Upgrade to latest version
sudo apt update && sudo apt upgrade -y

# Install docker
sudo apt install docker.io

# Add current user to docker
sudo usermod -aG docker $USER

# Pull the manta image
docker pull mantanetwork/manta:latest
```

</TabItem>
<TabItem value="fedora" label="fedora">

the manta .rpm package contains:

-   the manta binary (which is also used to run manta)
-   manta and manta systemd services
-   manta, manta, polkadot and kusama chain specifications
-   a script which runs after installation and creates the manta system account which the systemd service runs under

get started (see also: [rpm.manta.systems](https://rpm.manta.systems/)):

-   add the manta .rpm repository

    ```bash
    #!/bin/bash

    sudo dnf install dnf-plugins-core
    sudo dnf config-manager --add-repo https://rpm.manta.systems/manta.repo
    sudo dnf config-manager --set-enabled manta
    sudo dnf update
    ```

-   install manta

    ```bash
    #!/bin/bash

    sudo dnf install manta
    ```

</TabItem>
<TabItem value="ubuntu" label="ubuntu">

the manta .deb package contains:

-   the manta binary (which is also used to run manta)
-   manta and manta systemd services
-   manta, manta, polkadot and kusama chain specifications
-   a script which runs after installation and creates the manta system account which the systemd service runs under

get started (see also: [deb.manta.systems](https://deb.manta.systems/)):

-   add the manta .deb repository

    ```bash
    #!/bin/bash

    sudo curl -o /usr/share/keyrings/manta.gpg https://deb.manta.systems/manta.gpg
    sudo curl -o /etc/apt/sources.list.d/manta.list https://deb.manta.systems/manta.list
    sudo apt update
    ```

-   install manta

    ```bash
    #!/bin/bash

    sudo apt install manta
    ```

</TabItem>
<TabItem value="linux" label="other linux">

-   download binary, chain specifications and systemd unit file

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
    sudo ln -srf /usr/local/bin/manta /usr/local/bin/manta

    # chainspecs
    sudo mkdir -p /usr/share/substrate
    sudo curl -Lo /usr/share/substrate/manta.json https://raw.githubusercontent.com/Manta-Network/Manta/v3.0.9/genesis/manta-genesis.json
    sudo curl -Lo /usr/share/substrate/polkadot.json https://raw.githubusercontent.com/paritytech/polkadot/master/node/service/chain-specs/polkadot.json

    # systemd unit file
    sudo curl -Lo /etc/systemd/system/manta.service https://raw.githubusercontent.com/Manta-Network/Manta/deb-rpm/scripts/package/manta.service
    ```

-   create the manta system account which the systemd service runs under

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
