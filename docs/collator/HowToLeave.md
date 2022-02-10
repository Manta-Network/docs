# 💔 Leaving the collator program

## Unregister collator by yourself

This is pretty easy, just submit this extrinsic. `collatorSelection` → `leaveintent`.

![unregister](images/leave-by-yourself.png)

## Evicting underperformed collator by governance

If your collator is underperformed, Calamari governance will propose a proposal to remove your collator from the collator set, but your reserved KMA will be returned.

Propose a motion like this, `collatorSelection` → `removeCollator`.

![unregister](images/leave-by-council.png)

This process will be codified in a new `pallet`. 