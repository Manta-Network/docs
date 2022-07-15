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
