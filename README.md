# SMS Aggregator

### Problème
Lorsqu’un utilisateur publie un secret dans le SMS, si celui-ci perd la clef publique de son secret alors il perd également de manière définitive l’accès à son secret.

### Objectif
Résoudre ce problème à l’aide d’une DAPP reposant sur la blockchain. Un Smart Contrat va garder en mémoire les clefs publiques des secrets de chaque utilisateur de manière sécurisée. Chaque utilisateur ne peut accéder uniquement aux clefs publiques des secrets qui le concernent.

### Rôle
La Dapp a donc pour vocation de recenser les clefs publiques des secrets des utilisateurs qu’ils ont publiés dans le SMS de iExec afin qu’ils puissent manipuler efficacement leurs secrets.
L'application est actuellement disponible sur : [SMS_Aggregator](https://sms-aggregator.vercel.app/)

### Architecture :

#### Front
Le dossier front est une application web qui permet à l’utilisateur de se connecter à son compte Ethereum et de publier un secret ainsi que de visualiser les secrets qu'il possède déjà. Lorsqu’il publie un secret, il doit entrer la clef publique de son secret, son secret ainsi qu'une description de celui-ci. Cette clef publique est ensuite stockée dans le Smart Contrat, tout comme la description et la date de publication de celui-ci de manière sécurisée.

#### Smart Contrat
Le Smart contrat est un contrat Ethereum qui permet de stocker les clefs publiques des secrets des utilisateurs, leur description et leur date de publication dans le SMS. Un utilisateur ne peut accéder aux clefs publiques des secrets qui le concernent. Le Smart contract est déployé sur la blockchain Bellecour.

#### Subgraph
Le Subgraph est un index de la blockchain Ethereum qui permet de récupérer les données du Smart Contrat. Il est déployé sur le serveur graph de la blockchain bellecour. Il est accessible par via l'API : [API](https://api.thegraph.com/subgraphs/name/hamza-oualid/sms-aggregator)

### Test du projet en local

#### Installation du projet

```bash
git clone
cd front
npm install
```

#### Créé un .env fichier

```bash
cd front
touch .env
```

Ajouter les lignes suivantes dans .env fichier

```js
GENERATE_SOURCEMAP = false //Generate source map
REACT_APP_WALLET_CONNECT_PROJECT_ID = //Wallet Connect project id (https://cloud.walletconnect.com/sign-in)
REACT_APP_CONTRACT_ADDRESS = 0xd4dfbb2fc80552aa0558b664a321fb60dcf9636c  //Contract address
```

#### Démarrer le projet

```bash
npm run start
```
