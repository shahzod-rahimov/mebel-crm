If you want to run this repo, you can clone it firstly

firstly you need to install all packages
```sh
npm install
```

then, you need to create config folder

```sh
    mkdir config
```

then, you should open new json file as 'default.json'

```sh
    cd config 
```

```sh
nano default.json
```

And create dbUri and port variables

```json
{
  "dbUri": "mongodb://localhost:27017/yourdb",
  "port": "you need to write there your port"
}
```

Finally, you can run this project 

```sh
npm run dev
```