## Hardware and Infrastructure

a. Running on your own hardware and within you own premises (recommended):

- node system host
  - cpu: 8 cores
  - memory: 32 gb of ram (more is better)
  - disk space: 700 gb of disk space dedicated to the blockchain basepath (as of date 2024 Dec 7th, more is better, growing at 200G~300G anually)
- infrastructure and environment
  - network bandwidth: 100 mbps+
  - internet-accessible ports:
    - **31333**: default manta peer-to-peer port
    - **31334**: default (embedded-relay) polkadot peer-to-peer port
    - **9615**: default manta metrics port
    - **9616**: default (embedded-relay) polkadot metrics port

    you should monitor your own node using the techniques described on the [polkadot wiki](https://wiki.polkadot.network/docs/maintain-guides-how-to-monitor-your-node). the metrics exposed on ports 9615 and 9616 facilitate this, so these ports should be accessible both from your own prometheus/alertmanager server (which should be configured to alert you) and manta devops' [pulse server](https://pulse.pelagos.systems) at `18.156.192.254` (monitored by manta devops).
  - an uninterrupted power supply to both the node and the network switches and routers that provide its connectivity must be capable of keeping the system online during provider power outages
  - a failover 4g or 5g router should be included in your network topology to provide connectivity in the event of a wired or fibre connection failure
  - your network management should include automatic dns updates in the event of changes to your nodes publicly accessible ip addressing

b. Running on AWS EC2
- instance type: r5ad.xlarge or similar
- image: Ubuntu 22.04 (latest ubuntu server ami from Canonical/099720109477)

c. Azure/GCP or other cloud/datacenter provider
- Please use your judgement to match or surpass the requirements for other environments above
