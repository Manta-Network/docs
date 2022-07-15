---
title: 安装
---

<Tabs pId="os">

<TabItem value="docker" label="docker">
- 拉取最新 Calamari 容器镜像

```bash
#!/bin/bash

docker pull mantanetwork/calamari:latest
```

</TabItem>
<TabItem value="fedora" label="fedora">

manta .rpm 包含：

- manta 二进制文件（用于运行 calamari）
- manta 和 calamari 系统文件
- manta、calamari、polkadot 和 kusama 基础配置文件
- 用于安装后运行创建 systemd 服务和 manta 帐户的脚本文件

开始安装(另见: [rpm.manta.systems](https://rpm.manta.systems/)):

- 添加 manta .rpm 存储库

    ```bash
    #!/bin/bash

    sudo dnf install dnf-plugins-core
    sudo dnf config-manager --add-repo https://rpm.manta.systems/manta.repo
    sudo dnf config-manager --set-enabled manta
    sudo dnf update
    ```

- 安装 Manta

  ```bash
  #!/bin/bash

  sudo dnf install manta
  ```

</TabItem>
<TabItem value="ubuntu" label="ubuntu">

manta .rpm 包含：
- manta 二进制文件（用于运行 calamari）
- manta 和 calamari 系统文件
- manta、calamari、polkadot 和 kusama 基础配置文件
- 用于安装后运行创建 systemd 服务和 manta 帐户的脚本文件

开始安装 (另见: [rpm.manta.systems](https://rpm.manta.systems/)):

- 添加 manta .deb 存储库

    ```bash
    #!/bin/bash

    sudo curl -o /usr/share/keyrings/manta.gpg https://deb.manta.systems/manta.gpg
    sudo curl -o /etc/apt/sources.list.d/manta.list https://deb.manta.systems/manta.list
    sudo apt update
    ```

- 安装 Manta

    ```bash
    #!/bin/bash

    sudo apt install manta
    ```

</TabItem>
<TabItem value="linux" label="other linux">

- 下载二进制、区块链配置和系统单元文件

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

- 创建 Manta 系统帐户

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
