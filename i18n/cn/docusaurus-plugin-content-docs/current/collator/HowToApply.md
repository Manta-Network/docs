
#  👩🏼‍💻 如何申请运行 Calamari 收集人节点？

## 达到硬件和基础设施的要求

a. 本地硬件运行（优先考虑独立私有节点，有助于实现最优效率）：

- 主机（默认该系统将尽可能利用全部内存和 cpu，除非有提示不要这样做 ）
  - cpu: 8 核
  - 内存: 32 GB (内存越大越好)
  - 硬盘: 500 GB 用于存储 basepath数据  (硬盘越大越好)
- 运行基础设施和环境
  - 网络带宽: 100 mbps+
  - 网络端口:
    - **31333**: 默认 calamari 点对点端口
    - **31334**: 默认（中继）kusama 点对点端口
    - **9615**: 默认 calamari 的prometheus端口
    - **9616**: 默认（中继）kusama 的prometheus端口

按照[polkadot wiki](https://wiki.polkadot.network/docs/maintain-guides-how-to-monitor-your-node)中的技术方式，可通过端口 9615 和 9616 上数据指标监控自己的节点，这些端口应能同时接入 prometheus/alertmanager 服务器（本地提醒服务器）和 manta 的  [pulse sever](https://pulse.pelagos) 在“18.156.192.254”（ manta 开发团队的监控服务器）。
为设备提供不间断电源（UPS），保持断电后稳定运行
建议增配4G 或5G 路由，以防有线或光纤连接失败时提供连接
网络应配置自动 dns 更新，防止ip地址变更带来的网络故障

b. 在 AWS EC2 上运行
- 实例类型：r5ad.xlarge 或其他相近配置
- 镜像：Ubuntu 20.04（ 最新版本 Canonical/099720109477 ）

c. Azure/GCP 或其他云/数据中心提供商
- 请根据您的判断匹配上述或更优的环境配置 

## 绑定需求

`400_000`（四十万）KMA 将被绑定，并且在节点运行时不可转让。 确保帐户始终在绑定金额之上有少量余额，以支付注册过程的交易费。 通常应该留出 20 KMA 。 实际情况中，费用要小得多，但不会是0。
您可随时通过下面链接查看当前的金额[calamari](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.calamari.systems%2F#/chainstate) &gt; collatorSelection &gt; candidacyBond(): u128.
![Candidacy Bond](/img/collator-program/candidacy-bond.png)

填写申请表
请填写[collator 申请表格](https://docs.google.com/forms/d/e/1FAIpQLScizDDMq7jWeOPVVEMr3EY_Z6N6ugdkL8aKgAbZ9lAJX6DEOQ/viewform).