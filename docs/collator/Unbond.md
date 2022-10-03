---
sidebar_label: 💔 Leave the Collator Set
---

[Installation](installation) > [Configuration](configuration) > [Running](running) > [Sync](sync) > [Session keys](keys) > Bond

## 💔 Leave the Collator Set and Recover the KMA Bond

In order to fully offboard your collator, execute `parachainStaking::scheduleLeaveCandidates`
![](images/collator-schedule-leave.png)
This will mark your collator as exiting, making it ineligible for future rewards.

**After 7 days** you (or anyone else) can execute the removal extrinsic for your collator which will unlock your bonded KMA 
![](images/collator-execute-leave.png)

If you change your mind, you can always cancel the unbonding (unless you've already sent the `execute` extrinsic above)
![](images/collator-cancel-leave.png)