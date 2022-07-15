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

### 节点配置特殊参数
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

### 开放节点运行指标监控
使用 [polkadot wiki](https://wiki.polkadot.network/docs/maintain-guides-how-to-monitor-your-node) 上描述的技术监控您的 Collator 节点。端口 `9615` 和 `9616` 上公开的指标有助于实现这一点，这些端口应可访问 prometheus/alertmanager 服务器（alertmanager 配置提醒服务）和 manta  `18.156.192.254` 监控服务器[pulse server](https://pulse.pelagos.systems)。

### 防火墙配置
为保证节点正常运行，需要从外部访问主机的以下几个端口。 为了简化配置，文档里使用以下端口为默认端口，但您也可以根据实际需求来更改端口。

- ***31333***: 默认calamari p2p端口
- ***31334***: 默认（中继）kusama p2p端口
- ***9615***: 默认 calamari prometheus端口
- ***9616***: 默认（中继）kusama prometheus端口

#### 通过ssl，letsencrypt 和 nginx反向代理获取主机的metrics
下面是一个最佳实践获取你的节点的metrics：

- ***ssl*，** 此方式下，metrics的可靠性和来源都能够被验证。
- ***dns*，**即使你的节点的机器的IP地址变动了，也不会需要触发服务器更新。

当提供的是域名，比如像 `calamari.awesome-host.awesome-collators.com` ，这样我们的监控系统更加容易地获取节点的运行情况。但如果使用的是IP，比如`123.123.123.123:987`， 这样可能会不太容易区分是哪一个节点被监听，也可能不知道监听的是中继链或者是平行链。

一个比较简单的办法就是安装 certbot和 nginx到你的主机上，并配置443端口为反向代理监听端口，这个端口会代理ssl请求到本地的metric端口。

下面列举一个简单的例子：

- 你是域名 ***example.com*** 的管理员。
- 这个域名被 cloudfare或者route53管理。
- 你的节点主机名叫 ***bob*。**
- 你所跑的calamari节点都使用了默认的端口。
- 你的路由网关转发 443/ssl 网络请求到你的collator节点。
- 你的主机安装了 certbot。

:::note
cloudfare和route53的例子如下。但你也可以google `python3-certbot-dns-${your_dns_provider}`，得到其他的例子。
:::

- 安装 certbot 和一个dns验证插件

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

- 通过dns的插件请求一个证书，这样certbot能够自动地更新证书当证书要过期时。但是手动地请求证书，也必须要手动地更新证书来保证ssl证书是有效的。

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