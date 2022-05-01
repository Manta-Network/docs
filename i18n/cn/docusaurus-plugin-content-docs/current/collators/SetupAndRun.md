import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

# 🚄 安装并运行 Calamari 收集人节点

## 安装

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

    manta_version=3.1.4

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

## 配置

需要一些额外有助于节点的相关配置命令。

<Tabs groupId="os">
<TabItem value="fedora" label="fedora">

编辑 calamari 服务单元文件中 `ExecStart` 下的参数项。

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

编辑 calamari 服务单元文件中 `ExecStart` 下的参数项。

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

编辑 calamari 服务单元文件中 `ExecStart` 下的参数项。

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

### 收集人节点配置特殊参数

Calamari 节点配置文件支持两组由双破折号 (`—`) 分隔的参数。 第一组为平行链节点参数。 第二组为中继链节点参数。

- ***平行链*** 参数
    - `--collator`: 在 collator 模式下运行。与`--validator`中继链相同。设置此项也会令 pruning 模式为`archive`（如`--pruning archive`）
    - `--name`: 平行链节点名称，显示在 [calamari telemetry](https://telemetry.manta.systems/#list/0x4ac80c99289841dd946ef92765bf659a307d39189b3ce374a92b5f0415ee17a1)
    - `--port`: 平行链点对点端口。 calamari 默认为 31333，可通过此端口访问其他 calamari 节点。
    - `--prometheus-port`: 平行链指标端口。 calamari 默认为 9615。manta 指标监控服务器`18.156.192.254`（按子网配置为`18.156.192.254/32`）需可访问此端口。
    - `--prometheus-external`: 如果指标端口不通过 ssl 反向代理，您可能需要设置此参数来告诉指标服务器侦听 *all ips* 套接字 (`0.0.0.0:9615`) 而不是 *localhost only* (`127.0 .0.1:9615`)

- ***中继链*** 参数
    - `--name`: 中继节点名称，显示在 [kusama telemetry](https://telemetry.manta.systems/#list/0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe)
    - `--port`: 中继链点对点端口。 calamari-embedded-kusama 默认为 31334。可通过此端口访问其他 kusama 节点。
    - `--prometheus-port`: 中继链指标端口。 calamari-embedded-kusama 默认为 9616。manta 指标监控服务器`18.156.192.254`（按子网配置为`18.156.192.254/32`）需可访问此端口
    - `--prometheus-external`: 如果指标端口不通过 ssl 反向代理，您可能需要设置此参数来告诉指标服务器侦听 *all ips* 套接字 (`0.0.0.0:9616`) 而不是 *localhost only* (`127.0 .0.1:9616`)

### 防火墙配置

为保证 Collator 节点正常运行，需要从外部访问以下几个端口。 为便于配置，配置文件使用以下默认端口，但您可以根据实际情况需要随意使用替代端口。

- **31333**: 默认calamari p2p端口
- **31334**: 默认（中继）kusama p2p端口
- **9615**: 默认 calamari prometheus端口
- **9616**: 默认（中继）kusama prometheus端口

使用 [polkadot wiki](https://wiki.polkadot.network/docs/maintain-guides-how-to-monitor-your-node) 上描述的技术监控您的 Collator 节点。端口 9615 和 9616 上公开的指标有助于实现这一点，这些端口应可访问 prometheus/alertmanager 服务器（alertmanager 配置提醒服务）和 manta  18.156.192.254 监控服务器[pulse server](https://pulse.pelagos.systems)。

建议为指标配置SSL代理（以校验数据的真实性）。一个简单的方法是安装 certbot 和 nginx 并配置一个反向代理监听端口 443 并将 ssl 请求代理到本地指标端口。

示例：

- install certbot and a dns validation plugin
- 主域名 **example.com**
- dns 由 cloudflare 或 route53 管理
- 您的节点主机名是**bob**
- 您的 calamari 节点使用默认端口
- 网关（路由器）将到达 wan 接口的 443/ssl 流量转发到您的Collator节点
- 已经安装了 certbot

:::note
cloudflare 和 route53 示例如下。谷歌`python3-certbot-dns-${your_dns_provider}`其他例子
:::

- 安装 certbot 和 dns 验证插件

    ```bash
    #!/bin/bash

    sudo certbot certonly \
        --dns-cloudflare \
        -dns-cloudflare-credentials .cloudflare-credentials \
        -d bob.example.com \
        -d calamari.metrics.bob.example.com \
        -d kusama.metrics.bob.example.com
    ```

- 配置 nginx`/etc/nginx/sites-enabled/example.com.conf`将代理 dns 子域反向到本地指标端口。

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
        ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
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

## 运行



<Tabs groupId="os">
<TabItem value="docker" label="docker">

- 启动 docker 节点

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

    相关名称和路径示例：

    `host_path:/container_path` => `~/my-calamari-db:/calamari`

    `your_collator_name` => `Community-Collator-1`

    确保您可以看到这样的一行日志：

     ```bash
    👤 Role: AUTHORITY
     ```

</TabItem>
<TabItem value="fedora" label="fedora">

- 检查 calamari 服务状态：

    ```bash
    #!/bin/bash

    systemctl status calamari.service
    ```

- 启用 calamari 服务（该服务将在系统启动时自启动）：

    ```bash
    #!/bin/bash

    sudo systemctl enable calamari.service
    ```

- 启动 calamari

    ```bash
    #!/bin/bash

    sudo systemctl start calamari.service
    ```

- 停止 calamari

    ```bash
    #!/bin/bash

    sudo systemctl stop calamari.service
    ```

- 查看 calamari 日志：

    ```bash
    #!/bin/bash

    journalctl -u calamari.service -f
    ```

- 调试 calamari 服务配置（以 manta 用户身份运行 calamari，以快速检查运行时错误）：

    ```bash
    #!/bin/bash
    
    sudo -H -u manta bash -c '/usr/bin/calamari --chain /usr/share/substrate/calamari.json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/crispy.calamari.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc /dns/crunchy.calamari.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt /dns/hotdog.calamari.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv /dns/tasty.calamari.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu /dns/tender.calamari.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci -- --chain /usr/share/substrate/kusama.json'
    ```

</TabItem>
<TabItem value="ubuntu" label="ubuntu">

- 检查 calamari 服务状态：

    ```bash

    #!/bin/bash

    systemctl status calamari.service

    ```

- 启用 calamari 服务（该服务将在系统启动时自启动）：

    ```bash
    #!/bin/bash

    sudo systemctl enable calamari.service
    ```

- 启动 calamari

    ```bash
    #!/bin/bash

    sudo systemctl start calamari.service
    ```

- 停止calamari

    ```bash
    #!/bin/bash

    sudo systemctl stop calamari.service
    ```

- 查看 calamari 日志：

    ```bash
    #!/bin/bash

    journalctl -u calamari.service -f
    ```

- 调试 calamari 服务配置（以 manta 用户身份运行 calamari，以快速检查运行时错误）：

    ```bash
    #!/bin/bash
    
    sudo -H -u manta bash -c '/usr/bin/calamari --chain /usr/share/substrate/calamari.json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/crispy.calamari.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc /dns/crunchy.calamari.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt /dns/hotdog.calamari.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv /dns/tasty.calamari.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu /dns/tender.calamari.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci -- --chain /usr/share/substrate/kusama.json'
    ```

</TabItem>
<TabItem value="linux" label="other linux">

- 检查 calamari 服务状态：

    ```bash
    #!/bin/bash

    systemctl status calamari.service
    ```

- 启用 calamari 服务（该服务将在系统启动时自启动）：

    ```bash
    #!/bin/bash

    sudo systemctl enable calamari.service
    ```

- 启动 calamari

    ```bash
    #!/bin/bash

    sudo systemctl start calamari.service
    ```

- 停止calamari

    ```bash
    #!/bin/bash

    sudo systemctl stop calamari.service
    ```

- 查看 calamari 日志：

    ```bash
    #!/bin/bash

    journalctl -u calamari.service -f
    ```

- 调试 calamari 服务配置（以 manta 用户身份运行 calamari，以快速检查运行时错误）：

    ```bash
    #!/bin/bash
    
    sudo -H -u manta bash -c '/usr/local/bin/calamari --chain /usr/share/substrate/calamari.json --base-path /var/lib/substrate --port 31333 --ws-port 9144 --ws-max-connections 100 --rpc-port 9133 --rpc-cors all --rpc-methods safe --state-cache-size 0 --bootnodes /dns/crispy.calamari.systems/tcp/30333/p2p/12D3KooWNE4LBfkYB2B7D4r9vL54YMMGsfAsXdkhWfBw8VHJSEQc /dns/crunchy.calamari.systems/tcp/30333/p2p/12D3KooWL3ELxcoMGA6han3wPQoym5DKbYHqkWkCuqyjaCXpyJTt /dns/hotdog.calamari.systems/tcp/30333/p2p/12D3KooWBdto53HnArmLdtf2RXzNWti7hD5mML7DWGZPD8q4cywv /dns/tasty.calamari.systems/tcp/30333/p2p/12D3KooWGs2hfnRQ3Y2eAoUyWKUL3g7Jmcsf8FpyhVYeNpXeBMSu /dns/tender.calamari.systems/tcp/30333/p2p/12D3KooWNXZeUSEKRPsp1yiDH99qSVawQSWHqG4umPjgHsn1joci -- --chain /usr/share/substrate/kusama.json'
    ```

</TabItem>
</Tabs>

## 收集人 session 密钥

收集人节点需要两个帐户/密钥。

- ***collator 账户***: 持有 400,000 KMA 的收集人节点绑定账户。节点所收取的交易费将被存入该账户。 节点运行时绑定的KMA将被锁定。 此帐户密钥要仔细保管，不要存放在于收集人节点服务器中。
- ***aura session 密钥***: 这是Collator节点用于创建区块的一次性帐户。 它绑定到收集人帐户。 最好的做法是定期更换会话密钥，每个密钥最多使用一次。 当调用 author_insertKey 或 author_rotateKeys rpc 方法时，substrate 将此帐户的密钥存储在收集人节点的文件系统（`/var/lib/substrate/chains/calamari/keystore`）上的平行链密钥库中。

:::note
插入和替换方法均使用不安全的 RPC调用来设置节点会话密钥。如果服务正在运行，则必须停止服务，然后使用`--rpc-methods=unsafe`参数设置。调用成功后，不要忘记将设置更改回`safe`，因为允许不安全的 rpc 调用会导致暴露的 rpc 端口的节点很容易地让任何人更改其会话密钥，从而导致交易费用被支付到预期之外的地方。
:::
<Tabs groupId="keys">

<TabItem value="insert" label="insert">

此命令演示使用子密钥插入会话密钥 [subkey](https://docs.substrate.io/v3/tools/subkey)。

- 使用 subkey 生成 aura 密钥

    ```bash
    #!/bin/bash

    subkey generate \
        --scheme sr25519 \
        --network calamari \
        --output-type json \
        --words 12 \
        > ./aura.json
    ```

- 创建 author_insertKey rpc payload

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

- 执行 author_insertKey rpc payload

    ```bash
    #!/bin/bash
    curl \
        --header 'Content-Type: application/json;charset=utf-8' \
        --data @./payload.json \
        http://localhost:9133

    ```

- *验证* (可选)：检查节点使用的aura 助记符是否与生成的匹配

    ```bash
    #!/bin/bash

    sudo -H -u manta cat /var/lib/substrate/chains/calamari/keystore/$(sudo -H -u manta ls /var/lib/substrate/chains/calamari/keystore/)
    ```

- *验证* (可选)：检查日志是否显示节点正在使用认证的角色运行：（`AUTHORITY`检查时间戳）

    ```bash
    #!/bin/bash

    journalctl -u calamari.service -g AUTHORITY
    ```

- 清除: 从系统中aura.json和payload.json文件

    ```bash
    #!/bin/bash
    
    rm ./aura.json ./payload.json
    ```

</TabItem>
<TabItem value="rotate" label="rotate">

此命令演示会话密钥更换。如果不存在则新建一个。

    ```bash
    #!/bin/bash
    
    curl -H 'Content-Type: application/json' --data '{ "jsonrpc":"2.0", "method":"author_rotateKeys", "id":1 }' http://localhost:9933
    ```

rpc 调用的输出应如下所示（`result`属性包含 aura 会话帐户公钥的十六进制表示*）*：

    ```json
    
    {"jsonrpc":"2.0","result":"0x06736e65ab33fd1e4e3e434a1fa2c5425f0e263ddb50e6aeb15951288c562f61","id":1}
    
    ```

</TabItem>
</Tabs>

### 将收集人帐户绑定到 aura session 密钥

:::note
如果收集人节点日志不包含`[Relaychain] 💤 Idle`和`[Parachain] 💤 Idle`消息，您的节点需要继续同步。不要绑定一个未完全同步的收集人帐户到 aura 会话密钥。这样做会导致收集人节点被系统拒绝接入。
:::

使用 polkadot.js进行账户绑定。

- 在浏览器中 打开[calamari/developer/extrinsics ：](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/extrinsics)
    ![session.setkeys()](/img/collator-program/session.setkeys.png)
    -  在标有“using the selected account”的第一个框中，选择持有 400,000 KMA collator绑定帐户。
    - 在标有“submit the following extrinsic”的第二个（下拉）框中，选择`session`.
    - 在第三个（下拉）框中，选择`setKeys(keys, proof)`
    - 在标有`aura: SpConsensusAuraSr25519AppSr25519Public` and `proof: Bytes`第四和第五框中输入 aura 会话密钥的十六进制公钥。
    - 单击`Submit Transaction`按钮并等待确认（绿色勾号）
- 通过在浏览器中加载 [calamari/developer/chainstate](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate) 来验证整理者帐户和 aura 会话密钥是否已*绑定*：
    ![session.nextkeys()](/img/collator-program/session.nextkeys.png)
    - 在第一个（下拉）框中，标记为“selected state query”，选择`session`.
    - 在第二个（下拉）框中，选择`nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>`。
    - 在第三个（下拉）框中，选择持有 400,000 KMA Collator绑定帐户。
    - 保持`include option`选中复选框选中。
    - `blockhash to query at`框设置为默认`0x`值
    - 单击第二个下拉框右侧的(+) 图标.
    - 验证是否出现了一个标记为`session.nextKeys(AccountId32): Option<CalamariRuntimeOpaqueSessionKeys>` 的json 对象，该对象的`aura`值为之前设置的 aura 会话十六进制公钥。

## 同步

如果中继链上没发现peers，或者您的节点无法验证新块，请确保您节点的时钟准确与 ntp 时间服务器同步。

提交申请前，您必须同步 calamari 平行链和 kusama 中继链。完全同步的底层区块链节点将在其日志中显示空闲状态，`[Relaychain]`并且`[Parachain]`看起来像这样：

```shell=
2022-03-01 17:18:58 [Parachain] 💤 Idle (49 peers), best: #1037783 (0xa0c5…04a8), finalized #1037781 (0xabd5…1c05), ⬇ 16.7kiB/s ⬆ 14.5kiB/s
2022-03-01 17:18:55 [Relaychain] 💤 Idle (49 peers), best: #11619808 (0x24a5…ad58), finalized #11619804 (0xa362…2df4), ⬇ 478.0kiB/s ⬆ 520.5kiB/s
```

如果收集人节点日志不包含`[Relaychain] 💤 Idle`和`[Parachain] 💤 Idle`消息，您的节点需要继续同步。不要绑定一个未完全同步的Collator帐户到 aura 会话密钥。这样做会导致收集人节点被系统拒绝接入。

最佳的同步方式是持续运行您的节点，直到空闲消息出现在您的日志中。这样做可能需要长达 2 周的时间，但它也会为您提供您正在同步的区块链的完美、经过加密验证和完整的历史记录。

如果您不想等待漫长的同步完成，可以从 manta 的备份节点获取 calamari 和 kusama 区块链的快速同步副本：

- 停止 Calamari 服务
- 从 basepath 中删除 calamari 和 kusama 数据库（注意不要删除在basepath下的keystores ）
- 获取区块链的副本
- 确保整个basepath 及其所有权限都归运行您的节点的用户所有（如需则更改权限）
- 启动 Calamari 服务
- 验证节点是否正确同步
- 等待平行链和中继链空闲消息出现在日志中

快速同步命令(requires [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)):
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

## 等待

确保已完成[收集人申请](https://docs.google.com/forms/d/e/1FAIpQLScizDDMq7jWeOPVVEMr3EY_Z6N6ugdkL8aKgAbZ9lAJX6DEOQ/viewform)填写。如果获得批准，Calamari 理事会将提交一项提议，将您提升为候选人

:::note
候选人并不意味着您是收集人节点。例如，如果有 3 个候选名额，而其他候选人占据所有名额，而您在第 4 名，则必须等到某个节点注销或理事会增加收集人节点名额。
:::
如果顺利成为收集人节点，在候选议案通过后`12`到`24`几小时，您将在浏览器中看到收集人节点开始生成块 [explorer](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/explorer).。