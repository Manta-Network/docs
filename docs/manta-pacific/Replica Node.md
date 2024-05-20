# Manta Pacific Replica Node

**Note for latest up to date docs** refer to https://constellationlabs.notion.site/Manta-Pacific-Replica-Node-64219c65097940489d8277f454153193

# Update for Celestia enablement on mainnet

The switch to Celestia on Manta Pacific is happening on 12pm PT, December 15th, 2023

**Note: if you’re running a node on the old setup, it should still sync fine from the S3 we’ve provided. An upgrade is optional but recommended**

Now that Manta Pacific is posting data to Celestia, users running replica nodes should also run a Celestia light node alongside op-node and op-geth. The updated replica scripts will help users provision this Celestia light node and connect to it in the same way Manta Pacific will.

In order to be prepared, please upgrade your op-node image to `public.ecr.aws/i6b2w2n6/op-node:celestia-3.0.0-dencun` and set the necessary env variables. Note that the `manta-up.sh` script helps to generate the auth token for the celestia light node.

A set of scripts that will start a Manta node from scratch. **If you have an existing Manta node running, then you should copy the datadir over and resume from that.**

[manta-replica-main.zip](./assets/manta-replica-main.zip)

A version of the scripts that include a snapshot data directory

[https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific-celestia-update.tar](https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific-celestia-update.tar)

# Docker-compose

See the README in each folder for instructions on how to run a replica node for both Manta Testnet and Manta Pacific via a docker-compose setup.

Update: here’s a variant that includes a datadir snapshot taken on November 6th, 2023

[https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific.tar](https://constellationlabs-dashboard-beta.s3.us-west-2.amazonaws.com/manta-pacific.tar)

[manta-replica.zip](./assets/manta-replica-main.zip)

# Building a new OP-geth image

Manta Pacific is running this commit of op-geth: [https://github.com/ethereum-optimism/op-geth/tree/39d121af21bc4cb45c46edf2dc1bf33daa28c54d](https://github.com/ethereum-optimism/op-geth/tree/39d121af21bc4cb45c46edf2dc1bf33daa28c54d)

See: `manta-replica/manta-pacific/Dockerfile.l2`

If you make modifications to op-geth, swap out the line:

```go
FROM us-docker.pkg.dev/oplabs-tools-artifacts/images/op-geth:optimism
```

with your built image. Or feel free to run it directly as a shell process (see `manta-replica/manta-testnet/entrypoint.sh` for the command the container is using).
