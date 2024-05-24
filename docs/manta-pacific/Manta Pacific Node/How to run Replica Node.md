# Manta Pacific Replica Node

**Note for latest up to date docs** refer to https://constellationlabs.notion.site/Manta-Pacific-Replica-Node-64219c65097940489d8277f454153193

# Update Log

## March 12th Dencun Upgrade

In order to be prepared, please upgrade your op-node image to [public.ecr.aws/i6b2w2n6/op-node:celestia-3.0.0-dencun](http://public.ecr.aws/i6b2w2n6/op-node:celestia-3.0.0) and set the necessary env variables. Note that the [manta-up.sh](http://manta-up.sh) script helps to generate the auth token for the celestia light node.

Scripts to run a replica node on the latest version:

[manta-pacific-replica.zip](../assets/manta-pacific-replica.zip)

Here’s the latest snapshot: [https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific-snapshot-011824.tar](https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific-snapshot-011824.tar)

# General Instructions

A set of scripts that will start a Manta node from scratch. **If you have an existing Manta node running, then you should copy the datadir over and resume from that.**

Users running replica nodes can optionally run a Celestia light node alongside op-node and op-geth. The updated replica scripts will help users provision this Celestia light node and connect to it in the same way Manta Pacific will.

A version of the scripts that include a snapshot data directory:

[manta-pacific-replica.zip](../assets/manta-pacific-replica.zip)

The latest snapshot: [https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific-snapshot-011824.tar](https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific-snapshot-011824.tar)

Older snapshot:

[https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific-celestia-update.tar](https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific-celestia-update.tar)

# Docker-compose

See the README in each folder for instructions on how to run a replica node for both Manta Testnet and Manta Pacific via a docker-compose setup.

# Building a new OP-geth image

Manta Pacific is running this commit of op-geth: [https://github.com/ethereum-optimism/op-geth/tree/39d121af21bc4cb45c46edf2dc1bf33daa28c54d](https://github.com/ethereum-optimism/op-geth/tree/39d121af21bc4cb45c46edf2dc1bf33daa28c54d)

See: `manta-replica/manta-pacific/Dockerfile.l2`

If you make modifications to op-geth, swap out the line:

```go
FROM us-docker.pkg.dev/oplabs-tools-artifacts/images/op-geth:optimism
```

with your built image. Or feel free to run it directly as a shell process (see `manta-replica/manta-testnet/entrypoint.sh` for the command the container is using).
