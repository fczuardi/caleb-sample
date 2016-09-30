# caleb-sample
an example of a single expressjs serving bots to multiple facebook pages

## usage

### Start the server

```shell
npm start
```

### Launch a bot
```shell
curl -XPOST \
    localhost:4138/launchBot/79be289d-0480-4e86-bcff-a7b4f3f38b37/5630e4ee-84c8-415e-a165-940c5fe9d49e
```

### Talk to the bot
```shell
curl -XGET \
    localhost:4138/79be289d-0480-4e86-bcff-a7b4f3f38b37/5630e4ee-84c8-415e-a165-940c5fe9d49e
```
