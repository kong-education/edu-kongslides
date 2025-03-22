
Issuing ‘http’ or 'curl' requests via Admin API to Kong Gateway is an example of Declarative configuration. 
[ ] True
[x] False

Which command would you run to test decK's connectivity with a local Kong Gateway?
[x] deck gateway ping
[ ] deck gateway status
[ ] deck gateway check
[ ] deck localhost:8001

Which command would you run to download a configuration from Kong Gateway?
[ ] deck download
[x] deck gateway dump
[ ] deck get config
[ ] deck gateway sync

Which command would you use to upload decK configuration file `consumers.yaml` to workspace production?
[ ] deck upload production -s consumers.yaml
[ ] deck load -s consumers.yaml --workspace production
[x] deck gateway sync consumers.yaml --workspace production
[ ] deck gateway config production consumers.yaml

Which of the following statement(s) is/are true?
[ ] decK can create and delete workspaces
[x] decK can create workspaces but can’t delete workspaces
[ ] decK can update multiple workspaces simultaneously
[x] decK cannot update multiple workspaces simultaneously

What command would you run to lint a configuration file with decK?
[ ] deck check -s file.yaml
[ ] deck lint -s file.yaml
[ ] deck status -s file.yaml
[x] deck gateway validate file.yaml
